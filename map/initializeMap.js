import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';
import contentTypes from '../components/Sidebar/contentTypes.js'
import SurfSpotContentInput from "../components/Sidebar/SidebarContent/SurfSpotContent/SurfSpotContentInput.js"
import Marker from "./Marker.js"
import { API } from "@aws-amplify/api";
import { Auth} from 'aws-amplify';
import { getUser } from "../src/graphql/queries";
import { mod, coordinatesAreEqual } from "../functions/Math.js"
const mapContainerDivName = "my-map"

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'
const sourceName = 'surfspotsMarkers'
const layerId = 'surfspotsLayer'

//consists of Marker objects from ./Marker.js
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

//if doesn't exist, return -1.
//TODO may want to store the index of the marker I'm currently working with instead for speed.
function getMarkerIndex(coordinates) {
  for(let i = 0; i < markers.length; i++) {
    if(coordinatesAreEqual(markers[i].coordinates, coordinates)) {
      return i
    }
  }
  return -1
}
function removeMapMarker(coordinates) {
  //This ONLY removes from the UI component. Seperately, remove from the DB
  let markerIndex = getMarkerIndex(coordinates)
  if(markerIndex != -1) {
    //remove mapbox marker from map
    markers[markerIndex].mapBoxMarkerObj.remove();
    //remove Marker from array
    markers.splice(markerIndex, 1);
  }
  console.log(markers);
}
function clearMapMarkers() {
  for(let i = 0; i < markers.length; i ++) {
    markers[i].mapBoxMarkerObj.remove();
  }
  markers = []
}

//Update an existing marker if it exists, otherwise creates a new one
function updateMapMarker(coordinates, title, description) {
  let markerIndex = getMarkerIndex(coordinates)
  console.log("UPDATING MARKER " + markerIndex)
  if(markerIndex != -1) {
    markers[markerIndex].title = title
    markers[markerIndex].description = description
  }
  else {
    addMapMarker(coordinates)
    updateMapMarker(coordinates, title, description)
  }
  console.log(markers)
}

function addMapMarker(coordinates) {
  //This ONLY adds to the UI. Seperately, add to the DB
  //ensure we don't add too markers directly on top of one another
  if(getMarkerIndex(coordinates) != -1) {
    return;
  }
  let newMapBoxMarker = new mapboxgl.Marker({color: "#e83e20", draggable: false})
                                      .setLngLat(coordinates)
                                      .addTo(map);
  let markerel = newMapBoxMarker.getElement()
  markerel.addEventListener('click', (e) => {
    let markerIndex = getMarkerIndex(coordinates)
    let surfSpotTitle = ""
    let surfSpotDesc = ""
    if(markerIndex != -1) {
      surfSpotTitle = markers[markerIndex].title
      surfSpotDesc = markers[markerIndex].description
    }
    let sideBarContent = new SurfSpotContentInput(surfSpotTitle,
                                              surfSpotDesc,
                                              (title, description) => updateMapMarker(coordinates, title, description),
                                              () => removeMapMarker(coordinates),
                                              coordinates.lng,
                                              coordinates.lat)
    setSideBar(sideBarContent, true);
    map.easeTo({center: coordinates});

    //prevent the click event from firing anywhere else
    e.stopPropagation();
  })
  markers.push(new Marker(coordinates, newMapBoxMarker));
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
    updateMapMarker={(title, description) => updateMapMarker(coordinates, title, description)}
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
                 .setLngLat(new mapboxgl.LngLat(coordinates.lng, coordinates.lat))
                 .setDOMContent(placeholder)
                 .addTo(map);
}
function setOnMapClick(isLoggedIn) {
  map.on("click", (e) => {
    var coordinates = e.lngLat;
    closePopup();
    openPopup(isLoggedIn, coordinates);
    map.easeTo({center: coordinates});
  });
}
const fillAllMarkersFromCloud = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    try {
      const response = await API.graphql({
        query: getUser,
        variables: { id: currentUser.attributes.sub },
      });
      if(response.data.getUser) {
        let existingSurfSpots = response.data.getUser.surfspots
        for(let i = 0; i < existingSurfSpots.length; i++) {
          updateMapMarker({lng: existingSurfSpots[i].long, lat: existingSurfSpots[i].lat}, existingSurfSpots[i].name, existingSurfSpots[i].description)
        }
      }
    }
    catch(e) {
      console.log(e)
    }
}

