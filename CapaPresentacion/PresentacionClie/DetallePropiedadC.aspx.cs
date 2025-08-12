using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Globalization;

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

        [WebMethod]
        public static Respuesta<EInquilino> RegistroInq(EInquilino oInqui)
        {
            try
            {
                // Crear objeto EUsuario con los datos
                EInquilino obj = new EInquilino
                {
                    IdRol = oInqui.IdRol,
                    NroCI = oInqui.NroCI,
                    Nombres = oInqui.Nombres,
                    Apellidos = oInqui.Apellidos,
                    Celular = oInqui.Celular,
                    Direccion = oInqui.Direccion
                };

                var objr = NInquilino.GetInstance().RegistrarInquiClien(obj);
                if (!objr.Estado)
                {
                    return new Respuesta<EInquilino>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = objr.Mensaje
                    };
                }
                int idCli = Convert.ToInt32(objr.Valor);

                Respuesta<List<EInquilino>> Lista = NInquilino.GetInstance().ObtenerClientes();
                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdInquilino == idCli);

                if (item == null)
                {
                    return new Respuesta<EInquilino>
                    {
                        Estado = false,
                        Valor = "",
                        Mensaje = "No se encontro el Cliente"
                    };
                }

                return new Respuesta<EInquilino>
                {
                    Estado = item != null,
                    Data = item,
                    Mensaje = item != null ? "Registro realizado correctamente" : "Error al registrar, o Numero de ci existente."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EInquilino>
                {
                    Estado = false,
                    Valor = "",
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<EInquilino> BuscarCliente(string Nroci)
        {
            try
            {
                // Obtener solo el propietario buscado en lugar de cargar toda la lista
                Respuesta<EInquilino> respuesta = NInquilino.GetInstance().BuscarClienteCI(Nroci);
                return respuesta;
            }
            catch (Exception)
            {
                // Aquí podrías loggear el error en un sistema de logs como Serilog, NLog, etc.
                return new Respuesta<EInquilino>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado. Intente nuevamente."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> RegistroVisitaNuevo(EVisita oVisita)
        {
            try
            {
                if (oVisita == null)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Datos de solicitud no válidos." };
                }

                if (!DateTime.TryParseExact(oVisita.FechaVisita, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechavisi))
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "El formato de la fecha no es válido. Debe ser dd/MM/yyyy." };
                }

                // Validaciones adicionales (opcional)
                if (oVisita.IdInquilino <= 0 || oVisita.IdPropiedad <= 0 || oVisita.IdInmobiliaria <= 0)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Datos de identificación incompletos o inválidos." };
                }

                oVisita.VFechaVisita = fechavisi;

                return NInquilino.GetInstance().RegistrarVisita(oVisita);
            }
            catch (Exception ex)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> RegistroVisita(EVisita oVisita)
        {
            try
            {
                if (oVisita == null)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Datos de solicitud no válidos." };
                }

                if (!DateTime.TryParseExact(oVisita.FechaVisita, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechavisi))
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "El formato de la fecha no es válido. Debe ser dd/MM/yyyy." };
                }

                DateTime fechavisio = DateTime.ParseExact(oVisita.FechaVisita, "dd/MM/yyyy", CultureInfo.InvariantCulture);

                // Crear objeto EUsuario con los datos
                EVisita obj = new EVisita
                {
                    IdInmobiliaria = oVisita.IdInmobiliaria,
                    IdPropiedad = oVisita.IdPropiedad,
                    IdInquilino = oVisita.IdInquilino,
                    VFechaVisita = fechavisio,
                    HoraVisita = oVisita.HoraVisita,
                    Direccion = oVisita.Direccion,
                    Estado = oVisita.Estado
                };

                return new Respuesta<bool>
                {
                    Estado = obj != null,
                    Mensaje = obj != null ? "Registro realizado correctamente" : "Error al registrar."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}