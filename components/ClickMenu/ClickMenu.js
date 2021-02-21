import styles from './ClickMenu.module.css'
import contentTypes from '../Sidebar/contentTypes.js'

export default function ClickMenu(props) {
  return (
    <div className={styles.test}>
      <p onClick={() => props.setSideBar("", "", contentTypes.SPOT_INFO, true)}>Save Spot</p>
      <p onClick={() => props.setSideBar("", "", contentTypes.FORECAST, true)}>Get Weather and Swell Forecast</p>
      <p>Measure Distance</p>
      <p>View NASA Satellite Images</p>
    </div>)
}