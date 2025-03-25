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
	public partial class UsuariosIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

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
    }
}