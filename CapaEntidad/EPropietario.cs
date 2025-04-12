using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EPropietario
    {
        public int IdPropietario { get; set; }
        public int IdRol { get; set; }
        public string NroCI { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Celular { get; set; }
        public string Direccion { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public int IdInmobiliaria { get; set; }
        public List<EPropiedad> ListaPropiedades { get; set; }
        public int NumeroPropiedades => ListaPropiedades == null ? 0 : ListaPropiedades.Count;
        public string FullNameProp => $"{Nombres} {Apellidos}";
    }
}
