
$(document).ready(function () {
    verPaseoVirtualMejo();
})

function verPaseoVirtualMejo() {
    var request = {
        Idpropi: 1
    };

    $.ajax({
        type: "POST",
        url: "ConsultasIn.aspx/VerPropiedad",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const datos = response.d.Data;
                const shortId = datos.UrlTours;

                if (shortId && shortId.trim() !== "") {
                    const container = document.createElement('div');
                    container.id = shortId;

                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.setAttribute('data-short', shortId);
                    script.setAttribute('data-path', 'tours');
                    script.setAttribute('data-is-self-hosted', 'false');
                    script.setAttribute('width', '100%');
                    script.setAttribute('height', '500px');
                    script.src = 'https://app.cloudpano.com/public/shareScript.js';

                    container.appendChild(script);

                    const placeholder = document.getElementById('paseo');
                    placeholder.innerHTML = ''; // Limpiar antes
                    placeholder.appendChild(container);
                } else {
                    swal("Aviso", "Esta propiedad no tiene paseo virtual asignado.", "info");
                }
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function verPaseoVirtual() {
    var request = {
        Idpropi: 1
    };

    $.ajax({
        type: "POST",
        url: "ConsultasIn.aspx/VerPropiedad",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            if (response.d.Estado) {
                const datos = response.d.Data;
                const shortId = datos.UrlTours;
                console.log(shortId);

                if (shortId && shortId.trim() !== "") {
                    // Crear contenedor del paseo virtual
                    const container = document.createElement('div');
                    container.id = shortId;

                    // Crear el script de CloudPano
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.setAttribute('data-short', shortId);
                    script.setAttribute('data-path', 'tours');
                    script.setAttribute('data-is-self-hosted', 'false');
                    script.setAttribute('width', '100%');
                    script.setAttribute('height', '500px');
                    script.src = 'https://app.cloudpano.com/public/shareScript.js';

                    // Agregar el script al contenedor
                    container.appendChild(script);

                    // Limpiar y agregar al placeholder
                    const placeholder = document.querySelector('.layout-demo-placeholder');
                    placeholder.innerHTML = ''; // Borra contenido anterior
                    placeholder.appendChild(container);
                } else {
                    swal("Aviso", "Esta propiedad no tiene paseo virtual asignado.", "info");
                }

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}
