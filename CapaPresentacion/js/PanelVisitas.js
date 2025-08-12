
var table;

$(document).ready(function () {
    cargarVisitas();
    listaAtemciones();
    //$('#calendar').fullCalendar({
    //    header: {
    //        left: 'prev,next today',
    //        center: 'title',
    //        right: 'month, basicWeek, basicDay'
    //    }
    //});
})

let estadoRese = false;

function cargarVisitas() {

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));
    var request = { IdInmobi: usuario.IdInmobiliaria }

    $.ajax({
        type: "POST",
        url: "PanelVisitas.aspx/ObtenerVisitasPorInmobi",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                var events = [];

                //console.log(data.d.objeto);
                //start: row.FechaReserva,
                //var fechaHora = row.FechaReserva + 'T' + row.Hora; // Concatenar en formato ISO 8601 (yyyy-MM-ddTHH:mm)
                $.each(response.d.Data, function (i, row) {
                    var fechaHora = row.FechaVisita + 'T' + row.HoraVisita;

                    events.push({
                        id: row.IdVisita,
                        title: row.Estado,
                        start: fechaHora,
                        descripcion: row.Direccion,
                        idpropi: row.IdPropiedad,
                        idinqui: row.IdInquilino,
                        fechareg: row.FechaRegistro,
                        activo: row.Activo,
                        color: row.Color,
                        textColor: 'white'
                    });
                });

                $('#calendar').fullCalendar('destroy');
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month, basicWeek, basicDay'
                    },
                    editable: true,
                    events: events,
                    eventClick: function (calEvent, jsEvent, view) {

                        $("#txtIdVisi").val("0");
                        $("#lblferegi").text(calEvent.fechareg);
                        estadoRese = calEvent.activo;
                        detalleSolicit(calEvent.id, calEvent.idpropi, calEvent.idinqui);
                    }
                });
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function listaAtemciones() {
    if ($.fn.DataTable.isDataTable("#tbAtenciones")) {
        $("#tbAtenciones").DataTable().destroy();
        $('#tbAtenciones tbody').empty();
    }

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));
    var request = { IdInmobi: usuario.IdInmobiliaria }

    table = $("#tbAtenciones").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PanelVisitas.aspx/AtencionesPorInmobi',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    //console.log(json.d.Data);
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdAtencion", "visible": false, "searchable": false },
            { "data": "Codigo" },
            { "data": "FechaAtencion" },
            { "data": "FechaSoli" },
            { "data": "Estado" },
            { "data": "NombreUsuario" },
            {
                "defaultContent": '<button class="btn btn-success btn-detalle btn-sm"><i class="bx bx-detail"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function detalleSolicit($idVisi, $idProp, $idInq) {


    var request = {
        Idpropi: $idProp
    };

    $.ajax({
        type: "POST",
        url: "PanelVisitas.aspx/DetallePropiedadVisi",
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

                $("#txtIdVisi").val($idVisi);
                var datos = response.d.Data;

                $("#lblprcio").text(datos.PrecioCade);
                $("#lblDistri").text(datos.DistritoPr.Distrito);
                $("#lblSuperf").text(datos.MetrosCuad);
                $("#lblTipop").text(datos.TipoPropiedad.NombreTipo);
                $("#lblDireccion").text(datos.Direccion);


                // Validar estadoRese y habilitar o deshabilitar el botón
                if (estadoRese) {
                    $("#btnGuardarCambiosat").prop("disabled", false).text("Generar Atención");
                } else {
                    $("#btnGuardarCambiosat").prop("disabled", true).text("Atendido");
                }

                detalleClient($idInq);

                $("#modaldetall").modal("show");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadDeta").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function detalleClient($idInq) {


    var request = {
        IdCli: $idInq
    };

    $.ajax({
        type: "POST",
        url: "PanelVisitas.aspx/DetalleInq",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response.d.Estado) {

                var datos = response.d.Data;

                $("#lblclientev").text(datos.FullNameInq);
                $("#lblcelucli").text(datos.Celular);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function atenderVisita() {

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));

    var request = {
        idVisita: parseInt($("#txtIdVisi").val()),
        idUsuario: parseInt(usuario.IdUsuario)
    };

    $.ajax({
        type: "POST",
        url: "PanelVisitas.aspx/RegistrarAtencion",
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
                cargarVisitas();
                //listaAtemciones();
                $('#modaldetall').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadDeta").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnGuardarCambiosat').on('click', function () {
    //var idresevi = parseInt($("#txtIdVisi").val());
    //var idreser = $("#txtIdVisi").val();
    //var url = 'FrmVentaReserva.aspx?id=' + idreser;

    const usuario = sessionStorage.getItem('usuarioIn');

    if (!usuario) {
        swal("Mensaje", "Debe iniciar sesion nuevamente", "warning");
        return;
    }

    atenderVisita();
})