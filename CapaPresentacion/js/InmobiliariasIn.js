
var table;

$(document).ready(function () {

    //$('#example').DataTable();
    $('#example').DataTable({
        responsive: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
})

$('#btnGuardarR').on('click', function () {

    swal("Mensaje", "Registro correcto", "success");
    // Remueve la clase 'show active' de la pestaña actual
    $('.tab-pane').removeClass('show active');

    // Agrega la clase 'show active' a la pestaña de "Inmobiliarias"
    $('#navs-pills-justified-home').addClass('show active');

    // Cambia el botón de la pestaña activa
    $('.nav-link').removeClass('active');
    $('button[data-bs-target="#navs-pills-justified-home"]').addClass('active');
})