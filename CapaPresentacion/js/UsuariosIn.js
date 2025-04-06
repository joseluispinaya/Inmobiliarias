
var table;

const MODELO_BASE = {
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
    cargarRoles();
    cargarInmobiliarias();
})

function listaUsuarios() {
    if ($.fn.DataTable.isDataTable("#exampleu")) {
        $("#exampleu").DataTable().destroy();
        $('#exampleu tbody').empty();
    }

    table = $("#exampleu").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosIn.aspx/ObtenerUsuarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull", render: function (data) {
                    return `<img src=${data} class="w-px-40 h-auto rounded-circle"/>`
                }
            },
            { "data": "FullName" },
            //{ "data": "Apellidos" },
            { "data": "Correo" },
            { "data": "Celular" },
            { "data": "FechaRegistro" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-primary">Activo</span>';
                    else
                        return '<span class="badge bg-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="bx bx-edit-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="bx bx-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        //"dom": "frtip",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
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

function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "UsuariosIn.aspx/ObtenerRol",
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


function sendDataToServerUsr(request) {
    $.ajax({
        type: "POST",
        url: "UsuariosIn.aspx/GuardarUsua",
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
            $('#btnRegistrarU').prop('disabled', false);
        }
    });
}

function registerDataUser() {
    var fileInput = document.getElementById('txtFotoUr');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["Nombres"] = $("#txtNombres").val().trim();
    modelo["Apellidos"] = $("#txtApellidos").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtContrasena").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["IdInmobiliaria"] = $("#cboInmobiliaria").val();
    modelo["IdRol"] = $("#cboRol").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Mensaje", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "warning");
            // Rehabilitar el botón si hay un error de validación
            $('#btnRegistrarU').prop('disabled', false);
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

$('#btnRegistrarU').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnRegistrarU').prop('disabled', true);

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
        $('#btnRegistrarU').prop('disabled', false);

        return;
    }

    registerDataUser();
})

//$('#btnRegistrarU').on('click', function () {
//    swal({
//        title: "Mensaje",
//        text: "Registrado con exito",
//        icon: "success",
//        timer: 2000,
//        buttons: false
//    });

//    setTimeout(function () {
//        window.location.href = 'ListaUsuariosIn.aspx';
//    }, 3000);

//})

$('#btnmodl').on('click', function () {
    $("#largeModal").modal("show");
})