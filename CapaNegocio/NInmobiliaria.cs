using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NInmobiliaria
    {
        #region "PATRON SINGLETON"
        public static NInmobiliaria _instancia = null;

        private NInmobiliaria()
        {

        }

        public static NInmobiliaria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NInmobiliaria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarInmo(EInmobiliaria oInmobiliaria)
        {
            return DInmobiliaria.GetInstance().RegistrarInmo(oInmobiliaria);
        }

        public Respuesta<List<EInmobiliaria>> ObtenerInmobiliarias()
        {
            return DInmobiliaria.GetInstance().ObtenerInmobiliarias();
        }
    }
}
