import contentTypes from "../../contentTypes.js"

export default class {
  constructor(title, description, addMapMarker, removeMapMarker, updateUser) {
   this.contentType = contentTypes.SPOT_INFO;
   this.title = title;
   this.description = description;
   this.addMapMarker = addMapMarker;
   this.removeMapMarker = removeMapMarker;
   this.updateUser = updateUser;
  }
}