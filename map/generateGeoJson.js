function generateGeoJson(name, markers) {
  return '{\"type\": \"geojson\", \"data\": ' + generateGeoJsonData(name,markers) + '}'
}

function generateGeoJsonData(name, markers) {
  let features = "[";
  for(let i = 0; i < markers.length; i ++) {
    features += (generateFeature(markers[i]));
    if(i < markers.length - 1) {
      features += ","
    }
  }
  features += "]"

  return '{\"type\": \"FeatureCollection\",\"features\": '+ features + '}'
}

//TODO: can I add my own properties??
function generateFeature(marker) {
  return JSON.stringify({
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [marker.lng, marker.lat]
    },
    'properties': {
      'title': 'I can set my own yee yee!!'
    }
    })
}

module.exports = {
  generateGeoJson,
  generateGeoJsonData
}

