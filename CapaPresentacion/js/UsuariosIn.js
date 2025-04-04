
var table;

$(document).ready(function () {
    cargarRoles();
})

function listaUsuarios() {
    if ($.fn.DataTable.isDataTable("#exampleu")) {
        $("#exampleu").DataTable().destroy();
        $('#exampleu tbody').empty();
    }

    table = $("#exampleu").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosIn.aspx/ObtenerUsuarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull", render: function (data) {
                    return `<img src=${data} class="w-px-40 h-auto rounded-circle"/>`
                }
            },
            { "data": "FullName" },
            //{ "data": "Apellidos" },
            { "data": "Correo" },
            { "data": "Celular" },
            { "data": "FechaRegistro" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-primary">Activo</span>';
                    else
                        return '<span class="badge bg-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="bx bx-edit-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="bx bx-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        //"dom": "frtip",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "UsuariosIn.aspx/ObtenerRol",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioReg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioReg').attr('src', "Imagenes/sinimg.png");
    }


}

$('#txtFotoUr').change(function () {
    mostrarImagenSeleccionada(this);
});

$('#btnRegistrarU').on('click', function () {
    swal({
        title: "Mensaje",
        text: "Registrado con exito",
        icon: "success",
        timer: 2000,
        buttons: false
    });

    setTimeout(function () {
        window.location.href = 'ListaUsuariosIn.aspx';
    }, 3000);

})

$('#btnmodl').on('click', function () {
    $("#largeModal").modal("show");
})