﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatA.Models
{
    public class Posicion
    {
        public string ConnectionId { get; set; }

        public double Lat { get; set; }

        public double Lon { get; set; }
     
        public string User { get; set; }
        
    }
}
