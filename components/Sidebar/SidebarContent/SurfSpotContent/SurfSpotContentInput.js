import contentTypes from "../../contentTypes.js"

export default class {
  constructor(title, description, updateMapMarker, removeMapMarker, lng, lat) {
   this.contentType = contentTypes.SPOT_INFO;
   this.title = title;
   this.description = description;
   this.lng = lng;
   this.lat = lat;
   //Methods needed

   //Updates an existing map marker, or creates new one if it doesn't exist to UI
   this.updateMapMarker = updateMapMarker;

   //Removes map marker from UI
   this.removeMapMarker = removeMapMarker;
  }
}