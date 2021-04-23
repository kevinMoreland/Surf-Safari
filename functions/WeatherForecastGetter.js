var https = require('https');

let getForecast = async (city) => {
  const apiKey = '1a8a16957e27faf1557b6a0add987dae'

  const url = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=10&appid=' + apiKey;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
module.exports = {
  getForecast
}