
let map;
let marker;

async function initMap() {
    const position = { lat: -11.013498, lng: -66.051847 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("mapaz"), {
        zoom: 14,
        center: position,
        mapId: "DEMOMAPA",
    });

    marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        gmpDraggable: true // Habilitar arrastrar
    });

    // Mostrar las coordenadas iniciales en los inputs
    updateInputs(position.lat, position.lng);

    // Evento para actualizar inputs al mover el marcador
    marker.addListener("dragend", function (event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        updateInputs(newLat, newLng);
    });

    // Evento para agregar marcador en un clic en el mapa
    map.addListener("click", function (event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        marker.position = new google.maps.LatLng(clickedLat, clickedLng);
        updateInputs(clickedLat, clickedLng);
    });

}

// Función para actualizar los inputs
function updateInputs(lat, lng) {
    document.getElementById("txtLatitud").value = lat.toFixed(6);
    document.getElementById("txtLongitud").value = lng.toFixed(6);
}

$('#btnGuardarPro').on('click', function () {
    if ($("#txtDireccion").val().trim() === "") {
        // ID del toast
        let toastId = "toastWarning";

        // Verificar si ya existe el toast en el DOM
        if ($("#" + toastId).length === 0) {
            // Crear el toast dinámicamente
            let toastHtml = `
                <div id="${toastId}" class="bs-toast toast position-fixed top-0 end-0 m-3 fade bg-warning" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
                    <div class="toast-header">
                    <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">Advertencia</div>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">La dirección es obligatoria.</div>
                </div>
            `;

            // Agregar el toast al body
            $("body").append(toastHtml);
        }

        // Obtener el toast y mostrarlo
        let toastElement = document.getElementById(toastId);
        let toastInstance = new bootstrap.Toast(toastElement);
        toastInstance.show();

        return;
    }
});
