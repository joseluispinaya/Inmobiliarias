using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EAtencion
    {
        public int IdAtencion { get; set; }
        public int IdVisita { get; set; }
        public string FechaAtencion { get; set; }
        public string Codigo { get; set; }
        public int IdPropiedad { get; set; }
        public int IdInquilino { get; set; }
        public string FechaVisita { get; set; }
        public string HoraVisita { get; set; }
        public string Estado { get; set; }
        public bool Activo { get; set; }
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string FechaSoli => $"{FechaVisita} a las: {HoraVisita}";
    }
}
