using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class InmobiliariasIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EInmobiliaria>> ObtenerInmo()
        {
            try
            {
                Respuesta<List<EInmobiliaria>> Lista = NInmobiliaria.GetInstance().ObtenerInmobiliarias();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EInmobiliaria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las Inmobiliarias: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GurdarInmo(EInmobiliaria oInmobiliaria)
        {
            try
            {
                Respuesta<bool> respuesta = NInmobiliaria.GetInstance().RegistrarInmo(oInmobiliaria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}