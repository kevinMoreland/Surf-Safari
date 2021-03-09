import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';
import contentTypes from '../components/Sidebar/contentTypes.js'
import SurfSpotContentInput from "../components/Sidebar/SidebarContent/SurfSpotContent/SurfSpotContentInput.js"

const mapContainerDivName = "my-map"

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'
const sourceName = 'surfspotsMarkers'
const layerId = 'surfspotsLayer'

let markers = []
let setSideBar = () => console.error("initializeMap.js: setSideBar() uninitialized")
let setFullScreenDialog = () => console.error("initializeMap.js: setFullScreenDialog() uninitialized")
let map = null

//variables for the click menu DOM content
let placeholder = null
let onClickPopup = null

//Javascript does funny stuff like lets -4 % 5 = -4 instead of 1, which I want. This function fixes that
function mod(n, m) {
  return ((n % m) + m) % m;
}
function coordinatesAreEqual(coord1, coord2) {
  let threshold = 0.0000000001
  let coord1Lat = mod(coord1.lat, 360)
  let coord2Lat = mod(coord2.lat, 360)
  let coord1Lng = mod(coord1.lng, 360)
  let coord2Lng = mod(coord2.lng, 360)
  if((coord1Lat >= coord2Lat - threshold && coord1Lat <= coord2Lat + threshold) &&
     (coord1Lng >= coord2Lng - threshold && coord1Lng <= coord2Lng + threshold)) {
    return true
  }
  return false
}

function changeMapStyle(mapStyle) {
  map.setStyle(mapStyle);
}

function removeMapMarker(coordinates) {
  //This ONLY removes from the UI component. Seperately, remove from the DB
  for(let i = 0; i < markers.length; i++) {
    if(coordinatesAreEqual(markers[i].getLngLat(), coordinates)) {
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
    if(coordinatesAreEqual(markers[i].getLngLat(), coordinates)) {
      return;
    }
  }
  let newMarker = new mapboxgl.Marker({color: "#e83e20", draggable: false})
                                      .setLngLat(coordinates)
                                      .addTo(map);
  let markerel = newMarker.getElement()
      markerel.addEventListener('click', (e) => {
        setSideBar(new SurfSpotContentInput("Title!",
                                            "Description!",
                                            () => addMapMarker(coordinates),
                                            () => removeMapMarker(coordinates),
                                            () => alert("hello there user"),
                                            coordinates.lng,
                                            coordinates.lat), true);
        e.stopPropagation();
      })
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
    closePopup={closePopup}
    coordinates={coordinates}
    removeMapMarker={() => removeMapMarker(coordinates)}
    setFullScreenDialog={(contentType, isActive) => setFullScreenDialog(contentType, isActive)}
    setSideBar={(content, isActive) => setSideBar(content, isActive)}/>,
    placeholder);
}
function closePopup() {
  if(onClickPopup != null) {
    onClickPopup.remove();
  }
}
function openPopup(isLoggedIn, coordinates) {
  console.log(coordinates)
  renderClickMenuPlaceHolder(isLoggedIn, coordinates);
  onClickPopup = new mapboxgl.Popup()
                 .setLngLat(coordinates)
                 .setDOMContent(placeholder)
                 .addTo(map);
}
function setOnMapClick(isLoggedIn) {
  map.on("click", (e) => {
    var coordinates = e.lngLat;
    map.easeTo({center: coordinates});
    closePopup();
    openPopup(isLoggedIn, coordinates);
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
  updateMapOnLogInChange,
  mapContainerDivName
}