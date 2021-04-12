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

function getStationForecast(stationId) {
  let stationSpecPromise = getHTTPRaw("https://www.ndbc.noaa.gov/data/realtime2/" + stationId + ".spec");
}

function getNearestBuoy(event) {
  let activeStationsPromise = getHTTPRaw("https://www.ndbc.noaa.gov/activestations.xml");
  var parseString = require('xml2js').parseString;
  let ndbcFileDirPromise = getHTTPRaw("https://www.ndbc.noaa.gov/data/realtime2/");

  let latitude = parseFloat(event.queryStringParameters.lat)
  let longitude = parseFloat(event.queryStringParameters.lng)

  let myCoordinates = {lat: latitude, lng: longitude}
  let response = {
        statusCode: 200,
        body: "",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "GET"
        },
      };
  return new Promise(function(resolve, reject) {
    activeStationsPromise.then((res) => {
      parseString(res,
        function (err, result) {
          let count = result['stations']['$']['count']
          let min = -1;
          let closestStation = -1;
          //loop through each buoy to find the closest one with .spec data
          for(let i = 0; i < count; i++) {
            let currStation = result['stations']['station'][i]
            let stationId = currStation['$']['id']
            //check if the buoy with id 'stationId' has .spec data
            ndbcFileDirPromise.then((res) => {
              currStationCoords = {lat: currStation['$']['lat'], lng: currStation['$']['lon']}
              distance = getDistanceBetweenCoords(myCoordinates, currStationCoords)

              /* check if this station in this iteration of the for loop has .spec data.
                 if it does, it is a potential closest buoy */
              if((min == -1 || distance < min) && res.includes(stationId + ".spec")) {
                min = distance
                closestStation = stationId;
              }
              if(i == count - 1) {
                response.body = JSON.stringify(closestStation + " at distance " + min + " meters");
                resolve(response);
              }
            }).catch((error) => reject("Error checking if station has spec data."))
          }

        });
    }).catch((error) => reject("Error retrieving active stations."))
  });
}
//Example using the promise:
//getNearestBuoy().then((res) => console.log("nearest buoy station: " + res)).catch(error => console.log("Error: " + error));

exports.handler = async (event) => {
  return getNearestBuoy(event);
};