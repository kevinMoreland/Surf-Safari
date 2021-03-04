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

function removeMapMarker(coordinates) {
  //This ONLY removes from the UI component. Seperately, remove from the DB
  for(let i = 0; i < len(markers); i++) {
    markerCoordinates = markers[i].getLngLat();
    if(markerCoordinates.lat == coordinates.lat && markerCoordinates.lng == coordinates.lng) {
      markers[i].remove();
      markers.splice(i, 1);
      break;
    }
  }
}
function addMapMarker(coordinates, map) {
  //This ONLY adds to the UI. Seperately, add to the DB
  let newMarker = new mapboxgl.Marker({color: "#FFFFFF", draggable: false})
                                      .setLngLat(coordinates)
                                      .addTo(map);
  markers.push(newMarker);
}

function initializeMap(mapboxgl, map, mapStyle, setSideBar, setFullScreenDialog) {
  //TODO: let initalizeMap.js accept from main a function that will read from the database all surfspots, and populate 'markers' array

  //initialize style
  map.setStyle(mapStyle);
  map.touchPitch.disable();
  map.keyboard.disable();

  map.on("click", function(e) {
    var coordinates = e.lngLat;
    let placeholder = document.createElement("div");
    ReactDOM.render(<ClickMenu
      setSideBar={(content, isActive) => setSideBar(content, isActive)}/>,
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