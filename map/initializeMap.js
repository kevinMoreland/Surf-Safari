import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';
import contentTypes from '../components/Sidebar/contentTypes.js'

let markers = []
function changeMapStyle(map, mapStyle) {
  map.setStyle(mapStyle);
}
function addPopup(map, el, coordinates) {
    const placeholder = document.createElement('div');
    ReactDOM.render(el, placeholder);

    new MapboxGl.Popup()
      .setDOMContent(placeholder)
      .setLngLat(coordinates)
      .addTo(map);
}
function initializeMap(mapboxgl, map, mapStyle, setSideBar, setFullScreenDialog) {
  //initialize style
  map.setStyle(mapStyle);
  map.touchPitch.disable();
  map.keyboard.disable();

  map.on("click", function(e) {
    var coordinates = e.lngLat;
    let placeholder = document.createElement("div");
    ReactDOM.render(<ClickMenu
      addMapMarker={() =>
        {new mapboxgl.Marker({
                          color: "#FFFFFF",
                          draggable: false}).setLngLat(coordinates).addTo(map);}}
      setFullScreenDialog={(contentType, isActive) => setFullScreenDialog(contentType, isActive)}
      setSideBar={(title, description, contentType, isActive) => setSideBar(title, description, contentType, isActive)}/>,
      placeholder);
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setDOMContent(placeholder)
      .addTo(map);
  });
  map.on("mouseenter", "data", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "data", function () {
    map.getCanvas().style.cursor = "";
  });

  //Add controllers
  //location search control
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
     }),
     'top-left'
   );
  //current location control
  map.addControl(
   new mapboxgl.GeolocateControl({
     positionOptions: {
       enableHighAccuracy: true,
     },
     trackUserLocation: true,
   }),
   'top-left'
  );
  //zoom and rotation controls
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
}

module.exports = {
  changeMapStyle,
  initializeMap
}