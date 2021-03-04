import contentTypes from "../../contentTypes.js"

export default class {
  constructor(title, description, addMapMarker, removeMapMarker, updateUser) {
   this.contentType = contentTypes.SPOT_INFO;
   this.title = title;
   this.description = description;

   //Methods needed

   //Adds map marker to UI
   this.addMapMarker = addMapMarker;

   //Removes map marker from UI
   this.removeMapMarker = removeMapMarker;

   //Updates DB if we decide to delete or add a surfspot
   this.updateUser = updateUser;
  }
}