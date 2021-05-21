//https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt
var https = require('https');
class stationData {
  constructor(id, lat, lon, year, month, day, hour, minute, waveHeight, period, waveDir) {
    this.stationId = id;
    this.lat = lat;
    this.lon = lon;
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.waveHeight = waveHeight;
    this.period = period;
    this.waveDir = waveDir;
  }
}
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

function getStationJSONData() {
  let latestObsData = getHTTPRaw("https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt");
  return new Promise(function(resolve, reject) { 
    latestObsData.then((res) => {
      let allStationData = [];
      let lineNum = 0;
      let prevWasSpace = false;
      let colPos = 0;
      let colValues = [];
      let currColVal = "";
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
      for(let i = 0; i < res.length; i ++) {
        if(lineNum > 1) {
          if((res[i] == ' ' && !prevWasSpace) || res[i] == '\n') {
            colValues.push(currColVal);              
            currColVal = "";
            colPos += 1;
            prevWasSpace = true;
          }
          else if(res[i] != ' '){
            currColVal += res[i];
            prevWasSpace = false;
          }
        }
        if(res[i] == '\n') {

          if(colValues[11] != "MM" && lineNum > 1) {          
            allStationData.push(new stationData(colValues[0], colValues[1], colValues[2], 
                                                colValues[3], colValues[4], colValues[5], 
                                                colValues[6], colValues[7], colValues[11], 
                                                colValues[12], colValues[14]));
          }
          colValues = [];
          lineNum +=1;
        }
        
      }
      response.body = JSON.stringify(allStationData);
      resolve(response);
    }).catch((error) => reject("Error retrieving stations."))
  });
}

exports.handler = async (event) => {
    return getStationJSONData();
};