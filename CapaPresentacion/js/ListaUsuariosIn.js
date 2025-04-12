
var table;

$(document).ready(function () {

    listaUsuariosP();
})

function listaUsuariosP() {
    if ($.fn.DataTable.isDataTable("#exampleu")) {
        $("#exampleu").DataTable().destroy();
        $('#exampleu tbody').empty();
    }

    table = $("#exampleu").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ListaUsuariosIn.aspx/ListaUsuarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull",
                "orderable": false,
                "searchable": false,
                render: function (data) {
                    return `<img src=${data} class="w-px-40 h-auto rounded-circle"/>`;
                }
            },
            { "data": "FullName" },
            //{ "data": "Correo" },
            { "data": "Celular" },
            { "data": "Inmobiliaria.NombreInmobiliaria" },
            {
                "data": "Verificado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-label-primary me-1">Verificado</span>';
                    else
                        return '<span class="badge bg-label-warning me-1">No Verificado</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="bx bx-edit-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="bx bx-trash"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}