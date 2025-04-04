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
    public class DInmobiliaria
    {
        #region "PATRON SINGLETON"
        public static DInmobiliaria _instancia = null;

        private DInmobiliaria()
        {

        }

        public static DInmobiliaria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DInmobiliaria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarInmo(EInmobiliaria oInmobiliaria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarInmobiliaria", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreInmobiliaria", oInmobiliaria.NombreInmobiliaria);
                        cmd.Parameters.AddWithValue("@Propietario", oInmobiliaria.Propietario);
                        cmd.Parameters.AddWithValue("@Correo", oInmobiliaria.Correo);
                        cmd.Parameters.AddWithValue("@Direccion", oInmobiliaria.Direccion);
                        cmd.Parameters.AddWithValue("@Celular", oInmobiliaria.Celular);

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

        public Respuesta<List<EInmobiliaria>> ObtenerInmobiliarias()
        {
            try
            {
                List<EInmobiliaria> rptLista = new List<EInmobiliaria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerInmobiliarias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EInmobiliaria()
                                {
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    NombreInmobiliaria = dr["NombreInmobiliaria"].ToString(),
                                    Propietario = dr["Propietario"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EInmobiliaria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Inmobiliarias obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EInmobiliaria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
