import styles from '../../Sidebar.module.css'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import 'fontsource-roboto';
import ArrowIcon from './ArrowIcon.js';

export default function BuoyContent(props) {
  let content = <>
              <Typography variant="h4">Nearest Buoy Data</Typography>
              <br />
              <Link target="_blank" href={props.content.linkToStation}>Buoy {props.content.stationId} (Click for details)</Link>
              <Typography variant="body1">{props.content.distance.toFixed(2)} miles from this location</Typography>

              <Typography variant="body1">Swell Height: {props.content.waveHeight} meters</Typography>
              <Typography variant="body1">Period: {props.content.period} seconds</Typography>

              <div style={{display:"flex", alignItems: "center"}}>
                <Typography variant="body1">Direction: {props.content.direction}°</Typography>
                <ArrowIcon direction={props.content.direction} />
              </div>
           </>
  if(props.content.stationId == -1) {
    content = <Typography variant="body1">Loading data...</Typography>
  }
  return (
      <div className={styles.textContent}>
        {content}
      </div>)
}