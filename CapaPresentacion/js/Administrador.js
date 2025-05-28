
var table;

const MODELO_BASE = {
    IdInmobiliaria: 0,
    NombreInmobiliaria: "",
    Propietario: "",
    Correo: "",
    Direccion: "",
    Celular: "",
    Estado: true
}

const MODELO_BASEUS = {
    IdUsuario: 0,
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Clave: "",
    Celular: "",
    IdInmobiliaria: 0,
    IdRol: 0,
    Estado: true,
    ImageFull: ""
}

$(document).ready(function () {
    const adminlogi = sessionStorage.getItem('adminl');

    if (adminlogi) {
        obtenerAdminn();
        listaInmobiliarias();
        listaUsuariosAd();
        cargarRoles();
        cargarInmobiliarias();
    } else {
        window.location.href = 'LoginIn.aspx';
    }

});

function obtenerAdminn() {
    const adminlogi = sessionStorage.getItem('adminl');
    if (adminlogi) {
        const usuario = JSON.parse(adminlogi);

        $("#lblApeUsuAd").text(usuario.Nombres);
        $("#lblRolusAd").text(usuario.Apellidos);

    } else {
        console.error('No se encontró información del usuario en sessionStorage.');
        window.location.href = 'LoginIn.aspx';
    }
}

function listaInmobiliarias() {
    $.ajax({
        type: "POST",
        url: "InmobiliariasIn.aspx/ObtenerInmo",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#cloader").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#cloader").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;

                // Limpiamos el contenedor por si hay datos previos
                $("#listarInmm").empty();

                // Recorremos la lista y generamos el HTML
                datos.forEach(function (uactivo) {
                    var cardHtml = `
                        <div class="col mb-3">
                            <div class="cardze h-100">
                                <div class="text-center" style="padding-top: 10px;">
                                    <i class="bx bx-building-house" style="font-size: 50px"></i>
                                </div>
                                <div class="card-body" style="padding: 0.2rem 1.25rem;">
                                    <div class="text-start" style="font-size:14px">
                                        <p class="m-1"><b>Inmobiliaria: </b>${uactivo.NombreInmobiliaria}</p>
                                        <p class="m-1"><b>Propietario: </b>${uactivo.Propietario}</p>
                                        <p class="m-1"><b>Celular: </b>${uactivo.Celular}</p>
                                    </div>
                                </div>
                                <div class="card-footer text-center" style="padding: 0.8rem 1.25rem;">
                                    <a href="#" class="btn btn-sm btn-primary btn-editar mr-3" 
                                    data-uinmobilia='${encodeURIComponent(JSON.stringify(uactivo))}'>
                                    <i class="bx bx-edit-alt"></i>
                                    </a>
                                    <a href="#" class="btn btn-sm btn-success" 
                                    onclick="event.preventDefault(); verDetallea(${uactivo.IdInmobiliaria})">
                                    <i class="bx bx-menu"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`;


                    // Agregamos al contenedor
                    $("#listarInmm").append(cardHtml);
                });

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cloader").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    var inmobiliadetalleStr = decodeURIComponent($(this).attr("data-uinmobilia"));
    var detalle = JSON.parse(inmobiliadetalleStr);

    if (!detalle || !detalle.IdInmobiliaria) {
        console.warn("Objeto detalle inválido", detalle);
        swal("Mensaje", "Ocurrio un problema intente mas tarde", "warning")
        return;
    }
    console.log(detalle);
    $("#txtIdInmobi").val(detalle.IdInmobiliaria);
    $("#txtNombreIn").val(detalle.NombreInmobiliaria);
    $("#txtPropietario").val(detalle.Propietario);
    $("#txtCorreoIn").val(detalle.Correo);
    $("#txtDireccion").val(detalle.Direccion);
    $("#txtCelular").val(detalle.Celular);


    $("#modalInmobR").modal("show");

});

function verDetallea(IdInmobiliaria) {
    //var url = 'ActivoDetalles.aspx?id=' + IdInmobiliaria;
    swal("Mensaje", "El Id es: " + IdInmobiliaria, "success")
    //window.location.href = url;
}

$('#salirSisAd').on('click', function (e) {
    e.preventDefault();
    CerrarSesionAd();
});


$('#btnAddNuevoInm').on('click', function () {
    //mostrarModal(null, true);
    $("#txtIdInmobi").val("0");
    $("#modalInmobR").modal("show");
})

function dataRegistrarInmob() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdInmobiliaria"] = parseInt($("#txtIdInmobi").val());
    modelo["NombreInmobiliaria"] = $("#txtNombreIn").val().trim();
    modelo["Propietario"] = $("#txtPropietario").val().trim();
    modelo["Correo"] = $("#txtCorreoIn").val().trim();
    modelo["Direccion"] = $("#txtDireccion").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Estado"] = true;

    var request = {
        oInmobiliaria: modelo
    };

    $.ajax({
        type: "POST",
        url: "InmobiliariasIn.aspx/GurdarInmo",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaddddd").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#loaddddd").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaInmobiliarias();
                $('#modalInmobR').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");

                // Limpiar inputs
                $("#txtIdInmobi").val("0");
                $("input.modelval").val("");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddddd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarRin').prop('disabled', false);
        }
    });
}

