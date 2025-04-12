
let esquemaSimplificado = [];
const tokenOPENAI = 'xxxxxxxxxx';

$(document).ready(function () {
    obtenerEsquema();
})

function obtenerEsquema() {

    $.ajax({
        type: "POST",
        url: "Home.aspx/ObtenerEsquemaBD",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                const esquema = response.d.Data;
                // Asignar a la variable global
                esquemaSimplificado = esquema.map(tabla => ({
                    NombreTabla: tabla.NombreTabla,
                    Columnas: tabla.Columnas.map(col => ({
                        NombreColumna: col.NombreColumna,
                        TipoDato: col.TipoDato
                    }))
                }));

                //console.log("Esquema simplificado listo:", esquemaSimplificado);
                //console.log(esquema);
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

async function responderConOpenAI(preguntaUsuario, datosSQL) {

    const mensajeSistema = `
      Eres un asistente de IA que responde preguntas de forma clara, amigable y profesional.
  
      Instrucciones:
      - Tienes la pregunta original de un usuario y los datos obtenidos de la base de datos en formato JSON.
      - Tu tarea es interpretar los datos y generar una respuesta útil, bien redactada y natural.
      - Si los datos están vacíos o no hay resultados, indícalo de forma educada.
  
      Ejemplo:
      Pregunta: "¿Cuántos usuarios hay registrados?"
      Datos: [{ total: 152 }]
      Respuesta esperada: "Actualmente hay 152 usuarios registrados en el sistema."
  
      Ahora responde amablemente la siguiente pregunta del usuario usando los datos proporcionados.
      `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenOPENAI}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: mensajeSistema },
                    { role: "user", content: `Pregunta: ${preguntaUsuario}\nDatos: ${JSON.stringify(datosSQL, null, 2)}` }
                ],
                temperature: 0.5,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar al modelo entrenado");
        }

        const data = await response.json();
        const respuestaHuma = data.choices[0].message.content.trim();

        agregarMensaje(respuestaHuma, "bot-message");

        //console.log(respuestaHuma);
        //swal("Respondio", "Todo bien respondio", "success");
    } catch (error) {
        console.error("Error al responder:", error.message);
        agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
        //swal("Error", "Ocurrió un problema generando la respuesta", "error");
    } finally {
        // Esto siempre se ejecuta
        document.getElementById("btn-loading").style.display = "none";
        $('#btnenviar').prop('disabled', false);
        //document.getElementById("btnenviar").disabled = false;
    }

}

function ejecutarConsultaSQL(sqlGenerado, userInput) {
    $.ajax({
        type: "POST",
        url: "Home.aspx/ConsultaSql",
        data: JSON.stringify({ ConsultaSql: sqlGenerado }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                var datos = response.d.Data;
                //console.log(datos);
                responderConOpenAI(userInput, datos);
                //swal("Consulta ejecutada", response.d.Mensaje, "success");

                // Podés renderizar datos en una tabla, por ejemplo
                // mostrarTablaResultados(datos);

            } else {
                agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            document.getElementById("btn-loading").style.display = "none";
            $('#btnenviar').prop('disabled', false);
        }
    });
}

async function lenguajeNaturalASQL() {
    const userInput = $("#user-input").val().trim();
    if (!userInput) {
        swal("Advertencia", "Por favor ingresa una consulta.", "warning");
        return;
    }
    if (!esquemaSimplificado.length) {
        swal("Advertencia", "El esquema aún no está cargado.", "warning");
        return;
    }

    // Agregar el mensaje del usuario al chat
    agregarMensaje(userInput, "user-message");
    $("#user-input").val("");

    document.getElementById("btn-loading").style.display = "inline";
    $('#btnenviar').prop('disabled', true);

    const promptSistema = `
        Eres un asistente de IA que genera consultas SQL específicamente para Microsoft SQL Server.

        Tu tarea es convertir instrucciones en lenguaje natural a consultas T-SQL válidas y eficientes usando el siguiente esquema de base de datos:

        ${JSON.stringify(esquemaSimplificado, null, 2)}

         Reglas:
        - Utiliza correctamente la sintaxis de T-SQL para SQL Server.
        - Usa JOIN cuando se necesiten datos de varias tablas.
        - Aplica condiciones WHERE, filtros TOP, funciones como GETDATE(), DATEDIFF(), etc. si corresponde.
        - Devuelve solamente la consulta SQL, sin explicaciones, sin formato de bloque, sin texto adicional.

        📌 Ejemplo:
        "original_query": "Show me the 5 most recently registered users."
        "sql_query": "SELECT TOP 5 * FROM USUARIOS ORDER BY FechaRegistro DESC;"

        Ahora genera la consulta para el siguiente requerimiento:
        `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenOPENAI}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: promptSistema },
                    { role: "user", content: userInput }
                ],
                temperature: 0.2,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar a la API de OpenAI");
        }

        const data = await response.json();
        const sqlGenerado = data.choices[0].message.content.trim();

        console.log("SQL generado:", sqlGenerado);

        // Verificar si la pregunta tiene relación con el esquema
        if (!preguntaRelacionadaConEsquema(userInput)) {
            agregarMensaje(sqlGenerado, "bot-message");
            //agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
            return;
        }

        ejecutarConsultaSQL(sqlGenerado, userInput);
        //$("#resultado-sql").text(sqlGenerado);
    } catch (error) {
        console.error("Error al consultar OpenAI:", error.message);
        //swal("Error", "Ocurrió un problema generando la consulta SQL", "error");
    } finally {
        document.getElementById("btn-loading").style.display = "none";
        $('#btnenviar').prop('disabled', false);
    }


    // Tu lógica...
}

function preguntaRelacionadaConEsquema(pregunta) {
    const preguntaLower = pregunta.toLowerCase();
    const palabrasClave = new Set();

    esquemaSimplificado.forEach(tabla => {
        palabrasClave.add(tabla.NombreTabla.toLowerCase());
        tabla.Columnas.forEach(col => palabrasClave.add(col.NombreColumna.toLowerCase()));
    });

    // Buscar si al menos una palabra clave está en la pregunta
    for (const palabra of palabrasClave) {
        if (preguntaLower.includes(palabra)) {
            return true;
        }
    }

    return false;
}

// Función para agregar un mensaje al chat
function agregarMensaje(texto, clase) {
    const chatMessages = document.getElementById("chat-messages");
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("message", clase);
    mensajeDiv.textContent = texto;
    chatMessages.appendChild(mensajeDiv);

    // Limitar el número de mensajes mostrados
    if (chatMessages.children.length > 50) {
        chatMessages.removeChild(chatMessages.firstChild);
    }

    // Aplicar animación
    setTimeout(() => {
        mensajeDiv.classList.add("visible");
    }, 10);

    // Desplazar el scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

$('#btnenviar').on('click', function () {

    lenguajeNaturalASQL();
})

$('#chatButton').on('click', function () {

    $('.chat-container').css('display', 'flex');
    $('#chatButton').css('display', 'none');
})

$('#closeChat').on('click', function () {

    $('.chat-container').css('display', 'none');
    $('#chatButton').css('display', 'block');
})

//$('#btnRegistrarU').on('click', function () {
//    swal({
//        title: "Mensaje",
//        text: "Registrado con exito",
//        icon: "success",
//        timer: 2000,
//        buttons: false
//    });

//    setTimeout(function () {
//        window.location.href = 'ListaUsuariosIn.aspx';
//    }, 3000);

//})