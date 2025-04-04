using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().RegistrarUsuario(oUsuario);
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().ActualizarUsuario(oUsuario);
        }

        public Respuesta<List<EUsuario>> ListaUsuarios()
        {
            return DUsuario.GetInstance().ListaUsuarios();
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            return DUsuario.GetInstance().ListaRoles();
        }

        public Respuesta<List<EUsuario>> ObtenerUsuarios()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>()
                {
                    new EUsuario
                    {
                        IdUsuario = 1,
                        Nombres = "Juan",
                        Apellidos = "Perez",
                        Correo = "juan.perez@gmail.com",
                        Clave = "123456",
                        Celular = "789456123",
                        Foto = "",
                        Estado = true,
                        FechaRegistro = "20/03/2025"
                    },
                    new EUsuario
                    {
                        IdUsuario = 2,
                        Nombres = "Maria",
                        Apellidos = "Lopez",
                        Correo = "maria.lopez@gmail.com",
                        Clave = "abcdef",
                        Celular = "789123456",
                        Foto = "",
                        Estado = true,
                        FechaRegistro = "21/03/2025"
                    },
                    new EUsuario
                    {
                        IdUsuario = 3,
                        Nombres = "Carlos",
                        Apellidos = "Gomez",
                        Correo = "carlos.gomez@gmail.com",
                        Clave = "qwerty",
                        Celular = "789654123",
                        Foto = "",
                        Estado = false,
                        FechaRegistro = "22/03/2025"
                    }
                };

                return new Respuesta<List<EUsuario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
