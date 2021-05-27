import contentTypes from "../../contentTypes.js"

export default class {
  constructor(stationId, waveHeight, period, direction) {
    this.contentType = contentTypes.BUOY;
    this.stationId = stationId
    this.waveHeight = waveHeight
    this.period = period
    this.direction = direction
    this.linkToStation = "https://www.ndbc.noaa.gov/station_page.php?station=" + stationId
  }
}
//direction, distance, period, stationId, waveHeight, linkToStation