
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

$(document).ready(function () {

    listaInmobilia();
    //$('#example').DataTable({
    //    responsive: true,
    //    language: {
    //        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
    //    }
    //});
})

function listaInmobilia() {
    if ($.fn.DataTable.isDataTable("#tbInmobi")) {
        $("#tbInmobi").DataTable().destroy();
        $('#tbInmobi tbody').empty();
    }

    table = $("#tbInmobi").DataTable({
        responsive: true,
        "ajax": {
            "url": 'InmobiliariasIn.aspx/ObtenerInmo',
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
            { "data": "IdInmobiliaria", "visible": false, "searchable": false },
            { "data": "NombreInmobiliaria" },
            { "data": "Propietario" },
            { "data": "Correo" },
            { "data": "Celular" },
            //{ "data": "FechaRegistro" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-label-primary me-1">Activo</span>';
                    else
                        return '<span class="badge bg-label-warning me-1">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="bx bx-edit-alt"></i>Editar</button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="bx bx-trash"></i>Eliminar</button>',
                "orderable": false,
                "searchable": false,
                "width": "100px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function dataRegistrar() {
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
                listaInmobilia();
                swal("Mensaje", response.d.Mensaje, "success");

                // Limpiar inputs
                $("input.modelval").val("");

                // Remueve la clase 'show active' de la pestaña actual
                $('.tab-pane').removeClass('show active');

                // Agrega la clase 'show active' a la pestaña de "Inmobiliarias"
                $('#navs-pills-justified-home').addClass('show active');

                // Cambia el botón de la pestaña activa
                $('.nav-link').removeClass('active');
                $('button[data-bs-target="#navs-pills-justified-home"]').addClass('active');
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
            $('#btnGuardarR').prop('disabled', false);
        }
    });
}

$('#btnGuardarR').on('click', function () {
    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarR').prop('disabled', true);

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
        $('#btnGuardarR').prop('disabled', false);

        return;
    }

    // Si todo está correcto
    dataRegistrar();
});