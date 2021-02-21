import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import DayCast from './DayCast.js'

export default function ForecastContent(props) {
  //height isn't quite 100 bc the close button takes some space at the top
  return (
      <div className={styles.forecastContent}>
        <DayCast />
        <DayCast />
        <DayCast />
        <DayCast />
        <DayCast />
        <DayCast />
        <br />
      </div>)
}