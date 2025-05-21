
var table;

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idProp = urlParams.get('id');

    if (idProp !== null && idProp.trim() !== "") {
        cargarDatosPropie(idProp);

    } else {
        swal({
            title: "Mensaje",
            text: "No hay parámetro de búsqueda válido en la URL",
            icon: "warning",
            timer: 2000,
            buttons: false
        });

        setTimeout(function () {
            window.location.href = 'ListaPropietariosIn.aspx';
        }, 3000);

    }

})

function cargarDatosPropie(idProp) {
    var request = {
        IdPropi: idProp
    };

    $.ajax({
        type: "POST",
        url: "DetallePropietarioIn.aspx/DetallePropietario",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loadDeta").LoadingOverlay("show", {
                image: "",
                custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
            });
        },
        success: function (response) {
            $("#loadDeta").LoadingOverlay("hide");

            if (response.d.Estado) {
                var datos = response.d.Data;
                //$("#txtIdclienSt").val(idProp);
                var canti = datos.NumeroPropiedades;
                var unidad = canti > 1 ? "Propiedades" : "Propiedad";

                $("#txtIdPropie").val(datos.IdPropietario);
                $("#txtFullnombre").val(datos.FullNameProp);
                $("#txtcelprop").val(datos.Celular);
                $("#txtNrociP").val(datos.NroCI);
                $("#lblDetalles").text("El propietario cuenta con " + canti + " " + unidad);

                var listaPropiedades = datos.ListaPropiedades;
                //console.log(listaPropiedades);
                tablaPropiedades(listaPropiedades);

            } else {
                swal({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "warning",
                    timer: 2000,
                    buttons: false
                });

                setTimeout(function () {
                    window.location.href = 'ListaPropietariosIn.aspx';
                }, 3000);

                //swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadDeta").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function tablaPropiedades(listaPropiedades) {
    if ($.fn.DataTable.isDataTable("#tbDtPropiedades")) {
        $("#tbDtPropiedades").DataTable().destroy();
        $("#tbDtPropiedades tbody").empty();
    }

    table = $("#tbDtPropiedades").DataTable({
        "responsive": true,
        "data": listaPropiedades,
        "columns": [
            { "data": "IdPropiedad", "visible": false, "searchable": false },
            { "data": "Codigo" },
            { "data": "Direccion" },
            { "data": "PrecioCade" },
            { "data": "MetrosCuad" },
            { "data": "TipoPropiedad.NombreTipo" },
            { "data": "Estado" },
            {
                "defaultContent":
                    "<button class=\"btn btn-primary btn-editar btn-sm me-2\">" +
                    "<i class=\"bx bx-edit-alt\"></i>" +
                    "</button>" +
                    "<button class=\"btn btn-success btn-detalle btn-sm me-2\">" +
                    "<i class=\"bx bx-detail\"></i>" +
                    "</button>" +
                    "<button class=\"btn btn-danger btn-eliminar btn-sm\">" +
                    "<i class=\"bx bx-trash\"></i>" +
                    "</button>",
                "orderable": false,
                "searchable": false,
                "width": "120px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbDtPropiedades tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'DetallePropiedadIn.aspx?id=' + model.IdPropiedad;
    window.location.href = url;
    //swal("Mensaje", "La mascota su ID: " + model.IdPropiedad, "success")
})

$('#btnAtras').on('click', function () {
    window.location.href = 'ListaPropietariosIn.aspx';
})