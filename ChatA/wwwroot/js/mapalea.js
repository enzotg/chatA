// map
//
let map;
let marcasMapa;
let setvflag = 1;

function posicion(ConnectionId, User, Lat, Lon, ) {

    this.Lat = Lat;
    this.Lon = Lon;
    this.User = User;
    this.ConnectionId = ConnectionId;
}

function MapaIniciar() {

    if (map == null)
        map = L.map('mapid',
            {
                zoom: 13
            }).fitWorld();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 17
    }).addTo(map);    
    map.setZoom(15);    
    //marcasMapa = L.layerGroup();
    setvflag = 1;
}
function MapaDetener() {
    if (map == undefined) return;

    map.remove();
    map = undefined;
}

function MapaSetViewMiUbic(lat, lon) {

    if (map == undefined) return;
    if (lat == undefined || lon == undefined) return;

    if (setvflag == 1) {
        map.setView([lat, lon]);
        setvflag = 0;
    }
}

function MapaPintar(puntos) {        

    if (map == undefined) return;

    puntos.forEach(element => {

        let noex = true;
        map.eachLayer(function (layer) {            
            if (layer._url == undefined)
                if (layer.options.title == element.user) {

                
                    if (layer._latlng.lat != element.lat || layer._latlng.lng != element.lon) {
                        map.removeLayer(layer);
                        noex = true;
                    }
                    else
                        noex = false;
                }
                    
        });

        if (noex) {

        
            let m = L.marker([element.lat, element.lon], {
                title: element.user            
            }).addTo(map);
            m.bindPopup(element.user, { autoPan: false, autoClose: false }).openPopup();
        }
        /*let c;
        if (element.user == 'Tu')
            c = L.circle([element.lat, element.lon], {
                color: 'blue',                
                fillOpacity: 0.5,
                stroke: false,                
                radius: 70
            }).addTo(map);*/

        
        
    });

}

