
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