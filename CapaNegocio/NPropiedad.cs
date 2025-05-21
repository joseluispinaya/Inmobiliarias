using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPropiedad
    {
        #region "PATRON SINGLETON"
        public static NPropiedad _instancia = null;

        private NPropiedad()
        {

        }

        public static NPropiedad GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NPropiedad();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropiedad(EPropiedad propiedad)
        {
            return DPropiedad.GetInstance().RegistrarPropiedad(propiedad);
        }

        public Respuesta<List<EPropiedad>> ListaPropiedadesporInmoilia(int IdInmobi)
        {
            return DPropiedad.GetInstance().ListaPropiedadesporInmoilia(IdInmobi);
        }

        public Respuesta<EPropiedad> PropiedadInfoId(int Idpropi)
        {
            return DPropiedad.GetInstance().PropiedadInfoId(Idpropi);
        }

        public Respuesta<List<EDistrito>> ListaDistritos()
        {
            return DPropiedad.GetInstance().ListaDistritos();
        }

        public Respuesta<List<ETipoPropiedad>> ListaTipoPropiedades()
        {
            return DPropiedad.GetInstance().ListaTipoPropiedades();
        }

        public Respuesta<EPropiedad> PropiedadInfoIdImagenes(int Idpropi)
        {
            return DPropiedad.GetInstance().PropiedadInfoIdImagenes(Idpropi);
        }

        public Respuesta<bool> RegistrarImagen(EImagenProp oImagen)
        {
            return DPropiedad.GetInstance().RegistrarImagen(oImagen);
        }

        public Respuesta<List<EPropiedad>> ListaTodasPropiedadesInicio()
        {
            return DPropiedad.GetInstance().ListaTodasPropiedadesInicio();
        }

        public Respuesta<List<EPropiedad>> ListaPropiedadesFiltradoIn(int IdInmobi, int IdDistrito, int IdTipo)
        {
            return DPropiedad.GetInstance().ListaPropiedadesFiltradoIn(IdInmobi, IdDistrito, IdTipo);
        }
    }
}
