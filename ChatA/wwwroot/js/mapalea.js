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

function MapaSetViewMiUbic(lat, lon) {

    if (map == undefined) return;

    if (setvflag == 1) {
        map.setView([lat, lon]);
        setvflag = 0;
    }
}

function MapaPintar(puntos) {        

    if (map == undefined) return;

    /*if (map.hasLayer(marcasMapa)) {
        map.removeLayer(marcasMapa);
        marcasMapa = L.layerGroup();
    }
    */
    //console.log("puntos, " + puntos.length);

    
    /*let c;
    let arrc = [];
    puntos.forEach(element => {
                
        c = L.marker([element.lat, element.lon], {
            title: element.user
        });        
        
        marcasMapa.addLayer(c);               
        arrc.push(c);
    });    

    map.addLayer(marcasMapa);    
    */
    //c.bindPopup('xa', { autoPan: false}).openPopup();

    
    map.eachLayer(function (layer) {
        //if (layer.options.title != undefined && layer.options.title != "")
        if (layer._leaflet_id != 26)
            map.removeLayer(layer);
    });
    puntos.forEach(element => {
        let n = Math.random() / 100;
        n = 0;

        let m = L.marker([element.lat + n, element.lon + n], {
            title: element.user            
        }).addTo(map);

        let c;
        if (element.user == 'Tu')
            c = L.circle([element.lat, element.lon], {
                color: 'blue',                
                fillOpacity: 0.5,
                stroke: false,                
                radius: 70
            }).addTo(map);                        

        m.bindPopup(element.user, { autoPan: false, autoClose: false }).openPopup();
        //m.bindTooltip(element.user, { autoPan: false, autoClose: false }).openPopup();
    });


    /*L.marker([-26, -65]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();*/

    //----------------------------------
    //map.eachLayer(function (layer) {
//        console.log(layer.options.title)    });

}

