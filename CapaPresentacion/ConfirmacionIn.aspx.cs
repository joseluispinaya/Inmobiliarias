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
	public partial class ConfirmacionIn : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<bool> ValidarVerificacion(int Iduser, string Token)
        {
            try
            {
                bool encontrado = !string.IsNullOrEmpty(Token);
                //string valorTok = string.Empty;
                //if (!string.IsNullOrWhiteSpace(Token))
                //{
                //    valorTok = Token;
                //}

                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ListaUsuarios();
                var listaUsuarios = Lista.Data;

                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == Iduser);
                if (item == null)
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "No se encontró el usuario. Intente más tarde."
                    };
                }

                return new Respuesta<bool>
                {
                    Estado = item.Verificado,
                    Valor = encontrado ? Token : "Vacio",
                    Mensaje = item.Verificado ? "La cuenta ya esta verificada" : "La cuenta no está verificada."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error. Intente más tarde."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ConfirmarCuenta(int Iduser)
        {
            try
            {
                Respuesta<bool> respuesta = NUsuario.GetInstance().VerificarUsuario(Iduser);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}