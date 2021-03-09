import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';
import contentTypes from '../components/Sidebar/contentTypes.js'
import { generateGeoJson, generateGeoJsonData } from './generateGeoJson.js'
import Marker from './Marker.js'
const mapContainerDivName = "my-map"

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'
const sourceName = 'surfspotsMarkers'
const layerId = 'surfspotsLayer'

let markers = []
let setSideBar = () => console.error("initializeMap.js: setSideBar() uninitialized")
let setFullScreenDialog = () => console.error("initializeMap.js: setFullScreenDialog() uninitialized")
let map = null

//Used for when map style reloads, and I want to preserve my surf spot markers
let layerTemp = null
let sourceTemp = null
const markerIconPath = "/markerIcon.png"

//variables for the click menu DOM content
let placeholder = null
let onClickPopup = null

function changeMapStyle(mapStyle) {
  layerTemp = map.getLayer(layerId).serialize()
  sourceTemp = map.getSource(sourceName).serialize()
  map.setStyle(mapStyle);
  //Now that style is updated, my 'idle' listener will trigger and ensure my layer and source are
  //preserved using the values in layerTemp and sourceTemp
}

function removeMapMarker(coordinates) {
  //This ONLY removes from the UI component. Seperately, remove from the DB
  for(let i = 0; i < markers.length; i++) {
    if(markers[i].lat == coordinates.lat && markers[i].lng == coordinates.lng) {
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
    if(markers[i].lat == coordinates.lat && markers[i].lng == coordinates.lng) {
      return;
    }
  }
  let newMarker = new Marker(coordinates.lng, coordinates.lat, "", "")
  markers.push(newMarker);
  map.getSource(sourceName).setData(JSON.parse(generateGeoJsonData(sourceName, markers)))
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

  map.on('load', function () {
    console.log(generateGeoJson(sourceName, markers))
    map.loadImage(
      markerIconPath,
      function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          map.addSource(sourceName, JSON.parse(generateGeoJson(sourceName, markers)))
          map.addLayer({
            'id': layerId,
            'type': 'symbol',
            'source': sourceName,
            'layout': {
              'icon-image': 'custom-marker',
              'icon-size': 0.15,
              'icon-allow-overlap': true
            }
          });
      }
    );
  })
  map.on('idle', function(e) {
    if(layerTemp != null && sourceTemp != null) {
      map.loadImage(
            markerIconPath,
            function (error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addSource(sourceName, sourceTemp)
                map.addLayer(layerTemp)
                //setting these to null prevents this from happening any time other than right after style change
                sourceTemp = null
                layerTemp = null
      })
    }
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
  initializeMap,
  updateMapOnLogInChange,
  mapContainerDivName
}