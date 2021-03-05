import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';
import contentTypes from '../components/Sidebar/contentTypes.js'

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'


let markers = []
let setSideBar = () => console.error("initializeMap.js: setSideBar() uninitialized")
let setFullScreenDialog = () => console.error("initializeMap.js: setFullScreenDialog() uninitialized")
let map = null

//variables for the click menu DOM content
let placeholder = null
let onClickPopup = null

function changeMapStyle(mapStyle) {
  map.setStyle(mapStyle);
}

function removeMapMarker(coordinates) {
  //This ONLY removes from the UI component. Seperately, remove from the DB
  for(let i = 0; i < markers.length; i++) {
    let markerCoordinates = markers[i].getLngLat();
    if(markerCoordinates.lat == coordinates.lat && markerCoordinates.lng == coordinates.lng) {
      markers[i].remove();
      markers.splice(i, 1);
      break;
    }
  }
  console.log(markers);
}

function addMapMarker(coordinates) {
  //This ONLY adds to the UI. Seperately, add to the DB

  //ensure we don't add too markers directly on top of one another
  for(let i = 0; i < markers.length; i++) {
    let markerCoordinates = markers[i].getLngLat();
    if(markerCoordinates.lat == coordinates.lat && markerCoordinates.lng == coordinates.lng) {
      return;
    }
  }
  let newMarker = new mapboxgl.Marker({color: "#e83e20", draggable: false})
                                      .setLngLat(coordinates)
                                      .addTo(map);
  markers.push(newMarker);
  console.log(markers);
}
function updateMapOnLogInChange(isLoggedIn) {
  setOnMapClick(isLoggedIn);
}

function renderClickMenuPlaceHolder(isLoggedIn, coordinates) {
  //add the placeholder DOM that displays the menu box appearing onClick
  if(placeholder == null) {
    placeholder = document.createElement("div");
  }

  ReactDOM.render(<ClickMenu
    isLoggedIn={isLoggedIn}
    addMapMarker={() => addMapMarker(coordinates)}
    removeMapMarker={() => removeMapMarker(coordinates)}
    setFullScreenDialog={(contentType, isActive) => setFullScreenDialog(contentType, isActive)}
    setSideBar={(content, isActive) => setSideBar(content, isActive)}/>,
    placeholder);
}
function setOnMapClick(isLoggedIn) {
  console.log("Initializing setmapClick with " + isLoggedIn)
  map.on("click", (e) => {
    var coordinates = e.lngLat;
    map.easeTo({center: coordinates});
    renderClickMenuPlaceHolder(isLoggedIn, coordinates);
    if(onClickPopup != null) {
      onClickPopup.remove();
    }
    onClickPopup = new mapboxgl.Popup()
                     .setLngLat(coordinates)
                     .setDOMContent(placeholder)
                     .addTo(map);
  });
}

function initializeMap(containerName, mapStyle, isLoggedIn, setSideBarInput, setFullScreenDialogInput) {
  //TODO: let initalizeMap.js accept from main a function that will read from the database all surfspots, and populate 'markers' array

  //save these function and objects in this class so I can use them for later
  setSideBar = setSideBarInput
  setFullScreenDialog = setFullScreenDialogInput
  map = new mapboxgl.Map({
    container: containerName,
    style: mapStyle,
    center: [-77.02, 38.887],
    zoom: 1,
  });

  //initialize style
  map.setStyle(mapStyle);
  map.touchPitch.disable();
  map.keyboard.disable();

  //set the map click event
  setOnMapClick(isLoggedIn);

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
  initializeMap,
  updateMapOnLogInChange
}