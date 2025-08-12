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
    public class DInquilino
    {
        #region "PATRON SINGLETON"
        public static DInquilino _instancia = null;

        private DInquilino()
        {

        }

        public static DInquilino GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DInquilino();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<int> RegistrarInquiClien(EInquilino oInquili)
        {
            try
            {
                int resultado = 0;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarInquiCliente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdRol", oInquili.IdRol);
                        cmd.Parameters.AddWithValue("@NroCI", oInquili.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oInquili.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oInquili.Apellidos);
                        cmd.Parameters.AddWithValue("@Celular", oInquili.Celular);
                        cmd.Parameters.AddWithValue("@Direccion", oInquili.Direccion);


                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        resultado = Convert.ToInt32(outputParam.Value);
                    }
                }

                return new Respuesta<int>
                {
                    Estado = resultado > 0,
                    Valor = resultado.ToString(),
                    Mensaje = resultado > 0 ? "Registro realizado correctamente." : "Error al registrar, o Numero de ci existente."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        public Respuesta<EInquilino> BuscarClienteCI(string NroCi)
        {
            try
            {
                EInquilino obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarInquiCi", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@NroCI", NroCi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EInquilino
                                {
                                    IdInquilino = Convert.ToInt32(dr["IdInquilino"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EInquilino>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Cliente obtenido correctamente" : "El nro de ci no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EInquilino>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EInquilino>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EInquilino>> ObtenerClientes()
        {
            try
            {
                List<EInquilino> rptLista = new List<EInquilino>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerInquiCli", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EInquilino()
                                {
                                    IdInquilino = Convert.ToInt32(dr["IdInquilino"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EInquilino>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Clientes obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EInquilino>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarVisita(EVisita visita)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVisita", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdInmobiliaria", visita.IdInmobiliaria);
                        cmd.Parameters.AddWithValue("@IdPropiedad", visita.IdPropiedad);
                        cmd.Parameters.AddWithValue("@IdInquilino", visita.IdInquilino);
                        cmd.Parameters.AddWithValue("@FechaVisita", visita.VFechaVisita);
                        cmd.Parameters.AddWithValue("@HoraVisita", visita.HoraVisita);
                        cmd.Parameters.AddWithValue("@Direccion", visita.Direccion);
                        cmd.Parameters.AddWithValue("@Estado", visita.Estado);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar Intente más tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EVisita>> ObtenerVisitasPorInmobi(int IdInmobi)
        {
            try
            {
                List<EVisita> rptLista = new List<EVisita>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_VisitasPorInmobiliaria", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EVisita()
                                {
                                    IdVisita = Convert.ToInt32(dr["IdVisita"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    IdInquilino = Convert.ToInt32(dr["IdInquilino"]),
                                    FechaVisita = Convert.ToDateTime(dr["FechaVisita"].ToString()).ToString("yyyy-MM-dd"), // Formato ISO 8601
                                    VFechaVisita = Convert.ToDateTime(dr["FechaVisita"].ToString()),
                                    HoraVisita = dr["HoraVisita"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EVisita>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Visitas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EVisita>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarAtencion(int idVisita, int idUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarAtencion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdVisita", idVisita);
                        cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);

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
                    Mensaje = respuesta ? "Se registro la atencion correctamente" : "Error al registrar Intente más tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EAtencion>> AtencionesPorInmobi(int IdInmobi)
        {
            try
            {
                List<EAtencion> rptLista = new List<EAtencion>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_AtencionesPorInmobiliaria", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EAtencion()
                                {
                                    IdAtencion = Convert.ToInt32(dr["IdAtencion"]),
                                    IdVisita = Convert.ToInt32(dr["IdVisita"]),
                                    FechaAtencion = Convert.ToDateTime(dr["FechaAtencion"].ToString()).ToString("dd/MM/yyyy"),
                                    Codigo = dr["Codigo"].ToString(),
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    IdInquilino = Convert.ToInt32(dr["IdInquilino"]),
                                    FechaVisita = Convert.ToDateTime(dr["FechaVisita"].ToString()).ToString("dd/MM/yyyy"),
                                    HoraVisita = dr["HoraVisita"].ToString(),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    NombreUsuario = dr["NombreUsuario"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EAtencion>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Atenciones obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EAtencion>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
