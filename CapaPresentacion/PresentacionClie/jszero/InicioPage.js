
$(document).ready(function () {
    cargarInmobiliarias();
    cargarTipoPropiedadI();
    cargarDistritosI();

    //mostrarTodasPropiedades();
    mostrarPropiedadesFiltradas();
})

function mostrarTodasPropiedades() {

    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ListaTodasPropieda",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var datos = response.d.Data;
                console.log("todo: ", datos);
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function mostrarPropiedadesFiltradas() {

    var request = {
        IdInmobi: $("#cbmInmobi").val() == null ? "0" : $("#cbmInmobi").val(),
        IdDistrito: $("#cbmDistri").val() == null ? "0" : $("#cbmDistri").val(),
        IdTipo: $("#cbmTipo").val() == null ? "0" : $("#cbmTipo").val()
    };

    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ListaPropiedadFiltrada",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var datos = response.d.Data;
                var contenedor = $("#ltsPropied");
                contenedor.empty(); // Limpiar antes de renderizar

                datos.forEach(function (prop) {
                    var html = `
                    <div class="col-md-4">
                        <div class="property-wrap ftco-animate fadeInUp ftco-animated">
                            <div class="img d-flex align-items-center justify-content-center" style="background-image: url('${prop.FirstImage}');">
                                <a href="javascript:void(0);" onclick="verDetalle(${prop.IdPropiedad})" class="icon d-flex align-items-center justify-content-center btn-custom">
                                    <span class="ion-ios-link"></span>
                                </a>
                            </div>
                            <div class="text">
                                <p class="price mb-3"><span>Precio: </span><span class="orig-price">${prop.PrecioCade}<small> /oferta</small></span></p>
                                <h3 class="mb-0"><a href="#">Tipo: ${prop.TipoPropiedad.NombreTipo}</a></h3>
                                <span class="location d-inline-block mb-3"><i class="ion-ios-pin mr-2"></i>${prop.Direccion}</span>
                                <ul class="property_list">
                                    <li><span class="flaticon-bed"></span>${prop.Estado}</li>
                                    <li><span class="flaticon-floor-plan"></span>${prop.MetrosCuad}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
                    contenedor.append(html);
                });

                // Alternativamente: agregar clases por JS (si preferís dejar el HTML limpio)
                // contenedor.find('.ftco-animate').addClass('fadeInUp ftco-animated');

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarInmobiliarias() {
    $("#cbmInmobi").html("");

    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ObtenerInmo",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cbmInmobi");

                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdInmobiliaria }).text(row.NombreInmobiliaria).appendTo("#cbmInmobi");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarTipoPropiedadI() {
    $("#cbmTipo").html("");

    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ListaTipoPropiedades",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cbmTipo");

                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdTipoPropi }).text(row.NombreTipo).appendTo("#cbmTipo");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function cargarDistritosI() {
    $("#cbmDistri").html("");

    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ListaDistritos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cbmDistri");

                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdDistrito }).text(row.Distrito).appendTo("#cbmDistri");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnBuscar').on('click', function () {

    mostrarPropiedadesFiltradas();
})

function verDetalle(IdPropiedad) {
    //console.log("Ver Detalle de la propiedad con ID: " + IdPropiedad);
    var url = 'DetallePropiedadC.aspx?id=' + IdPropiedad;
    window.location.href = url;
    //window.open(url, '_blank');
}