maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: camp.geometry.coordinates, // starting position [lng, lat]
  zoom: 14 // starting zoom
});

const marker = new maptilersdk.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(new maptilersdk.Popup({ closeOnClick: false }).setHTML(
    '<h1>Hello World!</h1>'
    ))
  .addTo(map);