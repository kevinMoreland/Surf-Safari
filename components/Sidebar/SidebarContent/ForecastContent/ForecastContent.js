import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import DayCast from './DayCast.js'

//TODO will have to either accept forecast data as a prop, or load it here
export default function ForecastContent(props) {
  let content = <Typography variant="body1">Loading data...</Typography>
  if(props.content.weatherArray != null) {
    content = []
    for(let i = 0; i < props.content.weatherArray.length; i++) {
      content.push(<DayCast />)
    }
  }
  return (
      <div className={styles.forecastContent}>
        {content}
        <br />
      </div>)
}