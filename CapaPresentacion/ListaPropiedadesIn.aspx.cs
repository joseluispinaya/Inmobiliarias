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
	public partial class ListaPropiedadesIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EPropiedad>> ListaPropiedadesporInmobi(int IdInmobi)
        {
            try
            {
                Respuesta<List<EPropiedad>> Lista = NPropiedad.GetInstance().ListaPropiedadesporInmoilia(IdInmobi);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las propiedades: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}