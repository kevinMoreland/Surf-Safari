import contentTypes from "../../contentTypes.js"

export default class {
  constructor(weatherArray) {
    this.contentType = contentTypes.FORECAST;
    this.weatherArray = weatherArray;
  }
}