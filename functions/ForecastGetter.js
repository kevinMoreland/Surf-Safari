var https = require('https');
let getForecast = async (lng, lat) => {
  const params = '?lat=' + lat + '&lng=' + lng

  const url = 'https://oeywaj7qa0.execute-api.us-west-2.amazonaws.com/dev/forecast' + params;
  const response = await fetch(url);
  const data = await response.json();
  console.log("retrieved forecast:")
  console.log(data);

}
module.exports = {
  getForecast
}