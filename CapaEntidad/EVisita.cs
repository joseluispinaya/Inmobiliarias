using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EVisita
    {
        public int IdVisita { get; set; }
        public string Codigo { get; set; }
        public int IdInmobiliaria { get; set; }
        public int IdPropiedad { get; set; }
        public int IdInquilino { get; set; }
        public string FechaVisita { get; set; }
        public DateTime VFechaVisita { get; set; }
        public string HoraVisita { get; set; }
        public string Direccion { get; set; }
        public string Estado { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public string Color => Estado == "Confirmado"
            ? "#0061a9"
            : "#ff2301";
    }
}
