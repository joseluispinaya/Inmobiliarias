
const MODELO_BASE = {
    IdPropietario: 0,
    IdRol: 0,
    NroCI: "",
    Nombres: "",
    Apellidos: "",
    Celular: "",
    Direccion: "",
    Estado: true,
    IdInmobiliaria: 0
}

$(document).ready(function () {

    $("#cboEstado").prop("disabled", true);
})

function dataRegistrarProp() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPropietario"] = parseInt($("#txtIdPropietario").val());
    modelo["IdRol"] = 2;
    modelo["NroCI"] = $("#txtCi").val().trim();
    modelo["Nombres"] = $("#txtNombres").val().trim();
    modelo["Apellidos"] = $("#txtApellidos").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Direccion"] = $("#txtDireccion").val().trim();
    modelo["Estado"] = true;
    modelo["IdInmobiliaria"] = parseInt(usuario.IdInmobiliaria);

    var request = {
        oPropietario: modelo
    };

    $.ajax({
        type: "POST",
        url: "PropietariosIn.aspx/GurdarPropietario",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaderi").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#loaderi").LoadingOverlay("hide");
            if (response.d.Estado) {
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "success",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    window.location.href = 'ListaPropietariosIn.aspx';
                }, 3000);

                // Limpiar inputs
                //$("input.modelval").val("");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaderi").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarPropie').prop('disabled', false);
        }
    });
}

$('#btnGuardarPropie').on('click', function () {
    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarPropie').prop('disabled', true);

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
        $('#btnGuardarPropie').prop('disabled', false);

        return;
    }

    // Si todo está correcto
    dataRegistrarProp();
});