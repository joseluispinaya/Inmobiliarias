using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
using CapaNegocio;
using System.Data;
using CapaEntidad;

namespace CapaPresentacion
{
	public class Utilidadesj
	{
        private static readonly string OpenAIApiKey = ConfigurationManager.AppSettings["OpenAIApiKey"];
        private static List<TablasEsquema> _esquemaCache = null;

        #region "PATRON SINGLETON"
        public static Utilidadesj _instancia = null;

        private Utilidadesj()
        {

        }

        public static Utilidadesj GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Utilidadesj();
            }
            return _instancia;
        }
        #endregion

        public List<TablasEsquema> EsquemaBD()
        {
            if (_esquemaCache != null)
                return _esquemaCache;

            var respuesta = NChatBot.GetInstance().EsquemaDatos();

            return _esquemaCache = respuesta.Estado
                ? respuesta.Data
                : new List<TablasEsquema>();
        }

        public string RespuestaAgenteModel(string prompt)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                var esquema = EsquemaBD();

                if (!esquema.Any())
                    return "No se pudo cargar el esquema de la base de datos.";

                // FILTRAR LAS TABLAS QUE QUIERES EXCLUIR
                var tablasExcluidas = new[] { "CONTRATOS", "ATENCIONES", "ADMINISTRADOR" };

                var esquemaFiltrado = esquema
                    .Where(tabla => !tablasExcluidas.Contains(tabla.NombreTabla, StringComparer.OrdinalIgnoreCase))
                    .ToList();

                var esquemaSimplificado = esquemaFiltrado.Select(tabla => new TablasEsquema
                {
                    NombreTabla = tabla.NombreTabla,
                    Columnas = tabla.Columnas.Select(col => new ColumnaEsquema
                    {
                        NombreColumna = col.NombreColumna,
                        TipoDato = col.TipoDato
                    }).ToList()
                }).ToList();

                string esquemaJson = JsonConvert.SerializeObject(esquemaSimplificado, Formatting.Indented);
                var promptSistema = $@"
                  Eres un generador automático de consultas T-SQL exclusivo para Microsoft SQL Server. No eres un asistente conversacional ni realizas ninguna otra tarea.

                  Tu ÚNICA función es convertir instrucciones en lenguaje natural en **sentencias SQL de tipo SELECT**, válidas y optimizadas, utilizando exclusivamente el siguiente esquema de base de datos:

                  {esquemaJson}

                  Debes interpretar correctamente términos ambiguos o sinónimos usando el siguiente diccionario:

                  DICCIONARIO DE SINÓNIMOS:
                  - USUARIO: usuarios, empleados, agentes, trabajadores del sistema
                  - PROPIETARIO: propietarios, dueños, vendedores
                  - INMOBILIARIA: inmobiliarias, agencias, empresas
                  - PROPIEDAD: propiedades, inmuebles, casas, departamentos, terrenos, viviendas
                  - DISTRITO: distritos, zonas, ubicaciones, barrios
                  - TIPO_PROPIEDAD: tipo de propiedad, categoría, clase de inmueble
                  - ROL: roles, permisos, perfiles

                  CAMPOS COMUNES:
                  - Nombres: nombre, nombres, nombre completo
                  - Apellidos: apellido, apellidos
                  - Correo: email, correo electrónico
                  - Clave: contraseña, clave
                  - Celular: teléfono, número, celular
                  - Direccion: dirección, ubicación, domicilio
                  - FechaRegistro: fecha de registro, fecha, cuándo fue creado
                  - IdInmobiliaria: inmobiliaria, agencia, empresa
                  - IdPropietario: propietario, dueño
                  - IdTipoPropi: tipo de propiedad, categoría
                  - Estado: estado, situación, disponibilidad
                  - Precio: precio, costo, valor
                  - Superficie: tamaño, área, superficie
                  - Comentario: comentario, descripción, detalle

                  REGLAS ESTRICTAS Y OBLIGATORIAS QUE DEBES CUMPLIR:

                  1. SOLO responde con una sentencia SQL de tipo SELECT si la instrucción es válida y está relacionada con el esquema proporcionado.
                  2. NO respondas saludos, despedidas, explicaciones ni ninguna conversación general.
                  3. SI la instrucción NO está relacionada con el esquema, responde únicamente con: NO_EXISTE
                  4. SI la instrucción solicita o implica cualquier operación que no sea SELECT (por ejemplo: INSERT, UPDATE, DELETE, CREATE, DROP, ALTER), responde únicamente con: NO_VALIDO
                  5. NO uses ningún bloque de código Markdown ni decoradores. Devuelve exclusivamente texto plano.
                  6. NO des comentarios, encabezados, descripciones ni justificaciones.
                  7. NO inventes nombres de tablas, columnas ni valores. Usa solamente los definidos en el esquema proporcionado.
                  8. SI la instrucción es ambigua pero puede deducirse razonablemente a una consulta SELECT con base en los sinónimos y campos comunes, genera la consulta SELECT correspondiente.
                  9. SI la instrucción es puramente conversacional o no contiene ninguna solicitud de consulta, responde únicamente con: NO_EXISTE

                  EJEMPLOS DE RESPUESTA ESPERADA:

                  ""original_query"": ""Listar todas las propiedades disponibles.""
                  ""sql_query"": ""SELECT * FROM PROPIEDADES WHERE Activo = 1;""

                  ""original_query"": ""Mostrar propiedades en el distrito 'Miraflores'""
                  ""sql_query"": ""SELECT P.* FROM PROPIEDADES P INNER JOIN DISTRITOS D ON P.IdDistrito = D.IdDistrito WHERE LOWER(D.Distrito) LIKE '%miraflores%' AND P.Activo = 1;""

                  ""original_query"": ""Ver propiedades tipo departamento.""
                  ""sql_query"": ""SELECT P.* FROM PROPIEDADES P INNER JOIN TIPO_PROPIEDADES T ON P.IdTipoPropi = T.IdTipoPropi WHERE LOWER(T.NombreTipo) LIKE '%departamento%' AND P.Activo = 1;""

                  ""original_query"": ""Listar agentes con sus roles.""
                  ""sql_query"": ""SELECT U.Nombres, U.Apellidos, R.Descripcion FROM USUARIOS U INNER JOIN ROLES R ON U.IdRol = R.IdRol;""

                  ""original_query"": ""Obtener propiedades de la inmobiliaria 'Sol Inmuebles'""
                  ""sql_query"": ""SELECT P.* FROM PROPIEDADES P INNER JOIN INMOBILIARIAS I ON P.IdInmobiliaria = I.IdInmobiliaria WHERE LOWER(I.NombreInmobiliaria) LIKE '%sol inmuebles%' AND P.Activo = 1;""

                  ""original_query"": ""Cuántas propiedades hay registradas este mes?""
                  ""sql_query"": ""SELECT COUNT(*) FROM PROPIEDADES WHERE MONTH(FechaRegistro) = MONTH(GETDATE()) AND YEAR(FechaRegistro) = YEAR(GETDATE());""

                  ""original_query"": ""Ver propietarios registrados con su inmobiliaria.""
                  ""sql_query"": ""SELECT P.Nombres, P.Apellidos, I.NombreInmobiliaria FROM PROPIETARIOS P INNER JOIN INMOBILIARIAS I ON P.IdInmobiliaria = I.IdInmobiliaria;""

                  Ahora, genera ÚNICAMENTE la sentencia SQL correspondiente para el siguiente requerimiento:
                  ";

                var requestBody = new
                {
                    model = "gpt-4",
                    messages = new[]
                    {
                        new { role = "system", content = promptSistema },
                        new { role = "user", content = prompt }
                    },
                    temperature = 0.2,
                    max_tokens = 300
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                        return $"Tuvimos un problema con el modelo: {response.StatusCode}";

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);
                    string respuestaChatbot = json.choices[0].message.content.ToString().Trim();

                    if (respuestaChatbot != "NO_VALIDO" && respuestaChatbot != "NO_EXISTE")
                        return AgenteHumanizadaSql(prompt, respuestaChatbot);

                    var saludo = AgentedeSaludo(prompt);
                    return saludo == "NO_SALUDA"
                        ? "Tu pregunta está fuera de nuestro modelo. Intentá con otra o reformulá tu consulta."
                        : saludo;
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema con el modelo excep. intentá nuevamente más tarde.";
            }
        }

        public string GenerarClave()
        {
            string clave = Guid.NewGuid().ToString("N").Substring(0, 6);
            return clave;
        }

        public string ConvertirSha256(string texto)
        {
            StringBuilder sb = new StringBuilder();
            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(texto));
                foreach (byte b in result)
                {
                    sb.Append(b.ToString("x2"));
                }
            }
            return sb.ToString();
        }

        public string UploadPhotoA(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }

        public bool EnviodeCorreo(string toEmailUser, string subjec, string clave, string confirmUrl)
        {
            try
            {
                //sbcj kxlt uqmw zoon
                var from = "joseluisdelta1@gmail.com";
                var name = "Inmobiliaria";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "sbcjkxltuqmwzoon";
                var correo = new MailMessage
                {
                    From = new MailAddress(from, name)
                };
                correo.To.Add(toEmailUser);
                correo.Subject = subjec;

                string cuerposss = $@"
                <div style='width:400px;border-radius:5px; margin:auto;background-color:#EDF6FF;box-shadow:0px 0px 10px #DEDEDE;padding:20px'>
                    <table style='width:100%'>
                        <tr>
                            <td align='center' colspan='2'>
                                <h2 style='color:#004DAF'>Bienvenido</h2>
                            </td>
                        </tr>
                        <tr>
                            <td align='left' colspan='2'>
                                <p>Se creó exitosamente tu usuario. Para validar tu cuenta presione en verificar.</p>
                            </td>
                        </tr>
                        <tr>
                            <td><h4 style='color:#004DAF;margin:2px'>Correo:</h4></td>
                            <td>{toEmailUser}</td>
                        </tr>
                        <tr>
                            <td><h4 style='color:#004DAF;margin:2px'>Contraseña:</h4></td>
                            <td>{clave}</td>
                        </tr>
                    </table>
                    <div style='background-color:#FFE1CE;padding:15px;margin-top:15px;margin-bottom:15px'>
                        <p style='margin:0px;color:#F45E00;'>Le recomendamos cambiar la contraseña una vez inicie sesión.</p>
                    </div>
                    <table>
                        <tr>
                            <td>Para verificar e iniciar sesión ingrese a la siguiente URL:</td>
                        </tr>
                    </table>
                    <a href='{confirmUrl}'>Verificar</a>
                </div>";


                correo.Body = cuerposss;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient
                {
                    Host = smtps,
                    Port = port,
                    Credentials = new NetworkCredential(from, password),
                    EnableSsl = true
                };

                smtp.Send(correo);
                return true;
            }
            catch (SmtpException)
            {
                return false;
                //throw new Exception("Error al enviar correo.", smtpEx);
            }
            catch (Exception)
            {
                return false;
                //throw new Exception("Error general", ex);
            }
        }

        public string AgenteHumanizadaSql(string pregunta, string ConsultaSql)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {
                var resultado = NChatBot.GetInstance().EjecutarConsultaLibre(ConsultaSql);

                if (!resultado.Estado || resultado.Data == null)
                {
                    return "Tuvimos un problema al ejecutar la consulta en la base de datos. Por favor, intentá nuevamente más tarde.";
                }

                var lista = new List<Dictionary<string, object>>();
                foreach (DataRow row in resultado.Data.Rows)
                {
                    var dict = new Dictionary<string, object>();
                    foreach (DataColumn col in resultado.Data.Columns)
                    {
                        dict[col.ColumnName] = row[col];
                    }
                    lista.Add(dict);
                }

                string esquemaJson = JsonConvert.SerializeObject(lista, Formatting.Indented);

                var promptSistema = $@"
                    Eres un asistente de IA que responde preguntas de forma clara, amigable y profesional.

                    Instrucciones:
                    - Tienes la pregunta original de un usuario y los datos obtenidos de la base de datos en formato JSON.
                    - Tu tarea es interpretar exclusivamente los datos y generar una respuesta útil, bien redactada y natural.
                    - No inventes información que no esté presente en los datos.
                    - No repitas literalmente el JSON en la respuesta.
                    - Si los datos están vacíos o no hay resultados, indícalo de forma educada.

                    Ejemplo:
                    Pregunta: ""¿Cuántos usuarios hay registrados?""
                    Datos: [{{ ""total"": 152 }}]
                    Respuesta esperada: ""Actualmente hay 152 usuarios registrados en el sistema.""

                    Ahora responde amablemente la siguiente pregunta del usuario usando únicamente los datos proporcionados.
                    ";

                var requestBody = new
                {
                    model = "gpt-4",
                    messages = new[]
                    {
                        new { role = "system", content = promptSistema },
                        new { role = "user", content = $"Pregunta: {pregunta}\nDatos: {esquemaJson}" }
                    },
                    temperature = 0.5,
                    max_tokens = 300
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Tuvimos un problema con el agente de respuestas. Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema al generar una respuesta de la consulta sql. Por favor, intentá nuevamente más tarde.";
            }
        }

        public string AgentedeSaludo(string pregunta)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {

                var mensajeSistema = $@"
                    Eres un asistente virtual de inmobiliaria que solo responde saludos o despedidas.

                    - Si el mensaje del usuario es un saludo (como ""Hola"", ""Buenos días"") o una despedida (como ""Gracias, hasta luego""), responde de forma amable, profesional y mencionando que eres un chat de inmobiliaria.
                    - Si el mensaje NO es un saludo o despedida, responde exactamente con: NO_SALUDA (sin comillas). No expliques por qué no es un saludo ni agregues ningún comentario. Si no estás seguro, responde NO_SALUDA.

                    Ejemplos:
                    - Usuario: ""Hola""
                    Respuesta: ""¡Hola! Soy un asistente virtual de inmobiliaria. ¿En qué puedo ayudarte?""
                    - Usuario: ""Buenos días""
                    Respuesta: ""¡Buenos días! Te saluda el chat de inmobiliaria. ¿Cómo puedo ayudarte hoy?""
                    - Usuario: ""Gracias, hasta luego""
                    Respuesta: ""¡Gracias a ti! Soy un asistente virtual de inmobiliaria. Que tengas un excelente día.""
                    - Usuario: ""¿Cuál es la capital de Francia?""
                    Respuesta: ""NO_SALUDA""

                    Responde ahora según estas instrucciones:
                    ";

                var requestBody = new
                {
                    model = "gpt-3.5-turbo",
                    messages = new[]
                    {
                        new { role = "system", content = mensajeSistema },
                        new { role = "user", content = pregunta }
                    },
                    temperature = 0.3,
                    max_tokens = 100
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Tuvimos un problema con el agente de saludos. Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "Tuvimos un problema de excepcion del agente de saludo. Por favor, intentá nuevamente más tarde.";
            }
        }

        public string PanaderiaBot(string pregunta)
        {
            var url = "https://api.openai.com/v1/chat/completions";

            try
            {

                var mensajeSistema = $@"
                    Eres un asistente de inteligencia artificial que solo responde preguntas sobre **recetas de panadería y repostería**.

                    Tu función es exclusivamente brindar información relacionada con:
                    - Preparación de panes, bizcochos, tortas, galletas, croissants, pasteles, etc.
                    - Ingredientes, cantidades, procedimientos, tiempos de horneado y técnicas de amasado.
                    - Tips, consejos o variantes de recetas de panadería o repostería casera o profesional.

                    ❌ Si la pregunta del usuario NO está relacionada con una receta de panadería o repostería, debes responder exactamente con: fuera de contexto  
                    (Sin comillas, sin explicación, sin signos de puntuación, sin emojis. Solo responde: fuera de contexto).

                    ### Ejemplos:

                    - Usuario: ""¿Cómo hago pan casero?""
                      Respuesta: ""Para hacer pan casero necesitas harina, agua, levadura, sal y tiempo de reposo para que leve...""

                    - Usuario: ""¿Cómo preparo una torta de chocolate sin horno?""
                      Respuesta: ""Puedes usar una base de galletas trituradas y una mezcla de chocolate derretido con crema y refrigerar...""

                    - Usuario: ""¿Cuál es la capital de España?""
                      Respuesta: fuera de contexto

                    - Usuario: ""¿Cómo le doy de comer a mi gato?""
                      Respuesta: fuera de contexto

                    - Usuario: ""¿Qué significa inflación?""
                      Respuesta: fuera de contexto

                    🔁 Regla final:  
                    Si tienes dudas o no estás seguro si la pregunta es sobre una receta de panadería o repostería, responde solamente: fuera de contexto
                    ";


                var requestBody = new
                {
                    model = "gpt-3.5-turbo",
                    messages = new[]
                    {
                        new { role = "system", content = mensajeSistema },
                        new { role = "user", content = pregunta }
                    },
                    temperature = 0.4,
                    max_tokens = 100
                };

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAIApiKey}");
                    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(url, content).GetAwaiter().GetResult();

                    if (!response.IsSuccessStatusCode)
                    {
                        return "Por favor, intentá nuevamente más tarde.";
                    }

                    var responseString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    dynamic json = JsonConvert.DeserializeObject(responseString);

                    return json.choices[0].message.content.ToString().Trim();
                }
            }
            catch (Exception)
            {
                return "intentá nuevamente más tarde.";
            }
        }
    }
}