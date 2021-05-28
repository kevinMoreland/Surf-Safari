import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import 'fontsource-roboto';
import TextField from '@material-ui/core/TextField';

let imageWidth = '90%'
export default function HelpContent(props) {
  return (
      <>
        <DialogTopBar title="Help" handleClose={props.handleClose}/>
        <div style={{textAlign: 'center'}}>
          <div style={{padding: '5vw', marginLeft: '15%', marginRight: '15%', textAlign: 'center', display: 'block'}}>
            <Typography variant="h3">Welcome to Surf Safari!</Typography>
            <Typography variant="body1">The goal of Surf Safari is to combine weather, buoy, and satellite information from multiple sources into one website to make analyzing the surf potential of unknown, remote beaches easier. This website is perfect for anyone interested in discovering new surf spots and learning how to read and interpret buoy data!</Typography>

            <br />
            <Typography variant="h4">How do you use Surf Safari?</Typography>
            <Typography variant="body1">Most of the features of Surf safari can be accessed by clicking the map at a location you want to analyze.</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/rightClickMenu.PNG"}/>

            <br />
            <br />
            <Typography variant="h4">Saving Surf Spots</Typography>
            <Typography variant="body1">In order to save a surf spot, you must create an account and log in first. Accounts can be accessed from the top left corner of the website at the profile button.</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/profileLocation.PNG"}/>
            <Typography variant="body1">Once you are logged into your account, you can click the map and see the option to save a surf spot.</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/saveSurfSpotOption.PNG"}/>
            <Typography variant="body1">When this option is clicked, a side bar will display where you can add a title and description to your discovered spot, and it will be saved for future reference!</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/saveSpotSidebar.PNG"}/>

            <br />
            <br />
            <Typography variant="h4">Switching Map Views</Typography>
            <Typography variant="body1">At the bottom left corner of the website, you can toggle between a satellite view and land/topology view.</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/switchMapView.PNG"}/>
            <Typography variant="body1">You can also toggle the display of buoys. Buoys are displayed as blue map markers which when clicked, display their collected swell data.</Typography>
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/buoyToggle.PNG"}/>
            <br />
            <img style={{width: imageWidth, paddingTop: '1vh'}} src={"/buoyData.PNG"}/>


          </div>
        </div>
      </>)
}