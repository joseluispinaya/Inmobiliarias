﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DUsuario
    {
        #region "PATRON SINGLETON"
        public static DUsuario _instancia = null;

        private DUsuario()
        {

        }

        public static DUsuario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DUsuario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarUsuario(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdInmobiliaria", oUsuario.IdInmobiliaria);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@Token", oUsuario.Token);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", oUsuario.IdUsuario);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdInmobiliaria", oUsuario.IdInmobiliaria);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@Token", oUsuario.Token);
                        cmd.Parameters.AddWithValue("@Estado", oUsuario.Estado);

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

        public Respuesta<List<EUsuario>> ListaUsuarios()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUsuario()
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    Inmobiliaria = new EInmobiliaria()
                                    {
                                        NombreInmobiliaria = dr["NombreInmobiliaria"].ToString(),
                                        Propietario = dr["Propietario"].ToString(),
                                        Correo = dr["CorreoInmo"].ToString()
                                    },
                                    Rol = new ERol() { Descripcion = dr["DescripcionRol"].ToString() },
                                });
                            }
                        }
                    }
                }
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

        public Respuesta<List<ERol>> ListaRoles()
        {
            try
            {
                List<ERol> rptListaRol = new List<ERol>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerRoles", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ERol()
                                {
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ERol>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Roles obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERol>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
