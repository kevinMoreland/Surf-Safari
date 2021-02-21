import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import DayCast from './DayCast.js'

//TODO will have to either accept forecast data as a prop, or load it here
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