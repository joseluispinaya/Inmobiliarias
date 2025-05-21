using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DPropietario
    {
        #region "PATRON SINGLETON"
        public static DPropietario _instancia = null;

        private DPropietario()
        {

        }

        public static DPropietario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DPropietario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropietario(EPropietario oPropietario)
        {
            try
            {
                bool respuesta;
                //bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPropietario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdRol", oPropietario.IdRol);
                        cmd.Parameters.AddWithValue("@NroCI", oPropietario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oPropietario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oPropietario.Apellidos);
                        cmd.Parameters.AddWithValue("@Celular", oPropietario.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oPropietario.Direccion);
                        cmd.Parameters.AddWithValue("@IdInmobiliaria", oPropietario.IdInmobiliaria);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Nro CI"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarPropietario(EPropietario oPropietario)
        {
            try
            {
                bool respuesta;
                //bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarPropietario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdPropietario", oPropietario.IdPropietario);
                        cmd.Parameters.AddWithValue("@IdRol", oPropietario.IdRol);
                        cmd.Parameters.AddWithValue("@NroCI", oPropietario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oPropietario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oPropietario.Apellidos);
                        cmd.Parameters.AddWithValue("@Celular", oPropietario.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oPropietario.Direccion);
                        cmd.Parameters.AddWithValue("@Estado", oPropietario.Estado);
                        cmd.Parameters.AddWithValue("@IdInmobiliaria", oPropietario.IdInmobiliaria);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EPropietario>> ObtenerPropietariosPorInmobi(int IdInmobi)
        {
            try
            {
                List<EPropietario> rptLista = new List<EPropietario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_PropietariosPorInmobiliaria", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPropietario()
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propietarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EPropietario>> PropsyPropiedadesPorInmobi(int IdInmobi)
        {
            try
            {
                List<EPropietario> rptLista = new List<EPropietario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_PropietariosPorInmobiliaria", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                EPropietario propie = new EPropietario()
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    ListaPropiedades = new List<EPropiedad>() // Inicializamos la lista vacía
                                };

                                rptLista.Add(propie);
                            }
                        }
                    }
                    //Paso 2: Obtener las propiedades para cada propietario
                    foreach (var propie in rptLista)
                    {
                        using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerPropiedadesIdPropie", con))
                        {
                            productoCmd.CommandType = CommandType.StoredProcedure;
                            productoCmd.Parameters.AddWithValue("@IdPropietario", propie.IdPropietario);

                            using (SqlDataReader propiedDr = productoCmd.ExecuteReader())
                            {
                                while (propiedDr.Read())
                                {
                                    EPropiedad propiedadesPro = new EPropiedad()
                                    {
                                        IdPropiedad = Convert.ToInt32(propiedDr["IdPropiedad"]),
                                        Codigo = propiedDr["Codigo"].ToString(),
                                        Direccion = propiedDr["Direccion"].ToString(),
                                        Precio = float.Parse(propiedDr["Precio"].ToString()),
                                        Superficie = float.Parse(propiedDr["Superficie"].ToString()),
                                        IdInmobiliaria = Convert.ToInt32(propiedDr["IdInmobiliaria"]),
                                        IdDistrito = Convert.ToInt32(propiedDr["IdDistrito"]),
                                        IdTipoPropi = Convert.ToInt32(propiedDr["IdTipoPropi"]),
                                        Comentario = propiedDr["Comentario"].ToString(),
                                        Estado = propiedDr["Estado"].ToString(),
                                        Activo = Convert.ToBoolean(propiedDr["Activo"]),
                                        DistritoPr = new EDistrito() { Distrito = propiedDr["Distrito"].ToString() },
                                        TipoPropiedad = new ETipoPropiedad() { NombreTipo = propiedDr["NombreTipo"].ToString() }
                                    };

                                    propie.ListaPropiedades.Add(propiedadesPro);
                                }
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propietarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropietario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropietario> PropietarioconPropiedadesId(int Idpropi)
        {
            try
            {
                EPropietario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    con.Open();

                    // Obtener propietario
                    using (SqlCommand comando = new SqlCommand("usp_BuscarPropietarioId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdPropietario", Idpropi);

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropietario
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    ListaPropiedades = new List<EPropiedad>() // Inicializamos la lista vacía
                                };
                            }
                        }
                    }

                    // Si se encontró un propietario, buscar sus propiedades
                    if (obj != null)
                    {
                        using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerPropiedadesIdPropie", con))
                        {
                            productoCmd.CommandType = CommandType.StoredProcedure;
                            productoCmd.Parameters.AddWithValue("@IdPropietario", obj.IdPropietario);

                            using (SqlDataReader propiedDr = productoCmd.ExecuteReader())
                            {
                                while (propiedDr.Read())
                                {
                                    EPropiedad propiedadesPro = new EPropiedad()
                                    {
                                        IdPropiedad = Convert.ToInt32(propiedDr["IdPropiedad"]),
                                        Codigo = propiedDr["Codigo"].ToString(),
                                        Direccion = propiedDr["Direccion"].ToString(),
                                        Precio = float.Parse(propiedDr["Precio"].ToString()),
                                        Superficie = float.Parse(propiedDr["Superficie"].ToString()),
                                        IdInmobiliaria = Convert.ToInt32(propiedDr["IdInmobiliaria"]),
                                        IdDistrito = Convert.ToInt32(propiedDr["IdDistrito"]),
                                        IdTipoPropi = Convert.ToInt32(propiedDr["IdTipoPropi"]),
                                        Comentario = propiedDr["Comentario"].ToString(),
                                        Estado = propiedDr["Estado"].ToString(),
                                        Activo = Convert.ToBoolean(propiedDr["Activo"]),
                                        DistritoPr = new EDistrito() { Distrito = propiedDr["Distrito"].ToString() },
                                        TipoPropiedad = new ETipoPropiedad() { NombreTipo = propiedDr["NombreTipo"].ToString() }
                                    };

                                    obj.ListaPropiedades.Add(propiedadesPro);
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EPropietario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propietario y sus propiedades obtenidos correctamente" : "El propietario no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropietario> BuscarPropietarioCi(int IdInmobi, string NroCi)
        {
            try
            {
                EPropietario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarPropietarioCI", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        //comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.Parameters.AddWithValue("@NroCI", NroCi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropietario
                                {
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EPropietario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propietario obtenido correctamente" : "El nro de ci no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EPropietario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
