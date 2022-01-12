using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ChatA.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(50)]
        public string ApellidoyNombre {get;set;}

        [MaxLength(50)]
        public string NickName { get; set; }

        public byte TipoId { get; set; }
    }
}
