using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatA.Data;
using ChatA.Models;
using ChatA.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ChatA.Controllers
{
    public class AccountController : Controller
    {
        private SignInManager<AppUser> _signInManager;
        private UserManager<AppUser> _userManager;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager )
        {
            _signInManager = signInManager;
            _userManager = userManager;

        }
        public IActionResult Login()
        {

            if (this.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, loginModel.RememberMe, false);
                if (result.Succeeded)
                {
                    //var u = HttpContext.User;

                    return RedirectToAction("Index", "Home");
                }
            }
            ModelState.AddModelError("","Login fallido");
            return View();
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                AppUser user = new AppUser
                {
                    ApellidoyNombre = registerViewModel.ApellidoyNombre,
                    NickName = registerViewModel.Nickname,
                    TipoId = 1,
                    Email = registerViewModel.Email,
                    UserName = registerViewModel.UserName
                };

                var result = await _userManager.CreateAsync(user, registerViewModel.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("Login", "Account");
                }
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View();
        }

    }
}