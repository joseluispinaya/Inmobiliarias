
let esquemaSimplificado = [];
const tokenOPENAI = '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';

$(document).ready(function () {

    const tokenSesion = sessionStorage.getItem('token');
    const usuarioL = sessionStorage.getItem('usuarioIn');

    if (tokenSesion && usuarioL) {
        obtenerEsquema();
        const usuario = JSON.parse(usuarioL);
        obtenerDetalleUsuarioRP(usuario.IdUsuario);
    } else {
        window.location.href = 'LoginIn.aspx';
    }

    //obtenerEsquema();
});

// Manejo de cierre de sesión
$('#salirSis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

// Obtener y mostrar detalle del usuario
function obtenerDetalleUsuarioRP(idUsu) {
    $.ajax({
        type: "POST",
        url: "Home.aspx/ValidarToken",
        data: JSON.stringify({ IdUsu: idUsu }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const tokenSes = sessionStorage.getItem('token');

                if (tokenSes !== response.d.Valor) {
                    CerrarSesion();
                    return;
                }

                const usuarioL = sessionStorage.getItem('usuarioIn');
                if (usuarioL) {
                    const usuario = JSON.parse(usuarioL);

                    $("#lblApeUsu").text(usuario.Apellidos);
                    $("#lblRolus").text(usuario.Rol.Descripcion); // Cambiado de append() a text()

                    $("#fotoUsuari").attr("src", usuario.ImageFull);
                    $("#fotoUsdos").attr("src", usuario.ImageFull);
                } else {
                    console.error('No se encontró información del usuario en sessionStorage.');
                    window.location.href = 'LoginIn.aspx';
                }
            } else {
                window.location.href = 'LoginIn.aspx';
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Error al validar token:", xhr.status, xhr.responseText, thrownError);
            window.location.href = 'LoginIn.aspx';
        }
    });
}

// Función para cerrar sesión
function CerrarSesion() {
    sessionStorage.clear();
    window.location.replace('LoginIn.aspx');
}

function obtenerEsquema() {
    $.ajax({
        type: "POST",
        url: "Home.aspx/ObtenerEsquemaBD",
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

async function lenguajeNaturalASQL() {
    try {
        const userInput = $("#user-input").val().trim();
        if (!userInput) {
            swal("Advertencia", "Por favor ingresa una consulta.", "warning");
            return;
        }
        if (!esquemaSimplificado.length) {
            swal("Advertencia", "El esquema aún no está cargado.", "warning");
            return;
        }

        agregarMensaje(userInput, "user-message");
        $("#user-input").val("");
        document.getElementById("btn-loading").style.display = "inline";
        $('#btnenviar').prop('disabled', true);

        const instruccionesNovalidas = ["insertar", "actualizar", "eliminar", "borrar", "alterar", "remover", "clave", "contraseña", "modificar"];
        for (let palabrano of instruccionesNovalidas) {
            if (userInput.toLowerCase().includes(palabrano)) {
                const respuesta = await responderAnteAdvertenciaIa(userInput, "Accion no permitido");
                agregarMensaje(respuesta, "bot-message");
                document.getElementById("btn-loading").style.display = "none";
                $('#btnenviar').prop('disabled', false);
                return;
            }
        }

        const instruccionesPeligrosas = ["insert", "update", "delete", "drop", "alter", "create", "truncate", "merge", "exec"];
        for (let palabra of instruccionesPeligrosas) {
            if (userInput.toLowerCase().includes(palabra)) {
                const respuesta = await responderAnteAdvertenciaIa(userInput, "NO_VALIDO");
                agregarMensaje(respuesta, "bot-message");
                document.getElementById("btn-loading").style.display = "none";
                $('#btnenviar').prop('disabled', false);
                return;
            }
        }

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
        let sqlGenerado = data.choices[0].message.content.trim();
        console.log("SQL inicio:", sqlGenerado);
        // Limpieza por si vienen bloques ```sql por error
        sqlGenerado = sqlGenerado.replace(/```sql|```/g, "").trim();

        console.log("SQL Limpio:", sqlGenerado);

        // Si OpenAI indica que no puede generar algo válido
        if (sqlGenerado === "NO_VALIDO") {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "no existe relación con el esquema");
            agregarMensaje(respuesta, "bot-message");
            return;
        }

        // Segunda capa de validación: verificar la sentencia generada
        const sqlMayus = sqlGenerado.toUpperCase();
        if (!sqlMayus.startsWith("SELECT")) {
            const respuesta = await responderAnteAdvertenciaIa(userInput, "Solo consultas");
            agregarMensaje(respuesta, "bot-message");
            return;
        }

        for (let palabra of instruccionesPeligrosas) {
            if (sqlMayus.includes(palabra.toUpperCase())) {
                const advertencia = `Se intenta ejecutar una instruccion peligrosa: ${instruccionesPeligrosas}`;
                const respuesta = await responderAnteAdvertenciaIa(userInput, advertencia);
                agregarMensaje(respuesta, "bot-message");
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
            agregarMensaje(respuesta, "bot-message");
            return;
        }

        console.log("SQL final:", sqlGenerado);
        ejecutarConsultaSQL(sqlGenerado, userInput);

    } catch (error) {
        console.error("Error al generar SQL:", error.message);
        agregarMensaje("Hubo un problema al procesar tu consulta. Por favor, intentá nuevamente más tarde.", "bot-message");
    } finally {
        document.getElementById("btn-loading").style.display = "none";
        $('#btnenviar').prop('disabled', false);
    }
}

//async function lenguajeNaturalASQL() {
//    const userInput = $("#user-input").val().trim();
//    if (!userInput) {
//        swal("Advertencia", "Por favor ingresa una consulta.", "warning");
//        return;
//    }
//    if (!esquemaSimplificado.length) {
//        swal("Advertencia", "El esquema aún no está cargado.", "warning");
//        return;
//    }

//    // Primera capa de validación: proteger contra instrucciones peligrosas desde el input
//    const instruccionesNovalidas = ["insertar", "actualizar", "eliminar", "borrar", "alterar", "remover", "clave", "contraseña", "modificar"];
//    for (let palabrano of instruccionesNovalidas) {
//        if (userInput.toLowerCase().includes(palabrano)) {
//            swal("Advertencia", "No puede realizar alteraciones", "warning");
//            return;
//        }
//    }

//    const instruccionesPeligrosas = ["insert", "update", "delete", "drop", "alter", "create", "truncate", "merge", "exec"];
//    for (let palabra of instruccionesPeligrosas) {
//        if (userInput.toLowerCase().includes(palabra)) {
//            swal("Advertencia", "Solo se permiten consultas de lectura (SELECT).", "warning");
//            return;
//        }
//    }

//    agregarMensaje(userInput, "user-message");
//    $("#user-input").val("");
//    document.getElementById("btn-loading").style.display = "inline";
//    $('#btnenviar').prop('disabled', true);

//    const promptSistema = `
//    Eres un asistente experto en generar consultas SQL específicamente para Microsoft SQL Server.

//    Tu tarea es transformar instrucciones en lenguaje natural en consultas T-SQL válidas, claras y eficientes, usando el siguiente esquema de base de datos:

//    ${JSON.stringify(esquemaSimplificado, null, 2)}

//    Reglas importantes:
//    - Usa correctamente la sintaxis de T-SQL para SQL Server.
//    - Utiliza JOIN si se necesitan datos de varias tablas.
//    - Aplica condiciones WHERE, filtros TOP, funciones como GETDATE(), DATEDIFF(), etc., si corresponde.
//    - IMPORTANTE: No utilices bloques de código Markdown como \`\`\`sql o \`\`\`. Devuelve solo la sentencia SQL en texto plano.
//    - No incluyas explicaciones, encabezados, ni texto adicional.
//    - Si la instrucción no puede ser respondida con una sentencia SELECT o no está relacionada con el esquema, responde solo con: NO_VALIDO.

//    Ejemplos:

//    "original_query": "Mostrar los últimos 10 usuarios registrados."
//    "sql_query": "SELECT TOP 10 * FROM USUARIOS ORDER BY IdUsuario DESC;"

//    "original_query": "Mostrar todas las propiedades disponibles."
//    "sql_query": "SELECT * FROM PROPIEDADES WHERE Estado = 'Disponible';"

//    "original_query": "Mostrar las propiedades junto con su tipo y distrito."
//    "sql_query": "SELECT P.Direccion, P.Precio, T.NombreTipo, D.Distrito FROM PROPIEDADES P INNER JOIN TIPO_PROPIEDADES T ON P.IdTipoPropi = T.IdTipoPropi INNER JOIN DISTRITOS D ON P.IdDistrito = D.IdDistrito;"

//    "original_query": "Mostrar las propiedades con sus inmobiliarias."
//    "sql_query": "SELECT P.Direccion, P.Precio, I.NombreInmobiliaria FROM PROPIEDADES P INNER JOIN INMOBILIARIAS I ON P.IdInmobiliaria = I.IdInmobiliaria;"

//    "original_query": "Cuántas propiedades hay registradas por cada tipo."
//    "sql_query": "SELECT T.NombreTipo, COUNT(*) AS Cantidad FROM PROPIEDADES P INNER JOIN TIPO_PROPIEDADES T ON P.IdTipoPropi = T.IdTipoPropi GROUP BY T.NombreTipo;"

//    "original_query": "Mostrar propiedades registradas en el Distrito 5."
//    "sql_query": "SELECT P.Direccion, P.Precio FROM PROPIEDADES P INNER JOIN DISTRITOS D ON P.IdDistrito = D.IdDistrito WHERE D.Distrito = 'Distrito 5';"

//    "original_query": "Qué dirección tiene la inmobiliaria El Castillo."
//    "sql_query": "SELECT Direccion FROM INMOBILIARIAS WHERE NombreInmobiliaria = 'El Castillo';"

//    Ahora genera la consulta para el siguiente requerimiento:
//    `;

//    try {
//        const response = await fetch("https://api.openai.com/v1/chat/completions", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//                "Authorization": `Bearer ${tokenOPENAI}`
//            },
//            body: JSON.stringify({
//                model: "gpt-4o",
//                messages: [
//                    { role: "system", content: promptSistema },
//                    { role: "user", content: userInput }
//                ],
//                temperature: 0.2,
//                max_tokens: 300
//            })
//        });

//        if (!response.ok) {
//            const err = await response.json();
//            throw new Error(err.error.message || "Error al llamar a la API de OpenAI");
//        }

//        const data = await response.json();
//        let sqlGenerado = data.choices[0].message.content.trim();
//        console.log("SQL inicio:", sqlGenerado);
//        // Limpieza por si vienen bloques ```sql por error
//        sqlGenerado = sqlGenerado.replace(/```sql|```/g, "").trim();

//        console.log("SQL Limpio:", sqlGenerado);

//        // Si OpenAI indica que no puede generar algo válido
//        if (sqlGenerado === "NO_VALIDO") {
//            swal("Advertencia", "La solicitud no es válida o no está relacionada con el esquema.", "warning");
//            document.getElementById("btn-loading").style.display = "none";
//            $('#btnenviar').prop('disabled', false);
//            return;
//        }

//        // Segunda capa de validación: verificar la sentencia generada
//        const sqlMayus = sqlGenerado.toUpperCase();
//        if (!sqlMayus.startsWith("SELECT")) {
//            swal("Advertencia", "Solo se permiten consultas SELECT.", "warning");
//            document.getElementById("btn-loading").style.display = "none";
//            $('#btnenviar').prop('disabled', false);
//            return;
//        }

//        for (let palabra of instruccionesPeligrosas) {
//            if (sqlMayus.includes(palabra.toUpperCase())) {
//                swal("Advertencia", "La consulta generada contiene instrucciones no permitidas.", "warning");
//                document.getElementById("btn-loading").style.display = "none";
//                $('#btnenviar').prop('disabled', false);
//                return;
//            }
//        }

//        const tablasPermitidas = esquemaSimplificado.map(tabla => tabla.NombreTabla.toUpperCase());
//        const tablasEnSQL = [...sqlMayus.matchAll(/\bFROM\s+(\w+)|\bJOIN\s+(\w+)/g)]
//            .map(match => (match[1] || match[2]).toUpperCase());
//        const tablasInvalidas = tablasEnSQL.filter(tabla => !tablasPermitidas.includes(tabla));

//        if (tablasInvalidas.length > 0) {
//            swal("Advertencia", `La consulta intenta acceder a tablas no reconocidas: ${tablasInvalidas.join(", ")}`, "warning");
//            document.getElementById("btn-loading").style.display = "none";
//            $('#btnenviar').prop('disabled', false);
//            return;
//        }

//        console.log("SQL final:", sqlGenerado);

//        ejecutarConsultaSQL(sqlGenerado, userInput);

//    } catch (error) {
//        console.error("Error al generar SQL:", error.message);
//        agregarMensaje("Ocurrió un error generando la consulta SQL.", "bot-message");
//        document.getElementById("btn-loading").style.display = "none";
//        $('#btnenviar').prop('disabled', false);
//    }
//}

function ejecutarConsultaSQL(sqlGenerado, userInput) {
    $.ajax({
        type: "POST",
        url: "Home.aspx/ConsultaSql",
        data: JSON.stringify({ ConsultaSql: sqlGenerado }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const datos = response.d.Data;
                responderConOpenAI(userInput, datos);
            } else {
                agregarMensaje("Hubo un error al ejecutar la consulta.", "bot-message");
                document.getElementById("btn-loading").style.display = "none";
                $('#btnenviar').prop('disabled', false);
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            agregarMensaje("No se pudo ejecutar la consulta.", "bot-message");
            document.getElementById("btn-loading").style.display = "none";
            $('#btnenviar').prop('disabled', false);
        }
        // complete: function () {
        //     document.getElementById("btn-loading").style.display = "none";
        //     $('#btnenviar').prop('disabled', false);
        // }
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

    } catch (error) {
        console.error("Error al responder:", error.message);
        agregarMensaje("Tuvimos un problema al generar una respuesta. Por favor, intentá nuevamente más tarde.", "bot-message");
        //agregarMensaje("Hubo un error al procesar tu solicitud.", "bot-message");
    } finally {
        document.getElementById("btn-loading").style.display = "none";
        $('#btnenviar').prop('disabled', false);
    }
}

async function responderAnteAdvertenciaIa(preguntaUsuario, mensajeAdvertencia) {
    const mensajeSistema = `
        Eres un asistente de IA que responde preguntas de forma clara, amigable y profesional.

        Instrucciones:
        - Tienes la pregunta original de un usuario y el mensaje de advertencia obtenido ante una insidencia.
        - Tu tarea es interpretar la advertencia y generar una respuesta útil, bien redactada y natural.
        - Si la advertencia contiene NO_VALIDO, indícalo de forma educada que eres un chat bot de consultas e información.
        - Si la advertencia contiene no existe relación con el esquema, indícalo de forma educada que estás para asistir solo a consultas sobre Inmobiliarias.

        Ejemplos:
        Pregunta: "elimina los registros de usuarios"
        Advertencia: "NO_VALIDO"
        Respuesta esperada: "Actualmente solo puedo ayudarte en consultas y no en otras acciones que dañen el sistema."

        Pregunta: "¿Cuántos días tiene un mes?"
        Advertencia: "no existe relación con el esquema"
        Respuesta esperada: "Solo puedo ayudarte ante consultas sobre inmobiliarias."

        Ahora responde amablemente la siguiente pregunta del usuario usando la información proporcionada.
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