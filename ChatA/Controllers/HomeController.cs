﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChatA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace ChatA.Controllers
{
    
    public class HomeController : Controller
    {
        public override OkResult Ok()
        {
            return base.Ok();
        }
        public override ChallengeResult Challenge(AuthenticationProperties properties)
        {
            return base.Challenge(properties);
        }
        public HomeController()
        {


        }
       
        public IActionResult Index()
        {

            if (this.User == null ||
                this.User.Identity.Name == null ||
                !this.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Login", "Account");
            }
            

            var isaut = this.User.Identity.IsAuthenticated;
            var user = this.User.Identity;


            return View();
        }

        
        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page." + this.User.Identity;

            return View();
        }
        [Authorize]
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
