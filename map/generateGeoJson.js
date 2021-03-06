function generateFeature(marker) {
  return JSON.stringify({
    'type': 'Feature',
    'properties': {
      'testProp': 'I can set my own yee yee!!'
    },
      'geometry': {
        'type': 'Point',
        'coordinates': "[" + marker.getLngLat().lat + ", " + marker.getLngLat().lng + "]"
      }
    })
}

function generateGeoJson(name, markers) {
//  let features = [];
//  for(let i = 0; i < markers.length; i ++) {
//    features.push(generateFeature(markers[i]));
//  }
//  return JSON.stringify({
//    'type': 'geojson',
//    'data': {'type': 'FeatureCollection',
//      'features': JSON.stringify(features)}})
  return JSON.stringify({
                        'type': 'geojson',
                        'data': {
                        'type': 'FeatureCollection',
                        'features': [
                        {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Point',
                        'coordinates': [
                        -77.03238901390978,
                        38.913188059745586
                        ]
                        },
                        'properties': {
                        'title': 'Mapbox DC'
                        }
                        },
                        {
                        // feature for Mapbox SF
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Point',
                        'coordinates': [-122.414, 37.776]
                        },
                        'properties': {
                        'title': 'Mapbox SF'
                        }
                        }
                        ]
                        }
                        })
}
function generateGeoJsonData(name, markers) {
  return JSON.stringify({
                                                'type': 'FeatureCollection',
                                                'features': [
                                                {
                                                // feature for Mapbox DC
                                                'type': 'Feature',
                                                'geometry': {
                                                'type': 'Point',
                                                'coordinates': [
                                                -77.03238901390978,
                                                38.913188059745586
                                                ]
                                                },
                                                'properties': {
                                                'title': 'Mapbox DC'
                                                }
                                                },
                                                {
                                                // feature for Mapbox SF
                                                'type': 'Feature',
                                                'geometry': {
                                                'type': 'Point',
                                                'coordinates': [-122.414, 37.776]
                                                },
                                                'properties': {
                                                'title': 'Mapbox SF'
                                                }
                                                }
                                                ]
                                                })
}
module.exports = {
  generateGeoJson,
  generateGeoJsonData
}

