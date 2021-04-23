var https = require('https');

let getForecast = async (lon, lat) => {
  const apiKey = '1a8a16957e27faf1557b6a0add987dae'

  const url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon +'&cnt=10&appid=' + apiKey;
  const response = await fetch(url);
  const data = await response.json();
  output = []
  console.log(data.list)
  for(let i = 0; i < data.list.length; i ++) {
    output.push({weather: data.list[i].weather[0].main, weatherDesc: data.list[i].weather[0].description, hi: Math.trunc(data.list[i].temp.max - 273.15), lo: Math.trunc(data.list[i].temp.min - 273.15)})
  }
  return output;
}
module.exports = {
  getForecast
}