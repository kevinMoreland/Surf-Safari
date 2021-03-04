import styles from './ClickMenu.module.css'
import fullscreenDialogContentTypes from '../FullScreenDialog/contentTypes.js'
import SurfSpotContentInput from "../Sidebar/SidebarContent/SurfSpotContent/SurfSpotContentInput.js"
import ForecastContentInput from "../Sidebar/SidebarContent/ForecastContent/ForecastContentInput.js"

export default function ClickMenu(props) {
  //props.addMapMarker();
  return (
    <div className={styles.test}>
      <p onClick={() => props.setSideBar(
        new SurfSpotContentInput("", "", props.addMapMarker, props.removeMapMarker, () => alert("update user")),
        true)}>
        Save Spot
      </p>
      <p onClick={() => props.setSideBar(new ForecastContentInput(), true)}>Get Weather and Swell Forecast</p>
      <p>Measure Distance</p>
      <p onClick={() => props.setFullScreenDialog(fullscreenDialogContentTypes.SATELLITE, true)}>View NASA Satellite Images</p>
    </div>)
}