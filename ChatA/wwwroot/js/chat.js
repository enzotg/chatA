"use strict";

let connection =
    new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        //.withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
        .withAutomaticReconnect([0, 3000])
        .configureLogging(signalR.LogLevel.Debug)
        .build();

let currentUser;
let loopGetPos;

connection.on("ReceiveMessage", function (user, message) {

    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    AgregarMensaje(user, connection.connectionId, msg, 1);
});

connection.onclose(function () {
    enviarLog("event-onclose");
    //start();
});

connection.onreconnecting(function () {
    enviarLog("event-onreconnecting");
});

connection.onreconnected(function () {
    enviarLog("event-onreconnted");
});

window.onload = onLoad;

window.onfocus = function () {
    estadoConn();    
}
window.onresize = function () {    
}

document.getElementById("btnA").addEventListener("click", start);
document.getElementById("btnB").addEventListener("click", stop);
document.getElementById("btnEnviar").addEventListener("click", send);
document.getElementById("txtTexto").addEventListener("focus", txtTextoFocus);
document.getElementById("txtTexto").addEventListener("keydown", keydown);
document.getElementById("btnM").addEventListener("click", btnMClick);


function onLoad() {

    document.getElementById("txtUsuario").value = 'user' + Math.round(Math.random() * 99);
    document.getElementById("btnEnviar").disabled = true;    

    start();
    toggle(0);
    estadoConn();
    setInterval(estadoConn, 5000);
}

function start() {

    connection.start().then(function () {

        document.getElementById("btnEnviar").disabled = false;
        currentUser = document.getElementById("txtUsuario").value;
        
        watcher();
        estadoConn();

        loopGetPos = setInterval(getPos, 5000);        

    }).catch(function (err) {

        enviarLog(err.toString());
        return console.error(err.toString());
    });
}
function stop() {
    connection.stop();
    enviarLog("stop");
}

function estadoConn() {
    document.getElementById("txtEstado").value = connection.connectionState;
}

function btnMClick(e) {
    toggle(0);
}

function txtTextoFocus() {    
    window.document.scrollingElement.scrollTop =
        window.document.scrollingElement.scrollHeight;
    toggle(1);    
}

function keydown(e) {
    if(e.key == 'Enter')
        send(e);
}

function getPos() {

    connection.invoke("GetPosiciones")
        .then(function (pos) {
            MapaPintar(pos);
        })
        .catch(function (err) {
            return console.error(err.toString());
        });
}

function send (event) {
    let user = document.getElementById("txtUsuario").value;
    let message = document.getElementById("txtTexto").value;
    
    connection.invoke("SendMessage", user, message).catch(function (err) {
        enviarLog(err.toString());
        return console.error(err.toString());
    });

    document.getElementById("listaMens").scrollTop =
        document.getElementById("listaMens").scrollHeight;

    window.scrollTop = window.scrollHeight;
    document.getElementById("txtTexto").value = '';

    event.preventDefault();
}

function enviarLog(e) {
    AgregarMensaje('', '', e, 1);
}

function AgregarMensaje(user, connectionId, mensajeTexto, ch) {

    let currentdate = new Date();
    let laHora = ((currentdate.getHours() < 10) ? "0" : "") + currentdate.getHours() + ":" + ((currentdate.getMinutes() < 10) ? "0" : "") + currentdate.getMinutes();
    //let nombre = user;
    //let textm = ' ' + Mensaje + ' ';
    //let textb = "Tomar";
    let ul = document.getElementById("listaMens");

    let li = document.createElement("li");
    let mensaje = document.createElement("div");
    let cabecera = document.createElement("div");
    let nombre = document.createElement("div");
    let btn = document.createElement("div");
    let elBtn = document.createElement("span");
    let hora = document.createElement("div");
    let texto = document.createElement("div");

    mensaje.className = "msg-mensaje";
    cabecera.className = "msg-cabecera";
    nombre.className = "msg-nombre";
    btn.className = "msg-btn";
    hora.className = "msg-hora";
    texto.className = "msg-texto";

    nombre.innerText = user;
    hora.innerText = laHora;
    elBtn.innerText = "Tomar";
    texto.innerText = mensajeTexto;

    elBtn.id = "btnSelecc";
    elBtn.name = connectionId;
    //elBtn.onclick = function () { SeleccionarCliente(connectionId); };

    if (ch == "1") {
        //li.className = "list-group-item list-group-item-primary";        
    }

    ul.appendChild(li);
    li.appendChild(mensaje);
    mensaje.appendChild(cabecera);
    cabecera.appendChild(nombre);
    cabecera.appendChild(btn);
    
    cabecera.appendChild(hora);
    mensaje.appendChild(texto);

    if (user == currentUser) {
        mensaje.classList.add("msg-mensaje-c");
    }
    else {
        btn.appendChild(elBtn);         
    }

    ul.scrollTop = ul.scrollHeight;
}

function toggle(e)
{

    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    vh -= 142;
    vh /= 2;
    //enviarLog('tog' + e + '.' + vh);
    if (e == 1) vh -= 100;

    if (e == 1 ||
        document.querySelector(".cont-lista-mens").style.maxHeight == vh + "px" ||
        document.querySelector(".cont-lista-mens").style.maxHeight == "") {
        /*flex: 1 0   200px;
        min - height: 200px;
        max - height: 200px;*/
        vh *= 2;
        document.querySelector(".cont-lista-mens").style.flex = "1 0 " + vh + "px";
        document.querySelector(".cont-lista-mens").style.minHeight = vh + "px";
        document.querySelector(".cont-lista-mens").style.maxHeight = vh + "px";

        vh = 0;
        document.querySelector(".cont-footer").style.flex = "0 0 " + vh + "px";
        document.querySelector(".cont-footer").style.minHeight = vh + "px";
        document.querySelector(".cont-footer").style.maxHeight = vh + "px";
        document.querySelector(".cont-footer").style.display = "none";

        //clearInterval(loopGetPos);
        MapaDetener();
    }
    else {
        document.querySelector(".cont-lista-mens").style.flex = "1 0 " + vh + "px";
        document.querySelector(".cont-lista-mens").style.minHeight = vh + "px";
        document.querySelector(".cont-lista-mens").style.maxHeight = vh + "px";

        document.querySelector(".cont-footer").style.flex = "0 0 " + vh + "px";
        document.querySelector(".cont-footer").style.minHeight = vh + "px";
        document.querySelector(".cont-footer").style.maxHeight = vh + "px";
        document.querySelector(".cont-footer").style.display = "block";
        //Mapa
        MapaIniciar();
    }
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

//----------------------------------------

let loopWatch;


function watcher() {
    var geoLocator = window.navigator.geolocation;
    var posOptions = { enableHighAccuracy: true, timeout: 60000 };

    setvflag = 1;
    
    loopWatch = geoLocator.watchPosition(successPositionWatch, errorPosition, posOptions);
}

function successPositionWatch(e) {

    //MapaSetView(e.coords.latitude, e.coords.longitude);


    //enviar datos de pos
    connection.invoke("watchReg", e.coords.latitude, e.coords.longitude, currentUser);
    console.log(e.coords.latitude, e.coords.longitude);

}
function errorPosition(e) {

}
function FinIntervalo() {
    navigator.geolocation.clearWatch(loopWatch);
}
