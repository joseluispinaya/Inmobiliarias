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


    }
}
