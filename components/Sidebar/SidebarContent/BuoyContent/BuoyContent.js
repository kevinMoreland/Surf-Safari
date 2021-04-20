import styles from '../../Sidebar.module.css'
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { getForecast } from "../../../../functions/ForecastGetter.js"

export default function BuoyContent(props) {
  //getForecast(props.content.lng, props.content.lat);
  return (
      <div className={styles.textContent}>
        <h1>Data from nearest buoy</h1>
        <h2><a href={props.content.linkToStation} target="_blank">Buoy {props.content.stationId}</a></h2>
        <h2>Distance: {props.content.distance}</h2>
        <h2>Swell Height: {props.content.waveHeight}</h2>
        <h2>Swell Period: {props.content.period}</h2>
        <h2>Direction: {props.content.direction}</h2>
      </div>)
}
/*
getForecast(props.coordinates.lng, props.coordinates.lat);
*/