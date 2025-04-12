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


    }
}
