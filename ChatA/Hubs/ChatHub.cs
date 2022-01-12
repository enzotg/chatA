using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ChatA.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace ChatA.Hubs
{
    public class ChatHub:Hub
    {
        public static List<ClienteCon> _clientesCon = new List<ClienteCon>();

        public override Task OnConnectedAsync()
        {
            HttpContextAccessor h = new HttpContextAccessor();
            string userName = h.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            string userId = h.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var res = _clientesCon.FirstOrDefault(x => x.UserId == userId);
            if(res==null)
                _clientesCon.Add(new ClienteCon
                {
                    ConnectionId = Context.ConnectionId,
                    Nombre = userName ,
                    DireccionOrig = "",
                    DireccionDest = "",
                    Grupo = "",
                    UbicActLat = 0,
                    UbicActLng = 0,
                    Dif = 0,
                    FechaIngreso = DateTime.Now,
                    UserId = userId
                });
            else
            {
                res.ConnectionId = Context.ConnectionId;
            }

            return base.OnConnectedAsync();
        }
        public string GetUserName()
        {
            HttpContextAccessor h = new HttpContextAccessor();            
            return h.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
        public void watchReg(double UbicActLat, double UbicActLng, string User)
        {
            var cliente = _clientesCon.Where(x => x.ConnectionId == Context.ConnectionId).FirstOrDefault();

            if (cliente != null)
            {
                cliente.UbicActLat = UbicActLat;
                cliente.UbicActLng = UbicActLng;
                cliente.Nombre = User;
            }

        }
        public List<Posicion> GetPosiciones()
        {
            var res = _clientesCon
                .Select(y => new Posicion
                {
                    ConnectionId = y.ConnectionId,
                    Lat = y.UbicActLat,
                    Lon = y.UbicActLng,
                    User = y.Nombre 
                })
                .ToList();
            return res;
        }

        /*public override Task OnDisconnectedAsync(Exception exception)
        {
            var c = _clientesCon.Where(x => x.ConnectionId == Context.ConnectionId).FirstOrDefault();
            if (c != null)
            {
                _clientesCon.Remove(c);
                Clients.Client(c.ConnectionId).SendAsync("ReceiveMessage", c.Nombre, c.ConnectionId, "Desconectado ", "0");
            }

            return base.OnDisconnectedAsync(exception);
        }*/

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

    }
}
