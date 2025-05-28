
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");


let esquemaSimplificado = [];
const tokenOPENAI = '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';

// Initialize user message and file data
const userData = {
    message: null,
};

// Store chat history
const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

$(document).ready(function () {
    obtenerEsquema();
});


function obtenerEsquema() {
    $.ajax({
        type: "POST",
        url: "InicioPage.aspx/ObtenerEsquemaBD",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const esquema = response.d.Data;
                esquemaSimplificado = esquema.map(tabla => ({
                    NombreTabla: tabla.NombreTabla,
                    Columnas: tabla.Columnas.map(col => ({
                        NombreColumna: col.NombreColumna,
                        TipoDato: col.TipoDato
                    }))
                }));
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

// Función para agregar un mensaje al chat
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

async function responderAnteAdvertenciaIa(preguntaUsuario, mensajeAdvertencia) {
    const mensajeSistema = `
          Eres un asistente de IA que responde preguntas de forma clara, amable y profesional.
  
          Tienes dos elementos de entrada:
          1. La pregunta original del usuario.
          2. Un mensaje de advertencia que indica el tipo de situación detectada.
  
          Tu tarea es interpretar esa advertencia y redactar una respuesta útil, natural y bien formulada.
  
          Comportamiento según el tipo de advertencia:
          - Si la advertencia es "No permitido": responde educadamente que eres un asistente de consultas con funciones limitadas y sugiere reformular la pregunta.
          - Si la advertencia es "Saludos": responde con un saludo amable y ofrece tu ayuda.
          - Si la advertencia es "NO_VALIDO": indica de forma educada que solo puedes ayudar con consultas y no con acciones que modifiquen información.
          - Si la advertencia es "no existe relación con el esquema": responde de forma cortés que solo estás entrenado para asistir en consultas relacionadas con inmobiliarias.
          - Si la advertencia es "despedida": respóndele con una despedida amablemente y menciona que estarás disponible para futuras consultas.
  
          Ejemplos:
  
          Pregunta: "elimina los registros de usuarios"
          Advertencia: "No permitido"
          Respuesta esperada: "Actualmente solo estoy entrenado para ayudarte y brindarte asistencia en temas específicos. Por favor, intenta con otra consulta."
  
          Pregunta: "hola"
          Advertencia: "Saludos"
          Respuesta esperada: "¡Hola! Gracias por visitarnos. ¿En qué puedo ayudarte hoy?"
  
          Pregunta: "elimina los registros de usuarios"
          Advertencia: "NO_VALIDO"
          Respuesta esperada: "Solo puedo ayudarte con consultas, no con acciones que puedan afectar los datos del sistema."
  
          Pregunta: "¿Cuántos días tiene un mes?"
          Advertencia: "no existe relación con el esquema"
          Respuesta esperada: "Solo puedo ayudarte con consultas relacionadas con el sistema de inmobiliarias."
  
          Pregunta: "nos vemos luego"
          Advertencia: "despedida"
          Respuesta esperada: "Gracias por tu visita. Estaré aquí cuando necesites hacer otra consulta."
  
          Ahora responde educadamente a la siguiente pregunta del usuario, usando la información proporcionada.
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
                    { role: "user", content: `Pregunta: ${preguntaUsuario}\nAdvertencia: ${mensajeAdvertencia}` }
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
        return data.choices[0].message.content.trim();

    } catch (error) {
        console.error("Error al responder:", error.message);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
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
        return data.choices[0].message.content.trim();
        //const data = await response.json();
        //const respuestaHuma = data.choices[0].message.content.trim();

        //agregarMensaje(respuestaHuma, "bot-message");

    } catch (error) {
        console.error("Error al responder:", error.message);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
}

async function ejecutarConsultaSQL(sqlGenerado, userInput) {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "InicioPage.aspx/ConsultaSql",
            data: JSON.stringify({ ConsultaSql: sqlGenerado }),
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            const datos = response.d.Data;
            console.log(datos);
            const respuesta = await responderConOpenAI(userInput, datos);
            return respuesta;
        } else {
            return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return "Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.";
    }
}

async function analizarFrase(userInput, listaFrases) {
    const systemPrompt = `Tu tarea es identificar si el siguiente texto es un saludo o una despedida con errores de escritura.
Debes compararlo con esta lista de frases posibles: ${listaFrases.join(", ")}.
Si crees que el texto se parece a alguna de estas frases, respondé exactamente con la frase corregida. Si no se parece a ninguna, respondé con un texto vacío.`;

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
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userInput }
                ],
                temperature: 0.3,
                max_tokens: 50
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || "Error al llamar a la API de OpenAI");
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error al analizar la frase:", error.message);
        return "";
    }
}

const verificarFraseConCorreccion = async (userInput, listaFrases) => {
    const inputLower = userInput.toLowerCase().trim();
    const frasesNorm = listaFrases.map(f => f.toLowerCase());

    // Coincidencia directa
    if (frasesNorm.some(frase => inputLower.includes(frase))) {
        return true;
    }

    // Corrección por IA si no hubo coincidencia directa
    const posibleFrase = await analizarFrase(userInput, frasesNorm);
    return frasesNorm.includes(posibleFrase.toLowerCase());
};


// Generar respuesta de bot mediante API
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    // Agregar mensaje de usuario al historial de chat
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message }],
    });
    const userInput = userData.message;
    const instruccionesNovalidas = ["insertar", "actualizar", "eliminar", "borrar", "alterar", "remover", "clave", "contraseña", "modificar"];

    for (let palabrano of instruccionesNovalidas) {
        if (userInput.toLowerCase().includes(palabrano)) {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "No permitido");
            messageElement.innerText = respuesta;
            chatHistory.push({
                role: "model",
                parts: [{ text: respuesta }],
            });

            incomingMessageDiv.classList.remove("thinking");
            chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
            return;
        }
    }

    const instruccionesPeligrosas = ["insert", "update", "delete", "drop", "alter", "create", "truncate", "merge", "exec"];
    for (let palabra of instruccionesPeligrosas) {
        if (userInput.toLowerCase().includes(palabra)) {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "NO_VALIDO");
            messageElement.innerText = respuesta;
            chatHistory.push({
                role: "model",
                parts: [{ text: respuesta }],
            });

            incomingMessageDiv.classList.remove("thinking");
            chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
            return;
        }
    }

    // Frases y palabras comunes
    const saludos = [
        "hola", "buenas", "que tal", "hi", "hello", "buenos dias", "buenas tardes", "buenas noches",
        "que onda", "¿cómo estas?", "hey", "hey que tal"
    ];

    const despedidas = [
        "adios", "nos cheque", "gracias", "chau", "nos vemos", "hasta luego", "hasta pronto",
        "me tengo que ir", "hasta la proxima", "chau chau", "nos vemos luego", "cuidate"
    ];

    // Verificar saludos
    if (await verificarFraseConCorreccion(userInput, saludos)) {
        const respuesta = await responderAnteAdvertenciaIa(userInput, "Saludos");
        messageElement.innerText = respuesta;
        chatHistory.push({ role: "model", parts: [{ text: respuesta }] });
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        return;
    }

    // Verificar despedidas
    if (await verificarFraseConCorreccion(userInput, despedidas)) {
        const respuesta = await responderAnteAdvertenciaIa(userInput, "despedida");
        messageElement.innerText = respuesta;
        chatHistory.push({ role: "model", parts: [{ text: respuesta }] });
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        return;
    }

    //const saludos = ["hola", "buenas", "qué tal", "hi", "hello", "buenos días", "buenas tardes", "buenas noches"];
    //for (let palabra of saludos) {
    //    if (userInput.toLowerCase().includes(palabra)) {
    //        const respuesta = await responderAnteAdvertenciaIa(userInput, "Saludos");
    //        messageElement.innerText = respuesta;
    //        chatHistory.push({
    //            role: "model",
    //            parts: [{ text: respuesta }],
    //        });

    //        incomingMessageDiv.classList.remove("thinking");
    //        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    //        return;
    //    }
    //}

    //const despedidas = ["adios", "nos cheque", "gracias", "chau", "nos vemos", "hasta luego", "hasta pronto"];
    //if (despedidas.some(palabra => userInput.toLowerCase().includes(palabra))) {
    //    const respuesta = await responderAnteAdvertenciaIa(userInput, "despedida");
    //    messageElement.innerText = respuesta;
    //    chatHistory.push({
    //        role: "model",
    //        parts: [{ text: respuesta }],
    //    });

    //    incomingMessageDiv.classList.remove("thinking");
    //    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    //    return;
    //}

    const promptSistema = `
        Eres un asistente experto en generar consultas SQL específicamente para Microsoft SQL Server.

        Tu tarea es transformar instrucciones en lenguaje natural en consultas T-SQL válidas, claras y eficientes, usando el siguiente esquema de base de datos:

        ${JSON.stringify(esquemaSimplificado, null, 2)}

        Reglas importantes:
        - Usa correctamente la sintaxis de T-SQL para SQL Server.
        - Utiliza JOIN si se necesitan datos de varias tablas.
        - Aplica condiciones WHERE, filtros TOP, funciones como GETDATE(), DATEDIFF(), etc., si corresponde.
        - IMPORTANTE: No utilices bloques de código Markdown como \`\`\`sql o \`\`\`. Devuelve solo la sentencia SQL en texto plano.
        - No incluyas explicaciones, encabezados, ni texto adicional.
        - Si la instrucción no puede ser respondida con una sentencia SELECT o no está relacionada con el esquema, responde solo con: NO_VALIDO.

        Ejemplos:

        "original_query": "Mostrar los últimos 10 usuarios registrados."
        "sql_query": "SELECT TOP 10 * FROM USUARIOS ORDER BY IdUsuario DESC;"

        "original_query": "Mostrar todas las propiedades disponibles."
        "sql_query": "SELECT * FROM PROPIEDADES WHERE Estado = 'Disponible';"

        "original_query": "Mostrar las propiedades junto con su tipo y distrito."
        "sql_query": "SELECT P.Direccion, P.Precio, T.NombreTipo, D.Distrito FROM PROPIEDADES P INNER JOIN TIPO_PROPIEDADES T ON P.IdTipoPropi = T.IdTipoPropi INNER JOIN DISTRITOS D ON P.IdDistrito = D.IdDistrito;"

        "original_query": "Mostrar las propiedades con sus inmobiliarias."
        "sql_query": "SELECT P.Direccion, P.Precio, I.NombreInmobiliaria FROM PROPIEDADES P INNER JOIN INMOBILIARIAS I ON P.IdInmobiliaria = I.IdInmobiliaria;"

        "original_query": "Cuántas propiedades hay registradas por cada tipo."
        "sql_query": "SELECT T.NombreTipo, COUNT(*) AS Cantidad FROM PROPIEDADES P INNER JOIN TIPO_PROPIEDADES T ON P.IdTipoPropi = T.IdTipoPropi GROUP BY T.NombreTipo;"

        "original_query": "Mostrar propiedades registradas en el Distrito 5."
        "sql_query": "SELECT P.Direccion, P.Precio FROM PROPIEDADES P INNER JOIN DISTRITOS D ON P.IdDistrito = D.IdDistrito WHERE D.Distrito = 'Distrito 5';"

        "original_query": "Qué dirección tiene la inmobiliaria El Castillo."
        "sql_query": "SELECT Direccion FROM INMOBILIARIAS WHERE NombreInmobiliaria = 'El Castillo';"

        Ahora genera la consulta para el siguiente requerimiento:
        `;

    try {

        const responsea = await fetch("https://api.openai.com/v1/chat/completions", {
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

        if (!responsea.ok) {
            const err = await responsea.json();
            throw new Error(err.error.message || "Error al llamar a la API de OpenAI");
        }

        const dataa = await responsea.json();
        let sqlGenerado = dataa.choices[0].message.content.trim();
        console.log("SQL inicio:", sqlGenerado);
        sqlGenerado = sqlGenerado.replace(/```sql|```/g, "").trim();
        console.log("SQL Limpio:", sqlGenerado);

        // Si OpenAI indica que no puede generar algo válido
        if (sqlGenerado === "NO_VALIDO") {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "no existe relación con el esquema");
            messageElement.innerText = respuesta;
            chatHistory.push({
                role: "model",
                parts: [{ text: respuesta }],
            });
            return;
        }

        // Segunda capa de validación: verificar la sentencia generada
        const sqlMayus = sqlGenerado.toUpperCase();
        if (!sqlMayus.startsWith("SELECT")) {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "Solo se pueden realizar consultas");
            messageElement.innerText = respuesta;
            chatHistory.push({
                role: "model",
                parts: [{ text: respuesta }],
            });
            return;
        }

        for (let palabra of instruccionesPeligrosas) {
            if (sqlMayus.includes(palabra.toUpperCase())) {
                const advertencia = `Se intenta ejecutar una instruccion peligrosa: ${instruccionesPeligrosas}`;
                const respuesta = await responderAnteAdvertenciaIa(userInput, advertencia);
                messageElement.innerText = respuesta;
                chatHistory.push({
                    role: "model",
                    parts: [{ text: respuesta }],
                });
                return;
            }
        }

        const tablasPermitidas = esquemaSimplificado.map(tabla => tabla.NombreTabla.toUpperCase());
        const tablasEnSQL = [...sqlMayus.matchAll(/\bFROM\s+(\w+)|\bJOIN\s+(\w+)/g)]
            .map(match => (match[1] || match[2]).toUpperCase());
        const tablasInvalidas = tablasEnSQL.filter(tabla => !tablasPermitidas.includes(tabla));

        if (tablasInvalidas.length > 0) {
            const advertencia = `La consulta intenta acceder a tablas no reconocidas: ${tablasInvalidas.join(", ")}`;
            const respuesta = await responderAnteAdvertenciaIa(userInput, advertencia);
            messageElement.innerText = respuesta;
            chatHistory.push({
                role: "model",
                parts: [{ text: respuesta }],
            });
            return;
        }

        console.log("SQL final:", sqlGenerado);
        const respuestase = await ejecutarConsultaSQL(sqlGenerado, userInput);
        messageElement.innerText = respuestase;
        chatHistory.push({
            role: "model",
            parts: [{ text: respuestase }],
        });

    } catch (error) {
        // Manejar errores en la respuesta de la API
        console.error("Error al generar SQL:", error.message);
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    } finally {
        // Restablecer los datos del archivo del usuario, eliminar el indicador de pensamiento y desplazar el chat hasta el final
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
};

// Gestionar mensajes de usuario salientes
const handleOutgoingMessage = (e) => {
    e.preventDefault();

    userData.message = messageInput.value.trim();

    if (!esquemaSimplificado.length) {
        swal("Advertencia", "El esquema aún no está cargado.", "warning");
        return;
    }

    messageInput.value = "";
    messageInput.dispatchEvent(new Event("input"));
    // Crear y mostrar mensajes de usuario
    const messageContent = `<div class="message-text"></div>`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    // Simular la respuesta del bot con el indicador de pensamiento después de un retraso
    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                                <path
                                  d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/></svg>
                                <div class="message-text">
                                  <div class="thinking-indicator">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                  </div>
                                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv);
    }, 600);
};

// Ajustar la altura del campo de entrada dinámicamente
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Manejar la pulsación de la tecla Enter para enviar mensajes
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && !e.shiftKey && userMessage && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
});

sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
