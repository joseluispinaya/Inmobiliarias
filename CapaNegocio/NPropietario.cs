using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPropietario
    {
        #region "PATRON SINGLETON"
        public static NPropietario _instancia = null;

        private NPropietario()
        {

        }

        public static NPropietario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NPropietario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarPropietario(EPropietario oPropietario)
        {
            return DPropietario.GetInstance().RegistrarPropietario(oPropietario);
        }

        public Respuesta<bool> ActualizarPropietario(EPropietario oPropietario)
        {
            return DPropietario.GetInstance().ActualizarPropietario(oPropietario);
        }

        public Respuesta<List<EPropietario>> ObtenerPropietariosPorInmobi(int IdInmobi)
        {
            return DPropietario.GetInstance().ObtenerPropietariosPorInmobi(IdInmobi);
        }

        public Respuesta<List<EPropietario>> PropsyPropiedadesPorInmobi(int IdInmobi)
        {
            return DPropietario.GetInstance().PropsyPropiedadesPorInmobi(IdInmobi);
        }

        public Respuesta<EPropietario> PropietarioconPropiedadesId(int Idpropi)
        {
            return DPropietario.GetInstance().PropietarioconPropiedadesId(Idpropi);
        }

        public Respuesta<EPropietario> BuscarPropietarioCi(int IdInmobi, string NroCi)
        {
            return DPropietario.GetInstance().BuscarPropietarioCi(IdInmobi, NroCi);
        }
    }
}
