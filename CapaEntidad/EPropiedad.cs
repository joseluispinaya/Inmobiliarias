using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EPropiedad
    {
        public int IdPropiedad { get; set; }
        public string Codigo { get; set; }
        public int ValorCodigo { get; set; }
        public string Direccion { get; set; }
        public float Precio { get; set; }
        public float Superficie { get; set; }
        public int IdInmobiliaria { get; set; }
        public int IdPropietario { get; set; }
        public int IdDistrito { get; set; }
        public int IdTipoPropi { get; set; }
        public string Comentario { get; set; }
        public string UrlTours { get; set; }
        public float Latitud { get; set; }
        public float Longitud { get; set; }
        public string Estado { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public List<EImagenProp> ListaImagenes { get; set; }
        public int NumeroImagenes => ListaImagenes == null ? 0 : ListaImagenes.Count;

        public string FirstImage
        {
            get
            {
                if (ListaImagenes == null || ListaImagenes.Count == 0)
                {
                    return $"/Imagenes/sinfotoo.png";
                }

                return ListaImagenes.FirstOrDefault().UrlImagen;
            }
        }
    }
}
