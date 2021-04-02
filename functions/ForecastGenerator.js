var https = require('https');
const haversine = require('haversine')

function getHTTPRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      var { statusCode } = res;
      let rawBody = "";
      let error;

      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
      }

      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        rawBody += chunk;
      });

      res.on('end', () => {
        try {
          response = rawBody;
          resolve(response);
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', (e) => {
      reject(`Got error: ${e.message}`);
    })
  });
}

function getDistanceBetweenCoords(coord1, coord2) {
  const start = {
    latitude: coord1.lat,
    longitude: coord1.lng
  }

  const end = {
    latitude: coord2.lat,
    longitude: coord2.lng
  }
  dist = haversine(start, end, {unit: 'meter'})
  return dist
}

function getNearestBuoy(latitude, longitude) {
  let activeStationsPromise = getHTTPRaw("https://www.ndbc.noaa.gov/activestations.xml");
  var parseString = require('xml2js').parseString;
  let ndbcFileDirPromise = getHTTPRaw("https://www.ndbc.noaa.gov/data/realtime2/");

  let myCoordinates = {lat: latitude, lng: longitude}

  return new Promise(function(resolve, reject) {
    activeStationsPromise.then((res) => {
      parseString(res,
        function (err, result) {
          let count = result['stations']['$']['count']
          let min = -1;
          let closestStation = -1;
          for(let i = 0; i < count; i++) {
            let currStation = result['stations']['station'][i]
            let stationId = currStation['$']['id']
            ndbcFileDirPromise.then((res) => {
              currStationCoords = {lat: currStation['$']['lat'], lng: currStation['$']['lon']}
              distance = getDistanceBetweenCoords(myCoordinates, currStationCoords)
              if(min == -1 || distance < min) {
                min = distance
                closestStation = stationId;
              }
              if(i == count - 1) {
                resolve(closestStation);
              }
            }).catch((error) => reject("Error checking if station has spec data."))
          }

        });
    }).catch((error) => reject("Error retrieving active stations."))
  });
}
//Example using the promise:
//getNearestBuoy().then((res) => console.log("nearest buoy station: " + res)).catch(error => console.log("Error: " + error));

function generateForecast() {
 getNearestBuoy().then((res) => console.log("nearest buoy station: " + res)).catch(error => console.log("Error: " + error));
}
module.exports = {
  generateForecast,
  getNearestBuoy
}