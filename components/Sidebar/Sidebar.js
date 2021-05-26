import styles from './Sidebar.module.css'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import contentTypes from './contentTypes.js'
import SurfSpotContent from './SidebarContent/SurfSpotContent/SurfSpotContent.js'
import ForecastContent from './SidebarContent/ForecastContent/ForecastContent.js'
import NearestBuoyContent from './SidebarContent/NearestBuoyContent/NearestBuoyContent.js'
import DistanceContent from './SidebarContent/DistanceContent/DistanceContent.js'

import 'fontsource-roboto';

//props.contentType can be "forecast", "spotInfo", "editableSpot"
//should also accept in long lat, and a function for updating database
export default function Sidebar(props) {
  let content = <p>Content not found</p>
  if(props.content.contentType == contentTypes.SPOT_INFO) {
    content = <SurfSpotContent onClose={props.onClose} content={props.content}/>
  }
  else if(props.content.contentType == contentTypes.FORECAST) {
    content = <ForecastContent content={props.content}/>
  }
  else if(props.content.contentType == contentTypes.BUOY) {
    content = <NearestBuoyContent content={props.content}/>
  }
  else if(props.content.contentType == contentTypes.DISTANCE) {
    content = <DistanceContent content={props.content}/>
  }
  function handleClose() {
    if(props.content.beforeClose != null){
      props.content.beforeClose();
    }
    props.onClose();
  }
  //Careful! the order of the classes specified for <Paper> matters
  return (
    <Paper className={(props.active ? styles.active : styles.inactive) + " " + styles.sidebar}
           elevation={3}
           square={true}>
      <div className={styles.closeButton}>
        <CloseIcon onClick={handleClose}
          fontSize="large"/>
      </div>
      {content}
    </Paper>)
}