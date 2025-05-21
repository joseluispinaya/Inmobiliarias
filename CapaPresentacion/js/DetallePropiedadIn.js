
var table;

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPropi = urlParams.get('id');

    if (idPropi !== null && idPropi.trim() !== "") {
        cargarDatosPropiedad(idPropi);

    } else {
        swal({
            title: "Mensaje",
            text: "No hay parámetro de búsqueda válido en la URL",
            icon: "warning",
            timer: 2000,
            buttons: false
        });
        redirigirAs('ListaPropietariosIn.aspx');
        // setTimeout(function () {
        //     window.location.href = 'ListaPropietariosIn.aspx';
        // }, 3000);

    }

})

function redirigirAs(url, delay = 3000) {
    setTimeout(() => window.location.href = url, delay);
}

function cargarDatosPropiedad(idPropi) {
    var request = {
        Idpropi: idPropi
    };

    $.ajax({
        type: "POST",
        url: "DetallePropiedadIn.aspx/VerDetallePropiedad",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#cargan").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#cargan").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;
                $("#txtIdPropiedad").val(datos.IdPropiedad);
                $("#txtIdPropietario").val(datos.IdPropietario);

                //$("#txtIdclienSt").val(idProp);
                var canti = datos.NumeroImagenes;
                var unidad = canti > 1 ? "Imagenes" : "Imagen";

                $("#lblprcio").text(datos.PrecioCade);
                $("#lblDistri").text(datos.DistritoPr.Distrito);
                $("#lblEstado").text(datos.Estado);
                $("#lblSuperf").text(datos.MetrosCuad);
                $("#lblTipop").text(datos.TipoPropiedad.NombreTipo);
                $("#lblImagen").text(canti + " " + unidad);
                $("#lblComentario").text(datos.Comentario);
                $("#lblDireccion").text(datos.Direccion);
                //$("#imgPropiedadDet").attr("src", datos.FirstImage);
                var listaImagenes = datos.ListaImagenes;
                //console.log(listaPropiedades);
                tablaImagenes(listaImagenes);

            } else {
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "warning",
                    timer: 2000,
                    buttons: false
                });

                redirigirAs('ListaPropietariosIn.aspx');
                // setTimeout(function () {
                //     window.location.href = 'ListaPropietariosIn.aspx';
                // }, 3000);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cargan").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal({
                title: "Error",
                text: "Ocurrió un problema intente nuevamente",
                icon: "error",
                timer: 2000,
                buttons: false
            });
            redirigirAs('ListaPropietariosIn.aspx');
        }
    });
}


function tablaImagenes(listaImagenes) {
    if ($.fn.DataTable.isDataTable("#tbDtImagenes")) {
        $("#tbDtImagenes").DataTable().destroy();
        $("#tbDtImagenes tbody").empty();
    }
    //class="d-block rounded"
    table = $("#tbDtImagenes").DataTable({
        "responsive": true,
        "data": listaImagenes,
        "columns": [
            { "data": "IdImagen", "visible": false, "searchable": false },
            {
                "data": "UrlImagen",
                "orderable": false,
                "searchable": false,
                "width": "120px",
                render: function (data) {
                    return `<img style="width:110px;height:110px;max-width: 100%; height: auto;" src=${data} class="d-block rounded"/>`;
                }
            },
            {
                "defaultContent":
                    "<button class=\"btn btn-danger btn-eliminar btn-sm\">" +
                    "<i class=\"bx bx-trash\"></i>" +
                    "</button>",
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

//function mostrarImagen(input) {
//    if (input.files && input.files[0]) {
//        var reader = new FileReader();

//        reader.onload = function (e) {
//            $('#imgPropiedad').attr('src', e.target.result);
//        }

//        reader.readAsDataURL(input.files[0]);
//    } else {
//        $('#imgPropiedad').attr('src', "Imagenes/sinimg.png");
//    }
//}

function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];

        if (!file.type.startsWith("image/")) {
            swal("Error", "El archivo seleccionado no es una imagen válida.", "error");
            $('#imgPropiedad').attr('src', "Imagenes/sinimg.png");
            input.value = ""; // Limpia el input
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPropiedad').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        $('#imgPropiedad').attr('src', "Imagenes/sinimg.png");
    }
}

$('#txtImagen').change(function () {
    mostrarImagen(this);
});

$('#btnNuevoIm').on('click', function () {
    $("#txtImagen").val("");
    $('#imgPropiedad').attr('src', "Imagenes/sinimg.png");
    $("#modalImagen").modal("show");
})

function enviarDataToServer(request) {
    $.ajax({
        type: "POST",
        url: "DetallePropiedadIn.aspx/GuardarImagen",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                $('#modalImagen').modal('hide');
                const idPropiedad = parseInt($("#txtIdPropiedad").val());
                cargarDatosPropiedad(idPropiedad);
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.error(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
        },
        complete: function () {
            $('#btnguardarIma').prop('disabled', false);
        }
    });
}

function esTamanioValido(file, maxMB = 1.5) {
    const maxSize = maxMB * 1024 * 1024;
    return file.size <= maxSize;
}

function esImagenValida(file) {
    return file && file.type.startsWith("image/");
}

function registerImagen() {
    const fileInput = document.getElementById('txtImagen');
    const file = fileInput.files[0];
    const idPropiedad = parseInt($("#txtIdPropiedad").val());

    if (!file) {
        swal("Mensaje", "Debe seleccionar una imagen para registrar", "warning");
        $('#btnguardarIma').prop('disabled', false);
        return;
    }

    if (!esImagenValida(file)) {
        swal("Mensaje", "El archivo seleccionado no es una imagen válida.", "warning");
        $('#btnguardarIma').prop('disabled', false);
        return;
    }

    if (!esTamanioValido(file)) {
        swal("Mensaje", "La imagen seleccionada es demasiado grande (máx 1.5 MB).", "warning");
        $('#btnguardarIma').prop('disabled', false);
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const bytes = new Uint8Array(e.target.result);
        const request = {
            Idpropiedad: idPropiedad,
            imageBytes: Array.from(bytes)
        };
        enviarDataToServer(request);
    };

    reader.readAsArrayBuffer(file);
}

$('#btnguardarIma').on('click', function () {
    $(this).prop('disabled', true);

    const idPropiedad = parseInt($("#txtIdPropiedad").val());
    if (idPropiedad === 0) {
        swal("Mensaje", "Ocurrió un error, intente más tarde", "warning");
        $(this).prop('disabled', false);
        return;
    }

    registerImagen();
});


$('#btnRegresar').on('click', function () {

    var idPropiet = $("#txtIdPropietario").val().trim();

    if (parseInt(idPropiet) <= 0) {
        swal("Mensaje", "Ocurrio un error para regresar a los detalles del Propietario", "warning")
        return;
    }

    var url = 'DetallePropietarioIn.aspx?id=' + idPropiet;
    window.location.href = url;
    //window.location.href = 'PageClientes.aspx';
})

