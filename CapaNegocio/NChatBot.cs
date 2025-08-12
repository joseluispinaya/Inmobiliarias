using CapaDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;


namespace CapaNegocio
{
    public class NChatBot
    {
        #region "PATRON SINGLETON"
        public static NChatBot conexion = null;

        public NChatBot() { }

        public static NChatBot GetInstance()
        {
            if (conexion == null)
            {
                conexion = new NChatBot();
            }
            return conexion;
        }
        #endregion

        public Respuesta<List<TablasEsquema>> EsquemaDatos()
        {
            return DChatBot.GetInstance().EsquemaDatos();
        }

        public Dictionary<string, DataTable> ObtenerEsquemaBD()
        {
            return DChatBot.GetInstance().ObtenerEsquemaBD();
        }

        public Respuesta<List<TablasEsquema>> ObtenerEsquemaBDNuevo()
        {
            return DChatBot.GetInstance().ObtenerEsquemaBDNuevo();
        }

        public Respuesta<DataTable> EjecutarConsultaLibre(string consultaSql)
        {
            return DChatBot.GetInstance().EjecutarConsultaLibre(consultaSql);
        }
    }
}
