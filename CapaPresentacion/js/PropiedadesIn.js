
let map;
let marker;

const MODELO_BASE = {
    IdPropiedad: 0,
    Direccion: "",
    Precio: 0.0,
    Superficie: 0.0,
    IdInmobiliaria: 0,
    IdPropietario: 0,
    IdDistrito: 0,
    IdTipoPropi: 0,
    Comentario: "",
    UrlTours: "",
    Latitud: 0.0,
    Longitud: 0.0,
    Estado: "",
    Activo: true
}

$(document).ready(function () {
    cargarTipoPropiedad();
    cargarDistritos();
    $("#cboEstadop").prop("disabled", true);
})


async function initMap() {
    const position = { lat: -11.013498, lng: -66.051847 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapaz"), {
        zoom: 14,
        center: position,
        mapId: "DEMOMAPA",
    });

    marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Mostrar las coordenadas iniciales en los inputs
    updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    marker.addListener("dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        updateInputs(newLat, newLng);
    });

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", function (event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtLatitud").value = lat.toFixed(6);
    document.getElementById("txtLongitud").value = lng.toFixed(6);
}

function cargarTipoPropiedad() {
    $("#cboTipoprop").html("");

    $.ajax({
        type: "POST",
        url: "PropiedadesIn.aspx/ListaTipoPropiedades",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdTipoPropi }).text(row.NombreTipo).appendTo("#cboTipoprop");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarDistritos() {
    $("#cboDistrito").html("");

    $.ajax({
        type: "POST",
        url: "PropiedadesIn.aspx/ListaDistritos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdDistrito }).text(row.Distrito).appendTo("#cboDistrito");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarDatosPropietario() {

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));
    //var request = { IdInmobi: usuario.IdInmobiliaria }
    var request = {
        IdInmobi: usuario.IdInmobiliaria,
        NroCi: $("#txtNrociP").val().trim()
    };

    $.ajax({
        type: "POST",
        url: "PropiedadesIn.aspx/BuscarPropietario",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            $("#loaadd").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 4rem;"></i>'
            });
        },
        success: function (response) {
            $("#loaadd").LoadingOverlay("hide");
            if (response.d.Estado) {
                const datos = response.d.Data;

                $("#txtIdPropie").val(datos.IdPropietario);
                $("#txtFullnombre").val(datos.FullNameProp);
                $("#txtcelprop").val(datos.Celular);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                //swal("Mensaje", "No se encontró el Propietario con el CI.", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaadd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnBuscarProCi').on('click', function () {

    if ($("#txtNrociP").val().trim() == "") {
        swal("Mensaje", "Ingrese el Nro Ci para Buscar", "warning");
        return;
    }

    cargarDatosPropietario();
})

function dataRegistrarPropiedad() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPropiedad"] = parseInt($("#txtIdPropiedad").val());
    modelo["Direccion"] = $("#txtDireccion").val().trim();
    modelo["Precio"] = parseFloat($("#txtPrecio").val().trim());
    modelo["Superficie"] = parseFloat($("#txtSuperficie").val().trim());
    modelo["IdInmobiliaria"] = parseInt(usuario.IdInmobiliaria);
    modelo["IdPropietario"] = parseInt($("#txtIdPropie").val());
    modelo["IdDistrito"] = $("#cboDistrito").val();
    modelo["IdTipoPropi"] = $("#cboTipoprop").val();
    modelo["Comentario"] = $("#txtComentario").val();
    modelo["UrlTours"] = $("#txtVirtual").val().trim();
    modelo["Latitud"] = parseFloat(parseFloat($("#txtLatitud").val()).toFixed(6));
    modelo["Longitud"] = parseFloat(parseFloat($("#txtLongitud").val()).toFixed(6));
    modelo["Estado"] = "Disponible";
    modelo["Activo"] = true;

    var request = {
        oPropiedad: modelo
    };

    $.ajax({
        type: "POST",
        url: "PropiedadesIn.aspx/GurdarPropiedad",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadprpi").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#loadprpi").LoadingOverlay("hide");
            if (response.d.Estado) {
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "success",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    window.location.href = 'ListaPropiedadesIn.aspx';
                }, 3000);

                // Limpiar inputs
                //$("input.modelval").val("");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadprpi").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarPro').prop('disabled', false);
        }
    });
}

$('#btnGuardarPro').on('click', function () {
    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarPro').prop('disabled', true);

    const inputs = $("input.modelval").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        const toastId = "toastWarning";

        // Si el toast no existe aún, lo creamos
        if ($("#" + toastId).length === 0) {
            let toastHtml = `
                <div id="${toastId}" class="bs-toast toast position-fixed top-0 end-0 m-3 fade bg-warning" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
                    <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">Advertencia</div>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body"></div>
                </div>
            `;
            $("body").append(toastHtml);
        }

        // Cambiar el contenido del mensaje
        $("#" + toastId + " .toast-body").text(mensaje);

        // Mostrar el toast
        let toastElement = document.getElementById(toastId);
        let toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
        toastInstance.show();

        // Enfocar el input
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();

        // Rehabilitar el botón
        $('#btnGuardarPro').prop('disabled', false);

        return;
    }

    var precioStr = $("#txtPrecio").val().trim();

    // Verificar si el precio es un número válido, no vacío, y mayor que 0
    if (precioStr === "" || isNaN(precioStr) || parseFloat(precioStr) <= 0) {
        swal("Mensaje", "Debe ingresar un monto válido (mayor a 0)", "warning")
        $("#txtPrecio").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    var superficie = $("#txtSuperficie").val().trim();

    if (superficie === "" || isNaN(superficie) || parseFloat(superficie) <= 0) {
        swal("Mensaje", "Debe ingresar un monto válido (mayor a 0)", "warning")
        $("#txtSuperficie").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    if ($("#txtComentario").val().trim() === "") {
        swal("Mensaje", "Debe Ingresar un Comentario", "warning");
        $("#txtComentario").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdPropie").val()) === 0) {
        swal("Mensaje", "Debe buscar un Propietario.", "warning")
        $("#txtNrociP").focus();
        $('#btnGuardarPro').prop('disabled', false);
        return;
    }

    // Si todo está correcto
    dataRegistrarPropiedad();
});
