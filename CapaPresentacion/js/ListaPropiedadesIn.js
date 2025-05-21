
var table;

$(document).ready(function () {

    listaPropiedades();
})

function listaPropiedades() {
    if ($.fn.DataTable.isDataTable("#tbPropiedades")) {
        $("#tbPropiedades").DataTable().destroy();
        $('#tbPropiedades tbody').empty();
    }

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));
    var request = { IdInmobi: usuario.IdInmobiliaria }

    table = $("#tbPropiedades").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ListaPropiedadesIn.aspx/ListaPropiedadesporInmobi',
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
            { "data": "IdPropiedad", "visible": false, "searchable": false },
            { "data": "Codigo" },
            { "data": "Direccion" },
            { "data": "PrecioCade" },
            { "data": "MetrosCuad" },
            { "data": "TipoPropiedad.NombreTipo" },
            { "data": "Estado" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="bx bx-edit-alt"></i></button>' +
                    '<button class="btn btn-success btn-detalle btn-sm me-2"><i class="bx bx-detail"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="bx bx-trash"></i></button>',
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

$("#tbPropiedades tbody").on("click", ".btn-editar", function (e) {
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
})