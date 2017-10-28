var map = L.map('map', {
  center: [55.751244, 37.618423],
  zoom: 13,
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiaW5zYXRpYWJsZS1taW5kIiwiYSI6ImNqOWIwaWdrNjFjdDIzM24ya21qbGJuMzQifQ.EIK16areNxtGW7AyBTug6A',
}).addTo(map);

map.locate({
  setView: true,
});


export default map;