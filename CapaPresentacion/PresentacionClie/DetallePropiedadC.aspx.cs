using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.PresentacionClie
{
	public partial class DetallePropiedadC : System.Web.UI.Page
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
    }
}