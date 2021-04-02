import getNearestBuoy from "GetNearestBuoy.js"

function generateForecast() {
  getNearestBuoy().then((res) => console.log("nearest buoy station: " + res)).catch(error => console.log("Error: " + error));
}
module.exports = {
  generateForecast
}