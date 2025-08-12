using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NInquilino
    {
        #region "PATRON SINGLETON"
        public static NInquilino _instancia = null;

        private NInquilino()
        {

        }

        public static NInquilino GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NInquilino();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<int> RegistrarInquiClien(EInquilino oInquili)
        {
            return DInquilino.GetInstance().RegistrarInquiClien(oInquili);
        }

        public Respuesta<EInquilino> BuscarClienteCI(string NroCi)
        {
            return DInquilino.GetInstance().BuscarClienteCI(NroCi);
        }

        public Respuesta<List<EInquilino>> ObtenerClientes()
        {
            return DInquilino.GetInstance().ObtenerClientes();
        }

        public Respuesta<bool> RegistrarVisita(EVisita visita)
        {
            return DInquilino.GetInstance().RegistrarVisita(visita);
        }

        public Respuesta<List<EVisita>> ObtenerVisitasPorInmobi(int IdInmobi)
        {
            return DInquilino.GetInstance().ObtenerVisitasPorInmobi(IdInmobi);
        }

        public Respuesta<bool> RegistrarAtencion(int idVisita, int idUsuario)
        {
            return DInquilino.GetInstance().RegistrarAtencion(idVisita, idUsuario);
        }

        public Respuesta<List<EAtencion>> AtencionesPorInmobi(int IdInmobi)
        {
            return DInquilino.GetInstance().AtencionesPorInmobi(IdInmobi);
        }

    }
}
