import styles from './ClickMenu.module.css'
import sidebarContentTypes from '../Sidebar/contentTypes.js'
import fullscreenDialogContentTypes from '../FullScreenDialog/contentTypes.js'

export default function ClickMenu(props) {
  return (
    <div className={styles.test}>
      <p onClick={() => props.setSideBar("", "", sidebarContentTypes.SPOT_INFO, true)}>Save Spot</p>
      <p onClick={() => props.setSideBar("", "", sidebarContentTypes.FORECAST, true)}>Get Weather and Swell Forecast</p>
      <p>Measure Distance</p>
      <p onClick={() => props.setFullScreenDialog(fullscreenDialogContentTypes.SATELLITE, true)}>View NASA Satellite Images</p>
    </div>)
}