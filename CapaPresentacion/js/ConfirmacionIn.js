

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const token = urlParams.get('token');

    if (!id || !token || id.trim() === "" || token.trim() === "") {
        swal({
            title: "Mensaje",
            text: "No hay un parámetro válido recibido por url",
            icon: "error",
            timer: 2000,
            buttons: false
        });

        redirigirA('LoginIn.aspx');
    } else {
        verificarEstado(id, token);
    }
});

function redirigirA(url, delay = 3000) {
    setTimeout(() => window.location.href = url, delay);
}

function verificarEstado(iduser, token) {
    const request = {
        Iduser: iduser,
        Token: token
    };

    $.ajax({
        type: "POST",
        url: "ConfirmacionIn.aspx/ValidarVerificacion",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                window.location.href = 'LoginIn.aspx';
            } else {
                $("#txtIdUsuar").val(iduser);
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Hubo un problema al validar la verificación.", "error");
        }
    });
}

function confirmarCuenta() {
    //var idPropiet = $("#txtIdPropiee").val().trim();
    //parseInt($("#txtIdItem").val())
    const request = {
        Iduser: parseInt($("#txtIdUsuar").val())
    };

    $.ajax({
        type: "POST",
        url: "ConfirmacionIn.aspx/ConfirmarCuenta",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                swal({
                    title: "Mensaje",
                    text: "Cuenta Verificada Correctamente",
                    icon: "success",
                    timer: 2000,
                    buttons: false
                });

                redirigirA('LoginIn.aspx');
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Hubo un problema al validar la Cuenta.", "error");
        }
    });
}

$(document).on('click', '#btnConfir', function (e) {
    e.preventDefault();

    if (parseInt($("#txtIdUsuar").val()) === 0) {
        swal("Mensaje", "Ocurrio un error intente mas tarde.", "warning")
        return;
    }
    confirmarCuenta();
    //swal("Mensaje", "Se Cerro la Session", "success")
});