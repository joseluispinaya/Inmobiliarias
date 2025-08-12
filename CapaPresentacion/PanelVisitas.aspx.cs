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
	public partial class PanelVisitas : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EVisita>> ObtenerVisitasPorInmobi(int IdInmobi)
        {
            try
            {
                Respuesta<List<EVisita>> Lista = NInquilino.GetInstance().ObtenerVisitasPorInmobi(IdInmobi);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EVisita>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las propiedades: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<EPropiedad> DetallePropiedadVisi(int Idpropi)
        {
            try
            {
                Respuesta<EPropiedad> respuesta = NPropiedad.GetInstance().PropiedadInfoIdImagenes(Idpropi);

                return respuesta;
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
        public static Respuesta<EInquilino> DetalleInq(int IdCli)
        {
            try
            {

                Respuesta<List<EInquilino>> Lista = NInquilino.GetInstance().ObtenerClientes();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdInquilino == IdCli);

                if (item == null)
                {
                    return new Respuesta<EInquilino>
                    {
                        Estado = false,
                        Mensaje = "No se encontro el Cliente"
                    };
                }

                return new Respuesta<EInquilino>
                {
                    Estado = item != null,
                    Data = item,
                    Mensaje = item != null ? "Obtenido correctamente" : "Error no se encontro al cliente."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EInquilino>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> RegistrarAtencion(int idVisita, int idUsuario)
        {
            try
            {
                if (idVisita <= 0 || idUsuario <= 0)
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "Datos de identificación incompletos o inválidos."
                    };
                }

                var respuesta = NInquilino.GetInstance().RegistrarAtencion(idVisita, idUsuario);
                return respuesta;
            }
            catch (Exception ex)
            {
                // Podrías loguear el error con un sistema de logs
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = $"Ocurrió un error inesperado al guardar: {ex.Message}"
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EAtencion>> AtencionesPorInmobi(int IdInmobi)
        {
            try
            {
                Respuesta<List<EAtencion>> Lista = NInquilino.GetInstance().AtencionesPorInmobi(IdInmobi);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EAtencion>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las atenciones: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}