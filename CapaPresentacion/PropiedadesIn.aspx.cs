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
	public partial class PropiedadesIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}
        [WebMethod]
        public static Respuesta<List<ETipoPropiedad>> ListaTipoPropiedades()
        {
            try
            {
                Respuesta<List<ETipoPropiedad>> Lista = NPropiedad.GetInstance().ListaTipoPropiedades();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Tipos de Propiedad: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EDistrito>> ListaDistritos()
        {
            try
            {
                Respuesta<List<EDistrito>> Lista = NPropiedad.GetInstance().ListaDistritos();
                return Lista;
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EDistrito>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Distritos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<EPropietario> BuscarPropietario(int IdInmobi, string NroCi)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EPropietario> respuesta = NPropietario.GetInstance().BuscarPropietarioCi(IdInmobi, NroCi);

                if (respuesta == null || respuesta.Data == null)
                {
                    return new Respuesta<EPropietario>
                    {
                        Estado = false,
                        Mensaje = "El Propietario no se encuentra en el sistema"
                    };
                }

                return new Respuesta<EPropietario>
                {
                    Estado = true,
                    Data = respuesta.Data,
                    Mensaje = "Detalle del Propietario encontrado"
                };
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GurdarPropiedad(EPropiedad oPropiedad)
        {
            try
            {
                Respuesta<bool> respuesta = NPropiedad.GetInstance().RegistrarPropiedad(oPropiedad);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}