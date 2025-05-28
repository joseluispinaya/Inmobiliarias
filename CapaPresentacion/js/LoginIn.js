

$('#btnInciarSe').on('click', function () {
    $('#btnInciarSe').prop('disabled', true);

    const email = $("#txtemail").val().trim();
    const password = $("#txtpassword").val().trim();

    if (email === "" || password === "") {
        swal("Mensaje", "Debe ingresar un correo y contraseña", "warning");
        $('#btnInciarSe').prop('disabled', false);
        return;
    }

    loginUsuarioLoad(email, password);
});

function loginUsuarioLoad(email, password) {
    $.ajax({
        type: "POST",
        url: "LoginIn.aspx/Iniciar",
        data: JSON.stringify({ Usuario: email, Clave: password }),
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

            if (!response.d.Estado) {
                if (response.d.Valor === "admin") {
                    loginSistemaAdmin(email, password); // intenta login como admin
                } else {
                    swal("Mensaje", response.d.Mensaje, "warning");
                    $('#btnInciarSe').prop('disabled', false);
                }
                return;
            }

            // Usuario normal autenticado
            sessionStorage.setItem('token', response.d.Valor);
            sessionStorage.setItem('usuarioIn', JSON.stringify(response.d.Data));
            limpiarCampos();
            $('#btnInciarSe').prop('disabled', false);
            window.location.href = 'Home.aspx';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema, intente más tarde.", "error");
            console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            $('#btnInciarSe').prop('disabled', false);
        }
    });
}

function loginSistemaAdmin(email, password) {
    $.ajax({
        type: "POST",
        url: "LoginIn.aspx/LogeoAdmin",
        data: JSON.stringify({ Usuario: email, Clave: password }),
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
                sessionStorage.setItem('adminl', JSON.stringify(response.d.Data));
                limpiarCampos();
                $('#btnInciarSe').prop('disabled', false);
                window.location.href = 'Administrador.aspx';
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                $('#btnInciarSe').prop('disabled', false);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema, intente más tarde.", "error");
            console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            $('#btnInciarSe').prop('disabled', false);
        }
    });
}

function limpiarCampos() {
    $("#txtemail").val("");
    $("#txtpassword").val("");
}



//$('#btnInciarSe').on('click', function () {

//    $('#btnInciarSe').prop('disabled', true);


//    if ($("#txtemail").val().trim() === "" || $("#txtpassword").val().trim() === "") {

//        swal("Mensaje", "Debe Ingrese un Correo y Contraseña", "warning");
//        $('#btnInciarSe').prop('disabled', false);
//        return;
//    }

//    loginUsuarioLoad();
//})

//function loginUsuarioLoad() {

//    $.ajax({
//        type: "POST",
//        url: "LoginIn.aspx/Iniciar",
//        data: JSON.stringify({ Usuario: $("#txtemail").val().trim(), Clave: $("#txtpassword").val().trim() }),
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        beforeSend: function () {

//            $.LoadingOverlay("show", {
//                image: "",
//                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
//            });

//        },
//        success: function (response) {
//            $.LoadingOverlay("hide");
//            if (response.d.Estado) {

//                sessionStorage.setItem('token', response.d.Valor);
//                sessionStorage.setItem('usuarioIn', JSON.stringify(response.d.Data));
//                $("#txtemail").val("");
//                $("#txtpassword").val("");
//                window.location.href = 'Home.aspx';
//            } else {
//                swal("Mensaje", response.d.Mensaje, "warning");
//            }
//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            $.LoadingOverlay("hide");
//            swal("Error", "Hubo un problema intente mas tarde.", "error");
//            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
//        },
//        complete: function () {
//            $('#btnInciarSe').prop('disabled', false);
//        }
//    });
//}