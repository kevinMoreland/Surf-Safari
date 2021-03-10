export default class Marker {
  constructor(coordinates, mapBoxMarkerObj) {
    this.coordinates = coordinates
    this.title = ""
    this.description = ""
    this.mapBoxMarkerObj = mapBoxMarkerObj
  }
}