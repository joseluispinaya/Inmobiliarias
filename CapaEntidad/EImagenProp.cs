using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EImagenProp
    {
        public int IdImagen { get; set; }
        public int IdPropiedad { get; set; }
        public string UrlImagen { get; set; }
        public bool Estado { get; set; }
    }
}
