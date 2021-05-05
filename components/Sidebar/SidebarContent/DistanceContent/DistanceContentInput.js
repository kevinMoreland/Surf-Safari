import contentTypes from "../../contentTypes.js"
import { pointsDistance } from "../../../../functions/Math.js"
export default class {
  constructor(pointsDistance, setSideBar, beforeClose) {
   this.contentType = contentTypes.DISTANCE;
   this.pointsDistance = pointsDistance;

   //set sidebar
   this.setSideBar = setSideBar

   //clear markers before closing
   this.beforeClose = beforeClose;
  }
}