function pointHasWater(screenX, screenY) {
  var features = map.queryRenderedFeatures([screenX, screenY]);

  // Limit the number of properties we're displaying for
  // legibility and performance
  var displayProperties = [
    'sourceLayer',
  ];
  let isWater = false;
  var displayFeatures = features.map(function (feat) {
    var displayFeat = {};
    displayProperties.forEach(function (prop) {
      displayFeat[prop] = feat[prop];
      if(displayFeat[prop] == "water") {
        isWater = true;
      }
    });
    return displayFeat;
  });
  return isWater;
}
//return -1 if below, 1 if above, 0 if on line
//or if line is vertical, -1 for left, 1 for right
function pointIsWhereToLine(lineX, lineY, lineSlopeRise, lineSlopeRun, x, y){
  //if line has this x, what would its y on the line be?
  //y - lineY = (lineSlopeRise/lineSlopeRun) * (x - lineX)
  //y = (lineSlopeRise/lineSlopeRun) * (x - lineX) + lineY
  //x = (y - lineY) / (lineSlopeRise/lineSlopeRun) + lineX
  if(lineSlopeRun == 0) {
    let xOnLine = (y - lineY) / (lineSlopeRise/lineSlopeRun) + lineX
    if(x > xOnLine)
      return 1
    else if(x < xOnLine)
      return -1
    return 0
  }
  let yOnLine = (lineSlopeRise/lineSlopeRun) * (x - lineX) + lineY
  console.log("y on line " + yOnLine)
  console.log("slope: " + (lineSlopeRise/lineSlopeRun))
  console.log("y: " + y)
  console.log("x: " + x)
  if(y < yOnLine)
    return 1
  else if(y > yOnLine)
    return -1
  return 0
}
function getBeachAngle(e) {
  //circle equation:
  //(x - a)^2 + (y - b)^2 = r^2
  let xOfBeach = e.point.x
  let yOfBeach = e.point.y
  let mapBearing = map.getBearing(); //use to correct angle after equation
  console.log("Map Bearing: " + map.getBearing())

  let r = 100 //just an arbitrary value, should fit within most screens

  //pick 12 points around circle
  //x = sqrt(r^2 - (y - b)^2) + a
  //y = sqrt(r^2 - (x - a)^2) + b
  console.log("beach X: " + xOfBeach)
  console.log("beach y: " + yOfBeach)
  let points = [] //0.707
  points.push({"x": xOfBeach + r, "y": yOfBeach});
  points.push({"x": xOfBeach + (r * 0.707), "y": yOfBeach + (r * 0.707)});
  points.push({"x": xOfBeach, "y": yOfBeach + r});
  points.push({"x": xOfBeach - (r * 0.707), "y": yOfBeach + (r * 0.707)});
  points.push({"x": xOfBeach - r, "y": yOfBeach});
  points.push({"x": xOfBeach - (r * 0.707), "y": yOfBeach - (r * 0.707)});
  points.push({"x": xOfBeach, "y": yOfBeach - r});
  points.push({"x": xOfBeach + (r * 0.707), "y": yOfBeach - (r * 0.707)});

  //find barrier between points in water and points on land, if it exists
  let barrierPoints = []
  let prevSection = null;
  let valFirstSection = null;
  let currentQuadrant = 1;
  let waterDirection = "none";
  for(let i = 0; i < points.length; i++) {
    console.log("i vale: " + i)
    let curPointHasWater = pointHasWater(points[i].x, points[i].y);
    if(prevSection != curPointHasWater && curPointHasWater != null) {
      if(prevSection != null) {
          barrierPoints.push(i)
          console.log("barrier point: " + points[i].x + " " + points[i].y)
      }
      if(prevSection == null) {
        valFirstSection = curPointHasWater;
      }
      prevSection = curPointHasWater
    }
  }
  //check if the last point is a barrier point, circle needs to wrap around
  if(prevSection != valFirstSection) {
    console.log("settings wrap arround: " + (points.length - 1));
    barrierPoints.push(points.length - 1);
  }

  let numSections = barrierPoints.length;
  if(numSections == 1) {
    let sectionIsWater = prevSection
    if(sectionIsWater)
      console.log("Location is too far out to sea")
    else {
      console.log("Location is too far inland")
    }
  }
  else if(numSections > 2) {
    console.log("could not clearly read coast")
  }
  else if(numSections == 0) {
    console.log("no points identified")
  }
  else {
    //find direction of water
    let referencePoint = -1;
    if(barrierPoints[0] == barrierPoints[1] + 1)
      referencePoint = (barrierPoints[0] + 1) % points.length
    else if(barrierPoints[1] == barrierPoints[0] + 1)
      referencePoint = (barrierPoints[1] + 1) % points.length
    else
      referencePoint = Math.floor((barrierPoints[0] + barrierPoints[1]) / 2);

    console.log(numSections);
    console.log(barrierPoints[0]);
    console.log(barrierPoints[1]);
    let beachSlope = -1 * (points[barrierPoints[0]].y - points[barrierPoints[1]].y) / (points[barrierPoints[0]].x - points[barrierPoints[1]].x)
    console.log("beach slope: " + beachSlope)

    console.log(referencePoint +  " is reference")
    let belowIsWater = pointIsWhereToLine(points[barrierPoints[0]].x, points[barrierPoints[0]].y,
                                          points[barrierPoints[0]].y - points[barrierPoints[1]].y,
                                          points[barrierPoints[0]].x - points[barrierPoints[1]].x,
                                          points[referencePoint].x,
                                          points[referencePoint].y)

    if(!pointHasWater(points[referencePoint].x, points[referencePoint].y))
      console.log("reference is to land")
      belowIsWater = !belowIsWater

    console.log("below is water: " + belowIsWater)
  }
}

function initializeMap(containerName, mapStyle, isLoggedIn, setSideBarInput, setFullScreenDialogInput) {
  //TODO: let initalizeMap.js accept from main a function that will read from the database all surfspots, and populate 'markers' array
  if(isLoggedIn) {
    fillAllMarkersFromCloud();
  }

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
  mapContainerDivName,
  clearMapMarkers,
  fillAllMarkersFromCloud,
}