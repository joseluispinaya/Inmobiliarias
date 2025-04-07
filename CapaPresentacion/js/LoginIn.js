
$('#btnInciarSe').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnInciarSe').prop('disabled', true);


    if ($("#txtemail").val().trim() === "" || $("#txtpassword").val().trim() === "") {

        swal("Mensaje", "Debe Ingrese un Correo y Contraseña", "warning");
        $('#btnInciarSe').prop('disabled', false);
        return;
    }
    //swal("Mensaje", "Logeado exitoso", "success")

    loginUsuarioLoad();
})

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "LoginIn.aspx/Iniciar",
        data: JSON.stringify({ Usuario: $("#txtemail").val().trim(), Clave: $("#txtpassword").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {

            $.LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });

        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {

                //sessionStorage.setItem('tokenSesion', response.d.Valor);
                // Almacenar el objeto usuario completo en sessionStorage
                //sessionStorage.setItem('usuarioSt', JSON.stringify(response.d.Data));
                $("#txtemail").val("");
                $("#txtpassword").val("");
                window.location.href = 'Home.aspx';
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                //swal("Mensaje!", "No se encontro el usuario verifique correo y contraseña", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema intente mas tarde.", "error");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnInciarSe').prop('disabled', false);
        }
    });
}