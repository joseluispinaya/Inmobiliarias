using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace CapaPresentacion
{
	public class Utilidadesj
	{
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
    }
}