import styles from './ClickMenu.module.css'
import fullscreenDialogContentTypes from '../FullScreenDialog/contentTypes.js'
import SurfSpotContentInput from "../Sidebar/SidebarContent/SurfSpotContent/SurfSpotContentInput.js"
import ForecastContentInput from "../Sidebar/SidebarContent/ForecastContent/ForecastContentInput.js"
import { generateForecast } from "../../functions/ForecastGenerator.js"

export default function ClickMenu(props) {
  let saveSpotContent = <p onClick={() =>
                        {props.closePopup();
                         props.setSideBar(
                          new SurfSpotContentInput("", "", props.updateMapMarker, props.removeMapMarker, props.coordinates.lng, props.coordinates.lat),
                          true);}}>
                       Save Spot
                    </p>
  return (
    <div className={styles.clickMenuContainer}>
      {saveSpotContent}
      <p onClick={() => {generateForecast(); //TODO populate content input with something
                         props.forecastDialog();
                         props.closePopup();
                         props.setSideBar(new ForecastContentInput(), true);}}>
                         Get Weather and Swell Forecast</p>
      <p onClick={()=>{props.measureDistanceDialog()}}> Measure Distance</p>
      <p onClick={() => {props.closePopup();
                         props.setFullScreenDialog(fullscreenDialogContentTypes.SATELLITE, true);}}>
                         View NASA Satellite Images</p>
    </div>)
}