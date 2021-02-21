import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom'
import ClickMenu from '../components/ClickMenu/ClickMenu.js';
import jsxToString from 'jsx-to-string';

let sideBarToggleFunction = null;
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
function initializeMap(mapboxgl, map, mapStyle, toggleSideBar) {
  //initialize style
  map.setStyle(mapStyle);
  sideBarToggleFunction = toggleSideBar;
  map.touchPitch.disable();
  map.keyboard.disable();
  //Add click events
  map.on("click", "data", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["data"],
    });
    var clusterId = features[0].properties.cluster_id;
    map
      .getSource("dcmusic.live")
      .getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });
  map.on("click", "unclustered-point", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var mag = e.features[0].properties.mag;
    var tsunami;
    if (e.features[0].properties.tsunami === 1) {
      tsunami = "yes";
    } else {
      tsunami = "no";
    }
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    addPopup(map, <ClickMenu />, coordinates);
//    new mapboxgl.Popup()
//      .setLngLat(coordinates)
//      .setHTML("magnitude: " + mag + "<br>Was there a tsunami?: " + tsunami)
//      .addTo(map);
  });
  map.on("click", function(e) {
    var coordinates = e.lngLat;
    let placeholder = document.createElement("div");
    ReactDOM.render(<ClickMenu toggleSideBar={sideBarToggleFunction}/>, placeholder);
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
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
     })
   );
  map.addControl(
   new mapboxgl.GeolocateControl({
     positionOptions: {
       enableHighAccuracy: true,
     },
     trackUserLocation: true,
   })
  );
}

module.exports = {
  changeMapStyle,
  initializeMap
}