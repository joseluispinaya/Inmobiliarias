
//$(document).ready(function () {
//    $(".carouselz").owlCarousel({
//        margin: 20,
//        loop: true,
//        autoplay: true,
//        autoplayTimeout: 2000, //2000ms = 2s;
//        autoplayHoverPause: true,
//        responsive: {
//            0: {
//                items: 1,
//                nav: false
//            },
//            600: {
//                items: 2,
//                nav: false
//            },
//            1000: {
//                items: 3,
//                nav: false
//            }
//        }
//    });
//})

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