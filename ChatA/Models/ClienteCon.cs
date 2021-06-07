using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatA.Models
{
    public class ClienteCon
    {
        public string ConnectionId { get; set; }

        public string Nombre { get; set; }

        public string DireccionOrig { get; set; }

        public string DireccionDest { get; set; }

        public string Grupo { get; set; }

        public double UbicActLat { get; set; }

        public double UbicActLng { get; set; }

        public double Dif { get; set; }

        public DateTime FechaIngreso { get; set; }

        [MaxLength(450)]
        public string UserId { get; set; }
    }
}
