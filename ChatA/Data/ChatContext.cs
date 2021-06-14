using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatA.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatA.Data
{
    public class ChatContext:IdentityDbContext<AppUser>
    {
        public ChatContext(DbContextOptions<ChatContext> options):base(options)
        {

        }

        public DbSet<AppUser> AppUser { get; set; }


    }
}
