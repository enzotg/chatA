using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatA.ViewModels
{
    public class RegisterViewModel
    {
        [Display(Name = "User Name")]
        [Required(ErrorMessage = "Please enter your user name.")]
        public string UserName { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Please enter your password.")]
        public string Password { get; set; }

        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; }

        [Display(Name = "ApellidoyNombre")]
        [Required(ErrorMessage = "ApellidoyNombre")]
        public string ApellidoyNombre { get; set; }

        [Display(Name = "Apodo o nombre")]
        [Required(ErrorMessage = "Please enter your Nickname")]
        public string Nickname { get; set; }
                

        [Required(ErrorMessage = "Please enter your email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


    }
}