$('#btnGuardarRin').on('click', function () {
    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarRin').prop('disabled', true);

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
        $('#btnGuardarRin').prop('disabled', false);

        return;
    }

    if (parseInt($("#txtIdInmobi").val()) === 0) {
        //swal("Mensaje", "Guardado.", "success")
        dataRegistrarInmob();
    } else {
        swal("Mensaje", "Falta para Actualizar.", "warning")
        //editarDataAjaxU();
    }

    // Si todo está correcto
    //dataRegistrarInmob();
});

function listaUsuariosAd() {
    if ($.fn.DataTable.isDataTable("#exampleu")) {
        $("#exampleu").DataTable().destroy();
        $('#exampleu tbody').empty();
    }

    table = $("#exampleu").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ListaUsuariosIn.aspx/ListaUsuarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    //console.log(json.d.Data);
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull",
                "orderable": false,
                "searchable": false,
                render: function (data) {
                    return `<img src=${data} class="w-px-40 h-auto rounded-circle"/>`;
                }
            },
            { "data": "FullName" },
            { "data": "Correo" },
            { "data": "Celular" },
            { "data": "Inmobiliaria.NombreInmobiliaria" },
            {
                "data": "Verificado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-label-primary me-1">Verificado</span>';
                    else
                        return '<span class="badge bg-label-warning me-1">No Verificado</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editarUs btn-sm me-2"><i class="bx bx-edit-alt"></i></button>',
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


// registro usuarios
function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "Administrador.aspx/ObtenerRolAd",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function cargarInmobiliarias() {
    $("#cboInmobiliaria").html("");

    $.ajax({
        type: "POST",
        url: "InmobiliariasIn.aspx/ObtenerInmo",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdInmobiliaria }).text(row.NombreInmobiliaria).appendTo("#cboInmobiliaria");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioReg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioReg').attr('src', "Imagenes/sinimg.png");
    }
}

$('#txtFotoUr').change(function () {
    mostrarImagenSeleccionada(this);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASEUS;

    $("#txtIdUsuario").val(modelo.IdUsuario);
    $("#txtNombres").val(modelo.Nombres);
    $("#txtApellidos").val(modelo.Apellidos);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtContrasena").val(modelo.Clave);
    $("#txtCelularUsu").val(modelo.Celular);
    $("#cboInmobiliaria").val(modelo.IdInmobiliaria == 0 ? $("#cboInmobiliaria option:first").val() : modelo.IdInmobiliaria);
    $("#cboRol").val(modelo.IdRol == 0 ? $("#cboRol option:first").val() : modelo.IdRol);
    $("#cboEstado").val(modelo.Estado == true ? 1 : 0);
    $("#imgUsuarioReg").attr("src", modelo.ImageFull == "" ? "Imagenes/sinimg.png" : modelo.ImageFull);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#txtContrasena").prop("disabled", !cboEstadoDeshabilitado); // Deshabilitar clave si es edición
    $("#txtFotoUr").val("");

    if (cboEstadoDeshabilitado) {
        $("#modalLabesUsua").text("Nuevo Registro");
    } else {
        $("#modalLabesUsua").text("Editar Usuario");
    }

    $("#modalUsuarios").modal("show");
}

$("#exampleu tbody").on("click", ".btn-editarUs", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    //console.log(model);
    mostrarModal(model, false);
})

$('#btnAddNuevoUsuari').on('click', function () {
    mostrarModal(null, true);
    //$("#txtIdUsuario").val("0");
    //$("#modalUsuarios").modal("show");
})

function sendDataToServerUsr(request) {
    $.ajax({
        type: "POST",
        url: "Administrador.aspx/GuardarUsua",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargand").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#cargand").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaUsuariosAd();
                $('#modalUsuarios').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cargand").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnRegistrarUs').prop('disabled', false);
        }
    });
}

function registerDataUser() {
    var fileInput = document.getElementById('txtFotoUr');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASEUS);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["Nombres"] = $("#txtNombres").val().trim();
    modelo["Apellidos"] = $("#txtApellidos").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtContrasena").val().trim();
    modelo["Celular"] = $("#txtCelularUsu").val().trim();
    modelo["IdInmobiliaria"] = $("#cboInmobiliaria").val();
    modelo["IdRol"] = $("#cboRol").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnRegistrarUs').prop('disabled', false);
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerUsr(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerUsr(request);
    }
}

$('#btnRegistrarUs').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnRegistrarUs').prop('disabled', true);

    const inputs = $("input.modelvalUsu").serializeArray();
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
        $('#btnRegistrarUs').prop('disabled', false);

        return;
    }

    if (parseInt($("#txtIdUsuario").val()) === 0) {
        //swal("Mensaje", "Guardado.", "success")
        registerDataUser();
    } else {
        swal("Mensaje", "Falta para Actualizar.", "warning")
        //editarDataAjaxU();
    }


})


// Función para cerrar sesión
function CerrarSesionAd() {
    sessionStorage.clear();
    window.location.replace('LoginIn.aspx');
}