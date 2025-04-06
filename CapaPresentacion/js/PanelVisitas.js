
function imagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploadedAvatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#uploadedAvatar').attr('src', "assets/img/avatars/1.png");
    }


}

$('#upload').change(function () {
    imagenSeleccionada(this);
});

$('#btnGuass').on('click', function () {
    $("#loadinn").LoadingOverlay("show", {
        image: "",
        custom: '<i class="bx bx-loader bx-spin" style="font-size: 5rem;"></i>'
    });

    // Hacer que el LoadingOverlay dure unos segundos antes de desaparecer
    setTimeout(function () {
        $("#loadinn").LoadingOverlay("hide");
    }, 4000); // El overlay se ocultará después de 1 segundo (1000 milisegundos)

})