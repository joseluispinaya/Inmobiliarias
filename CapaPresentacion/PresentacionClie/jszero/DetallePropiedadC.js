

function ObtenerFechaA() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}
function ObtenerFechaa() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPropi = urlParams.get('id');

    if (idPropi !== null && idPropi.trim() !== "") {

        $.datepicker.setDefaults($.datepicker.regional["es"])

        cargarDatosPropiedad(idPropi);

        $("#txtFechaRese").datepicker({ dateFormat: "dd/mm/yy" });
        $("#txtFechaRese").val(ObtenerFechaA());

        $('#timepicker2').timepicker({
            timeFormat: 'H:i', // Formato 24 horas: 00:00 a 23:59
            interval: 30,        // Intervalo de 30 minutos
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });

        //$('#timepicker2').timepicker({
        //    timeFormat: 'h:i A',
        //    interval: 30,
        //    dynamic: false,
        //    dropdown: true,
        //    scrollbar: true
        //});

    } else {
        swal({
            title: "Mensaje",
            text: "No hay parámetro de búsqueda válido en la URL",
            icon: "warning",
            timer: 2000,
            buttons: false
        });
        redirigirAs('InicioPage.aspx');

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
        url: "DetallePropiedadC.aspx/VerDetallePropiedad",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            if (response.d.Estado) {
                var datos = response.d.Data;
                $("#txtIdPropieDetz").val(datos.IdPropiedad);
                $("#txtIdInmoz").val(datos.IdInmobiliaria);

                $("#lblTipop").text(datos.TipoPropiedad.NombreTipo);
                $("#lblDireccion").text(datos.Direccion);
                $("#txtPrecio").html(`<span class="ion-ios-checkmark-circle"></span> Precio: ${datos.PrecioCade}`);
                $("#txtmts").html(`<span class="ion-ios-checkmark-circle"></span> Superficie: ${datos.MetrosCuad}`);
                $("#txtEstado").html(`<span class="ion-ios-checkmark-circle"></span> Estado: ${datos.Estado}`);

                $("#lblComentarios").text(datos.Comentario);

                // Verificar latitud y definir mensaje de ubicación
                const latitud = parseFloat(datos.Latitud);
                const longitud = parseFloat(datos.Longitud);
                const tieneUbicacion = !isNaN(latitud) && latitud !== 0;

                const mensajeUbicacion = tieneUbicacion ?
                    "Ubicación de la propiedad, ver ubicación" :
                    "No cuenta con ubicación";

                const urlUbicacion = tieneUbicacion ?
                    `https://www.google.com/maps?q=${latitud},${longitud}` :
                    "#";

                $("#txturlubi").attr("href", urlUbicacion)
                    .html(`<i class="ion-ios-pin mr-2"></i> ${mensajeUbicacion}`);

                var listaImagenes = datos.ListaImagenes;
                verPaseoVirtual(datos.UrlTours);
                imagenespropiedad(listaImagenes);

            } else {
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "warning",
                    timer: 2000,
                    buttons: false
                });

                redirigirAs('InicioPage.aspx');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal({
                title: "Error",
                text: "Ocurrió un problema intente nuevamente",
                icon: "error",
                timer: 2000,
                buttons: false
            });
            redirigirAs('InicioPage.aspx');
        }
    });
}

function verPaseoVirtual(shortIdt) {
    const shortId = shortIdt;

    if (shortId && shortId.trim() !== "") {
        const container = document.createElement('div');
        container.id = shortId;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-short', shortId);
        script.setAttribute('data-path', 'tours');
        script.setAttribute('data-is-self-hosted', 'false');
        script.setAttribute('width', '100%');
        script.setAttribute('height', '500px');
        script.src = 'https://app.cloudpano.com/public/shareScript.js';

        container.appendChild(script);

        const placeholder = document.getElementById('paseo');
        placeholder.innerHTML = ''; // Limpiar antes
        placeholder.appendChild(container);
    } else {
        swal("Aviso", "Esta propiedad no tiene paseo virtual asignado.", "info");
    }
}

function imagenespropiedad(listaImagenes) {
    const $carousel = $(".carouselz");

    // Primero limpiamos el carrusel por si ya tenía contenido
    $carousel.trigger('destroy.owl.carousel'); // Destruye si ya está iniciado
    $carousel.html(""); // Limpia el contenido

    // Agregamos dinámicamente cada imagen
    listaImagenes.forEach(img => {
        const cardHtml = `
            <div class="cardz">
                <div class="imgz">
                    <img src="${img.UrlImagen}" alt="">
                </div>
            </div>`;
        $carousel.append(cardHtml);
    });

    // Volvemos a inicializar el carrusel
    $carousel.owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false }
        }
    });
}

$('#btnReservar').on('click', function () {

    const cliente = sessionStorage.getItem('clienteIn');

    if (cliente) {
        $("#modalGrande").modal("show");
    } else {
        $("#miModalogo").modal("show");
    }

    //$("#miModalogo").modal("show");
})

