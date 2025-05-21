
var table;

$(document).ready(function () {
    //listaPropietariosComple();
    listaPropietarios();
})

function listaPropietariosComple() {

    $.ajax({
        type: "POST",
        url: "PropietariosIn.aspx/ListaPropietariosyPropied",
        data: JSON.stringify({ IdInmobi: 1 }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const datos = response.d.Data;
                console.log(datos);
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde", "error");
        }
    });
}

function listaPropietarios() {
    if ($.fn.DataTable.isDataTable("#tbPropietar")) {
        $("#tbPropietar").DataTable().destroy();
        $('#tbPropietar tbody').empty();
    }

    const usuario = JSON.parse(sessionStorage.getItem('usuarioIn'));
    //var request = { IdVete: usuario.IdInmobiliaria }
    var request = { IdInmobi: usuario.IdInmobiliaria }

    table = $("#tbPropietar").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PropietariosIn.aspx/ListaPropietariosyPropied',
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
            { "data": "IdPropietario", "visible": false, "searchable": false },
            { "data": "NroCI" },
            { "data": "FullNameProp" },
            { "data": "Celular" },
            { "data": "FechaRegistro" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-label-primary me-1">Activo</span>';
                    else
                        return '<span class="badge bg-label-warning me-1">No Activo</span>';
                }
            },
            { "data": "NumeroPropiedades" },
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

$("#tbPropietar tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    //let smss = `Id Propietario: ${model.IdPropietario}`;

    //swal("Mensaje", smss, "success");

    $("#txtIdPropietario").val(model.IdPropietario);
    $("#txtIdRol").val(model.IdRol);
    $("#txtIdInmobi").val(model.IdInmobiliaria);
    $("#txtNombres").val(model.Nombres);
    $("#txtApellidos").val(model.Apellidos);
    $("#txtCi").val(model.NroCI);
    $("#txtCelular").val(model.Celular);
    $("#txtDireccion").val(model.Direccion);


    $("#modalPropi").modal("show");
})


$("#tbPropietar tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'DetallePropietarioIn.aspx?id=' + model.IdPropietario;
    window.location.href = url;
})

$('#btnguardarCam').on('click', function () {
    $('#modalPropi').modal('hide');
    swal("Mensaje", "Actualizado bien", "success");

})