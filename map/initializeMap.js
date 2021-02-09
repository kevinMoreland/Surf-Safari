import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function changeMapStyle(map, mapStyle) {
  map.setStyle(mapStyle);
}

function initializeMap(mapboxgl, map, mapStyle) {
  //initialize style
  map.setStyle(mapStyle);

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
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML("magnitude: " + mag + "<br>Was there a tsunami?: " + tsunami)
      .addTo(map);
  });
  map.on("click", function(e) {
    var coordinates = e.lngLat;
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML("<button>ThisIsTest1</button><br><button>ThisIsTest2</button>")
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