function buscarCliente() {

    $.ajax({
        type: "POST",
        url: "DetallePropiedadC.aspx/BuscarCliente",
        data: JSON.stringify({ Nroci: $("#txtNroCiz").val().trim() }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            $('#miModalogo').modal('hide');
            if (response.d.Estado) {
                
                sessionStorage.setItem('clienteIn', JSON.stringify(response.d.Data));

                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "success",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    $("#modalGrande").modal("show");
                }, 2000);

            } else {
                swal({
                    title: "Mensaje",
                    text: "No se encontro en nuestro sistema Debe iniciar un Registro",
                    icon: "warning",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    $("#miModal").modal("show");
                }, 2000);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarProLogi').prop('disabled', false);
        }
    });
}

$('#btnGuardarProLogi').on('click', function () {
    $('#btnGuardarProLogi').prop('disabled', true);

    const nroci = $("#txtNroCiz").val().trim();

    if (nroci === "") {
        toastr.warning("", "Debe completar el campo numero de C.I.");
        $("#txtNroCiz").focus();
        $('#btnGuardarProLogi').prop('disabled', false);
        return;
    }


    // Si todo está bien, continúa con el proceso
    buscarCliente();
});


//$('#btnGuardarProLogi').on('click', function () {
//    const nroci = $("#txtNroCiz").val().trim();

//    if (nroci !== "7645323") {

//        $('#miModalogo').modal('hide');

//        swal({
//            title: "Mensaje",
//            text: "Debe Registrarse",
//            icon: "warning",
//            timer: 2000,
//            buttons: false
//        });

//        setTimeout(function () {
//            $("#miModal").modal("show");
//        }, 2000);

//    } else {
//        sessionStorage.setItem('clienteIn', nroci);

//        $('#miModalogo').modal('hide');
//        swal({
//            title: "Mensaje",
//            text: "Gracias por Iniciar sesión",
//            icon: "success",
//            timer: 2000,
//            buttons: false
//        });

//        setTimeout(function () {
//            $("#modalGrande").modal("show");
//        }, 2000);
//    }
//});

function registroCliente() {

    var modelo = {
        IdRol: 3,
        NroCI: $("#txtNumeroDocumento").val().trim(),
        Nombres: $("#txtNombresz").val().trim(),
        Apellidos: $("#txtApellidosz").val().trim(),
        Celular: $("#txtCelularz").val().trim(),
        Direccion: $("#txtDireccionz").val().trim()
    }

    var request = {
        oInqui: modelo
    };

    $.ajax({
        type: "POST",
        url: "DetallePropiedadC.aspx/RegistroInq",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadcl").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#loadcl").LoadingOverlay("hide");
            if (response.d.Estado) {
                //console.log(response.d.Data);
                $('#miModal').modal('hide');

                sessionStorage.setItem('clienteIn', JSON.stringify(response.d.Data));
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "success",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    $("#modalGrande").modal("show");
                }, 2000);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadcl").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarProz').prop('disabled', false);
        }
    });
}

$('#btnGuardarProz').on('click', function () {
    $('#btnGuardarProz').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()

        // Rehabilitar el botón si hay campos vacíos
        $('#btnGuardarProz').prop('disabled', false);
        return;
    }

    registroCliente();
});

function registroVisitas() {

    const cliente = JSON.parse(sessionStorage.getItem('clienteIn'));

    var modelo = {
        IdInmobiliaria: parseInt($("#txtIdInmoz").val()),
        IdPropiedad: parseInt($("#txtIdPropieDetz").val()),
        IdInquilino: parseInt(cliente.IdInquilino),
        FechaVisita: $("#txtFechaRese").val(),
        HoraVisita: $("#timepicker2").val(),
        Direccion: $("#txtEncuentro").val().trim(),
        Estado: "Confirmado"
    }

    var request = {
        oVisita: modelo
    };

    $.ajax({
        type: "POST",
        url: "DetallePropiedadC.aspx/RegistroVisitaNuevo",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadVisi").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 4rem;"></i>'
            });
        },
        success: function (response) {
            $("#loadVisi").LoadingOverlay("hide");
            if (response.d.Estado) {
                $('#modalGrande').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadVisi").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarReserva').prop('disabled', false);
        }
    });
}

$('#btnGuardarReserva').on('click', function () {

    $('#btnGuardarReserva').prop('disabled', true);

    const cliente = sessionStorage.getItem('clienteIn');

    if (!cliente) {
        swal("Mensaje", "Debe iniciar sesion", "warning");
        $('#btnGuardarReserva').prop('disabled', false);
        return;
    }

    //var fechaReseStra = $("#txtFechaRese").val();
    var horaReser = $("#timepicker2").val();

    if ($("#txtEncuentro").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Punto de encuentro");
        $("#txtEncuentro").focus();
        $('#btnGuardarReserva').prop('disabled', false);
        return;
    }
    if (horaReser === "") {
        toastr.warning("", "Debe Seleccionar la Hora");
        $('#btnGuardarReserva').prop('disabled', false);
        return;
    }

    registroVisitas();
});

//$('#btnGuardarProz').on('click', function () {
//    const nroci = $("#txtNumeroDocumento").val().trim();
//    sessionStorage.setItem('clienteIn', nroci);

//    $('#miModal').modal('hide');

//    swal({
//        title: "Mensaje",
//        text: "Gracias por Registrarse",
//        icon: "success",
//        timer: 2000,
//        buttons: false
//    });

//    setTimeout(function () {
//        $("#modalGrande").modal("show");
//    }, 2000);
//});