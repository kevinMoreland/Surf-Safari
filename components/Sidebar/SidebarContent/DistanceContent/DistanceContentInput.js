import contentTypes from "../../contentTypes.js"

export default class {
  constructor(points, setSideBar, beforeClose) {
   this.contentType = contentTypes.DISTANCE;
   this.points = points;

   //set sidebar
   this.setSideBar = setSideBar

   //clear markers before closing
   this.beforeClose = beforeClose;
  }
}