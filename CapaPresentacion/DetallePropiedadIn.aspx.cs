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
	public partial class DetallePropiedadIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<EPropiedad> VerDetallePropiedad(int Idpropi)
        {
            try
            {
                Respuesta<EPropiedad> respuesta = NPropiedad.GetInstance().PropiedadInfoIdImagenes(Idpropi);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EPropiedad>
                    {
                        Estado = false,
                        Mensaje = "El Propiedad no se encuentra en el sistema"
                    };
                }

                return new Respuesta<EPropiedad>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Detalle del Propiedad encontrado"
                };
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EPropiedad>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GuardarImagen(int Idpropiedad, byte[] imageBytes)
        {
            try
            {
                if (Idpropiedad <= 0)
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "El identificador de propiedad no es válido."
                    };
                }

                string imageUrl = string.Empty;

                // Validar que se recibió una imagen
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagePropiedad/";
                        imageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);
                    }
                }
                else
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "No se recibió ninguna imagen."
                    };
                }

                // Crear el objeto de imagen
                var obj = new EImagenProp
                {
                    IdPropiedad = Idpropiedad,
                    UrlImagen = imageUrl
                };

                var respuesta = NPropiedad.GetInstance().RegistrarImagen(obj);
                return respuesta;
            }
            catch (Exception ex)
            {
                // Podrías loguear el error con un sistema de logs
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = $"Ocurrió un error inesperado al guardar la imagen: {ex.Message}"
                };
            }
        }
    }
}