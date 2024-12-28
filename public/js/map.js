const coordinates = [Number(lat),Number(lon)];

let airbnbicon=L.icon({
    iconUrl:"/js/circle.png",
    iconSize:     [38, 38], // size of the icon
    popupAnchor:  [0, -15]
})

var map = L.map('map').setView(coordinates,12);

var marker = L.marker(coordinates,{alt:location1,icon:airbnbicon}).addTo(map).bindPopup(location1);

var circle = L.circle(coordinates, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 1400,
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);