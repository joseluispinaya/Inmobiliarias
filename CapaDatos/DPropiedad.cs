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
    public class DPropiedad
    {
        #region "PATRON SINGLETON"
        public static DPropiedad _instancia = null;

        private DPropiedad()
        {

        }

        public static DPropiedad GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DPropiedad();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropiedad(EPropiedad propiedad)
        {
            try
            {
                bool respuesta;
                //bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPropiedades", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Direccion", propiedad.Direccion);
                        cmd.Parameters.AddWithValue("@Precio", propiedad.Precio);
                        cmd.Parameters.AddWithValue("@Superficie", propiedad.Superficie);
                        cmd.Parameters.AddWithValue("@IdInmobiliaria", propiedad.IdInmobiliaria);
                        cmd.Parameters.AddWithValue("@IdPropietario", propiedad.IdPropietario);
                        cmd.Parameters.AddWithValue("@IdDistrito", propiedad.IdDistrito);
                        cmd.Parameters.AddWithValue("@IdTipoPropi", propiedad.IdTipoPropi);
                        cmd.Parameters.AddWithValue("@Comentario", propiedad.Comentario);

                        cmd.Parameters.AddWithValue("@UrlTours", propiedad.UrlTours);
                        cmd.Parameters.AddWithValue("@Latitud", propiedad.Latitud);
                        cmd.Parameters.AddWithValue("@Longitud", propiedad.Longitud);
                        cmd.Parameters.AddWithValue("@Estado", propiedad.Estado);

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

        public Respuesta<List<EPropiedad>> ListaPropiedadesporInmoilia(int IdInmobi)
        {
            try
            {
                List<EPropiedad> rptLista = new List<EPropiedad>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_PropiedadesPorInmobiliaria", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPropiedad()
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    Superficie = float.Parse(dr["Superficie"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    UrlTours = dr["UrlTours"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    DistritoPr = new EDistrito() { Distrito = dr["Distrito"].ToString() },
                                    TipoPropiedad = new ETipoPropiedad() { NombreTipo = dr["NombreTipo"].ToString() }
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "propiedades obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropiedad> PropiedadInfoId(int Idpropi)
        {
            try
            {
                EPropiedad obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropiedadPorId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdPropiedad", Idpropi);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropiedad
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    Superficie = float.Parse(dr["Superficie"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    UrlTours = dr["UrlTours"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    DistritoPr = new EDistrito() { Distrito = dr["Distrito"].ToString() },
                                    TipoPropiedad = new ETipoPropiedad() { NombreTipo = dr["NombreTipo"].ToString() }
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EPropiedad>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propiedad obtenido correctamente" : "La propiedad no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EPropiedad>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EPropiedad>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EDistrito>> ListaDistritos()
        {
            try
            {
                List<EDistrito> rptListaRol = new List<EDistrito>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_Distritos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new EDistrito()
                                {
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    Distrito = dr["Distrito"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDistrito>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Distrito obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EDistrito>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ETipoPropiedad>> ListaTipoPropiedades()
        {
            try
            {
                List<ETipoPropiedad> rptListaRol = new List<ETipoPropiedad>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_Tipos_propiedades", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new ETipoPropiedad()
                                {
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    NombreTipo = dr["NombreTipo"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ETipoPropiedad>>()
                {
                    Estado = true,
                    Data = rptListaRol,
                    Mensaje = "Tipo de propiedades obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ETipoPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EPropiedad> PropiedadInfoIdImagenes(int Idpropi)
        {
            try
            {
                EPropiedad obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    con.Open();

                    // Obtener propietario
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropiedadPorId", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdPropiedad", Idpropi);

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.HasRows && dr.Read())
                            {
                                obj = new EPropiedad
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    Superficie = float.Parse(dr["Superficie"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    UrlTours = dr["UrlTours"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    DistritoPr = new EDistrito() { Distrito = dr["Distrito"].ToString() },
                                    TipoPropiedad = new ETipoPropiedad() { NombreTipo = dr["NombreTipo"].ToString() },
                                    ListaImagenes = new List<EImagenProp>()
                                };
                            }
                        }
                    }

                    // Si se encontró una propiedad, buscar sus imagenes
                    if (obj != null)
                    {
                        using (SqlCommand imagenCmd = new SqlCommand("usp_ObtenerImagenespropiedad", con))
                        {
                            imagenCmd.CommandType = CommandType.StoredProcedure;
                            imagenCmd.Parameters.AddWithValue("@IdPropiedad", obj.IdPropiedad);

                            using (SqlDataReader imageDr = imagenCmd.ExecuteReader())
                            {
                                while (imageDr.Read())
                                {
                                    EImagenProp imagePro = new EImagenProp()
                                    {
                                        IdImagen = Convert.ToInt32(imageDr["IdImagen"]),
                                        IdPropiedad = Convert.ToInt32(imageDr["IdPropiedad"]),
                                        UrlImagen = imageDr["UrlImagen"].ToString(),
                                        Estado = Convert.ToBoolean(imageDr["Estado"])
                                    };

                                    obj.ListaImagenes.Add(imagePro);
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EPropiedad>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Propiedad y sus imagenes obtenidos correctamente" : "La propiedad no se encuentra registrado"
                };
            }
            catch (SqlException ex)
            {
                return new Respuesta<EPropiedad>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EPropiedad>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarImagen(EImagenProp oImagen)
        {
            try
            {
                bool respuesta;
                //bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarImagen", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdPropiedad", oImagen.IdPropiedad);
                        cmd.Parameters.AddWithValue("@UrlImagen", oImagen.UrlImagen);

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
                    Mensaje = respuesta ? "Se registro la Imagen correctamente" : "Error al registrar intente mas Tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }


        // metodos para el inicio default
        public Respuesta<List<EPropiedad>> ListaTodasPropiedadesInicio()
        {
            try
            {
                List<EPropiedad> rptLista = new List<EPropiedad>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTodasPropiedades", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                EPropiedad propie = new EPropiedad()
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    Superficie = float.Parse(dr["Superficie"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    UrlTours = dr["UrlTours"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    InmobiliariaDe = new EInmobiliaria()
                                    {
                                        NombreInmobiliaria = dr["NombreInmobiliaria"].ToString(),
                                        Correo = dr["Correo"].ToString(),
                                        Direccion = dr["DireccionInmo"].ToString(),
                                        Celular = dr["Celular"].ToString()
                                    },
                                    DistritoPr = new EDistrito() { Distrito = dr["Distrito"].ToString() },
                                    TipoPropiedad = new ETipoPropiedad() { NombreTipo = dr["NombreTipo"].ToString() },
                                    ListaImagenes = new List<EImagenProp>() // Inicializamos la lista vacía
                                };
                                rptLista.Add(propie);
                            }
                        }
                    }
                    //Paso 2: Obtener las imagenes para cada propiedad
                    foreach (var propie in rptLista)
                    {
                        using (SqlCommand imagenCmd = new SqlCommand("usp_ObtenerImagenespropiedad", con))
                        {
                            imagenCmd.CommandType = CommandType.StoredProcedure;
                            imagenCmd.Parameters.AddWithValue("@IdPropiedad", propie.IdPropiedad);

                            using (SqlDataReader imageDr = imagenCmd.ExecuteReader())
                            {
                                while (imageDr.Read())
                                {
                                    EImagenProp imagePro = new EImagenProp()
                                    {
                                        IdImagen = Convert.ToInt32(imageDr["IdImagen"]),
                                        IdPropiedad = Convert.ToInt32(imageDr["IdPropiedad"]),
                                        UrlImagen = imageDr["UrlImagen"].ToString(),
                                        Estado = Convert.ToBoolean(imageDr["Estado"])
                                    };

                                    propie.ListaImagenes.Add(imagePro);
                                }
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propiedad y sus imagenes obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EPropiedad>> ListaPropiedadesFiltradoIn(int IdInmobi, int IdDistrito, int IdTipo)
        {
            try
            {
                List<EPropiedad> rptLista = new List<EPropiedad>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPropiedadesFiltrado", con))
                    {
                        comando.Parameters.AddWithValue("@IdInmobiliaria", IdInmobi);
                        comando.Parameters.AddWithValue("@IdDistrito", IdDistrito);
                        comando.Parameters.AddWithValue("@IdTipoPropi", IdTipo);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                EPropiedad propie = new EPropiedad()
                                {
                                    IdPropiedad = Convert.ToInt32(dr["IdPropiedad"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Precio = float.Parse(dr["Precio"].ToString()),
                                    Superficie = float.Parse(dr["Superficie"].ToString()),
                                    IdInmobiliaria = Convert.ToInt32(dr["IdInmobiliaria"]),
                                    IdPropietario = Convert.ToInt32(dr["IdPropietario"]),
                                    IdDistrito = Convert.ToInt32(dr["IdDistrito"]),
                                    IdTipoPropi = Convert.ToInt32(dr["IdTipoPropi"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    UrlTours = dr["UrlTours"].ToString(),
                                    Latitud = float.Parse(dr["Latitud"].ToString()),
                                    Longitud = float.Parse(dr["Longitud"].ToString()),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    InmobiliariaDe = new EInmobiliaria()
                                    {
                                        NombreInmobiliaria = dr["NombreInmobiliaria"].ToString(),
                                        Correo = dr["Correo"].ToString(),
                                        Direccion = dr["DireccionInmo"].ToString(),
                                        Celular = dr["Celular"].ToString()
                                    },
                                    DistritoPr = new EDistrito() { Distrito = dr["Distrito"].ToString() },
                                    TipoPropiedad = new ETipoPropiedad() { NombreTipo = dr["NombreTipo"].ToString() },
                                    ListaImagenes = new List<EImagenProp>() // Inicializamos la lista vacía
                                };
                                rptLista.Add(propie);
                            }
                        }
                    }
                    //Paso 2: Obtener las imagenes para cada propiedad
                    foreach (var propie in rptLista)
                    {
                        using (SqlCommand imagenCmd = new SqlCommand("usp_ObtenerImagenespropiedad", con))
                        {
                            imagenCmd.CommandType = CommandType.StoredProcedure;
                            imagenCmd.Parameters.AddWithValue("@IdPropiedad", propie.IdPropiedad);

                            using (SqlDataReader imageDr = imagenCmd.ExecuteReader())
                            {
                                while (imageDr.Read())
                                {
                                    EImagenProp imagePro = new EImagenProp()
                                    {
                                        IdImagen = Convert.ToInt32(imageDr["IdImagen"]),
                                        IdPropiedad = Convert.ToInt32(imageDr["IdPropiedad"]),
                                        UrlImagen = imageDr["UrlImagen"].ToString(),
                                        Estado = Convert.ToBoolean(imageDr["Estado"])
                                    };

                                    propie.ListaImagenes.Add(imagePro);
                                }
                            }
                        }
                    }
                }
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Propiedad y sus imagenes obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPropiedad>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
