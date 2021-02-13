import styles from './ClickMenu.module.css'

export default function ClickMenu(props) {
  return (
    <div className={styles.test}>
      <p onClick={props.toggleSideBar}>Save Spot</p>
      <p>Get Weather and Swell Forecast</p>
      <p>Measure Distance</p>
      <p>View NASA Satellite Images</p>
    </div>)
}