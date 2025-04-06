using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.IO;

namespace CapaPresentacion
{
	public partial class UsuariosIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ERol>> ObtenerRol()
        {
            try
            {
                Respuesta<List<ERol>> Lista = NUsuario.GetInstance().ListaRoles();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERol>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los roles: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EUsuario>> ObtenerUsuarios()
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los usuarios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GuardarUsua(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Generar clave aleatoria y encriptarla
                string claveGenerada = oUsuario.Clave;
                string claveEncriptada = utilidades.ConvertirSha256(claveGenerada);

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EUsuario obj = new EUsuario
                {
                    Nombres = oUsuario.Nombres,
                    Apellidos = oUsuario.Apellidos,
                    Correo = oUsuario.Correo,
                    Clave = claveEncriptada,
                    Celular = oUsuario.Celular,
                    Foto = imageUrl,
                    IdInmobiliaria = oUsuario.IdInmobiliaria,
                    IdRol = oUsuario.IdRol,
                    Token = Guid.NewGuid().ToString()
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NUsuario.GetInstance().RegistrarUsuario(obj);
                bool resultadoRegistro = respuesta.Estado;

                // Si se registra correctamente, enviar el correo
                if (resultadoRegistro)
                {
                    Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ListaUsuarios();
                    var listaUsuarios = Lista.Data;
                    var item = listaUsuarios.FirstOrDefault(x => x.Correo == obj.Correo);
                    if (item == null)
                    {
                        return new Respuesta<bool>() { Estado = true, Mensaje = "Usuario registrado pero no se pudo enviar correo" };
                    }

                    string confirmUrl = $"https://localhost:44311/ConfirmacionIn.aspx?id={item.IdUsuario}&token={obj.Token}";
                    bool correoEnviado = EnvioCorreoU(obj.Correo, claveGenerada, confirmUrl);
                    if (!correoEnviado)
                    {
                        // Manejar el error en el envío del correo (opcional)
                        return new Respuesta<bool>
                        {
                            Estado = true,
                            Mensaje = "El usuario fue registrado, pero hubo un problema al enviar el correo."
                        };
                    }
                }

                // Crear respuesta con el resultado del registro
                return new Respuesta<bool>
                {
                    Estado = resultadoRegistro,
                    Mensaje = resultadoRegistro ? "Registro exitoso. Verifique su correo." : "Error al registrar. Intente con otro correo."
                };
            }
            catch (Exception ex)
            {
                // Manejar excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        private static bool EnvioCorreoU(string correo, string clave, string confirmUrl)
        {
            try
            {
                // Instanciar Utilidadesj y enviar el correo
                return Utilidadesj.GetInstance().EnviodeCorreo(correo, "Confirmacion de cuenta", clave, confirmUrl);
            }
            catch (Exception)
            {
                // Si ocurre un error en el envío del correo, retornar false
                return false;
            }
        }
    }
}