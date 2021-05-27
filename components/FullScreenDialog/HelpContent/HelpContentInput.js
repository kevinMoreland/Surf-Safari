import contentTypes from "../contentTypes.js"

export default class {
  constructor(lat, lng, date) {
    this.contentType = contentTypes.HELP;
    this.lat = lat;
    this.lng = lng;
    this.date = date;
  }
}