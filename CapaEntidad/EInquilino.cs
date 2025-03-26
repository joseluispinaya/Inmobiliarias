using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EInquilino
    {
        public int IdInquilino { get; set; }
        public int IdRol { get; set; }
        public string NroCI { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Celular { get; set; }
        public string Direccion { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public string FullNameInq => $"{Nombres} {Apellidos}";
    }
}
