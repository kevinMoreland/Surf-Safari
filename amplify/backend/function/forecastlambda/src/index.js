
exports.handler = async (event) => {
    // TODO implement
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
    var https = require('https');
    const url = 'https://www.ndbc.noaa.gov/data/realtime2/41008.txt'

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
            response.body = JSON.stringify(rawBody);
            resolve(response);
          } catch (e) {
            reject(e.message);
          }
        });
      }).on('error', (e) => {
        reject(`Got error: ${e.message}`);
      })
    });
};
