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
    marcasMapa = L.layerGroup();
}
function MapaDetener() {
    if (map == undefined) return;

    map.remove();
    map = undefined;
}
function MapaSetView(lat, lon) {

    if (setvflag == 1) {
        map.setView([lat, lon]);
        setvflag = 0;
    }

    
    //map.locate({ setView: true, maxZoom: 16 });
}

function MapaPintar(puntos) {        

    if (map == undefined) return;

    if (map.hasLayer(marcasMapa)) {
        map.removeLayer(marcasMapa);
        marcasMapa = L.layerGroup();
    }

    if (puntos.length > 0)
        MapaSetView(puntos[0].lat, puntos[0].lon);
    
    let c;
    let arrc = [];
    puntos.forEach(element => {
                
        c = L.marker([element.lat, element.lon], {
            title: element.user
        });
        
//        let c = L.popup()
//            .setLatLng([element.lat, element.lon])
//            .setContent("I am a standalone popup." + element.user);
            
        //circs.push(c);        
        
        marcasMapa.addLayer(c);               
        arrc.push(c);
    });    

    map.addLayer(marcasMapa);    
    //c.bindPopup('xa', { autoPan: false}).openPopup();
    arrc.forEach(function (value) {
        value.bindPopup(value.options.title, { autoPan: false }).openPopup();
    });

    /*L.marker([-26, -65]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();*/

    //----------------------------------
    //map.eachLayer(function (layer) {
//        console.log(layer.options.title)    });

}

