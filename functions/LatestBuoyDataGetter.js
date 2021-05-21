var https = require('https');

let getLatestBuoyData = async (lng, lat) => {
  const url = 'https://cvfyiehm2g.execute-api.us-west-2.amazonaws.com/dev/latestobs';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
module.exports = {
  getLatestBuoyData
}