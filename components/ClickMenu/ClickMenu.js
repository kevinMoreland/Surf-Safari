import styles from './ClickMenu.module.css'
import fullscreenDialogContentTypes from '../FullScreenDialog/contentTypes.js'
import SurfSpotContentInput from "../Sidebar/SidebarContent/SurfSpotContent/SurfSpotContentInput.js"
import ForecastContentInput from "../Sidebar/SidebarContent/ForecastContent/ForecastContentInput.js"

export default function ClickMenu(props) {
  //only allow option to save a spot if the user is logged in
  let saveSpotContent = <></>
  if(props.isLoggedIn) {
    saveSpotContent = <p onClick={() =>
                          {props.closePopup();
                           props.setSideBar(
                            new SurfSpotContentInput("", "", props.updateMapMarker, props.removeMapMarker, props.coordinates.lng, props.coordinates.lat),
                            true);}}>
                         Save Spot
                      </p>
  }
  return (
    <div className={styles.clickMenuContainer}>
      {saveSpotContent}
      <p onClick={() => {props.closePopup();
                         props.setSideBar(new ForecastContentInput(), true);}}>
                         Get Weather and Swell Forecast</p>
      <p>Measure Distance</p>
      <p onClick={() => {props.closePopup();
                         props.setFullScreenDialog(fullscreenDialogContentTypes.SATELLITE, true);}}>
                         View NASA Satellite Images</p>
    </div>)
}