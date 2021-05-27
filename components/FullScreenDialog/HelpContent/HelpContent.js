import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import 'fontsource-roboto';
import TextField from '@material-ui/core/TextField';

export default function HelpContent(props) {
  return (
      <>
        <DialogTopBar title="NASA Satellite Imagery" handleClose={props.handleClose}/>
        <div style={{padding: '5vw', textAlign: 'center', display: 'block'}}>
          <form noValidate>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
          <Button variant="contained"
                  color="primary"
                  style={{float:'end'}}
                  onClick={() => alert("Load satellite image...")}>Load Satellite Image Here at This Date</Button>
        <img style={{width: '100%', paddingTop: '3vh'}} src={"https://api.nasa.gov/planetary/earth/imagery?lon=" + props.content.lng + "&lat=" + props.content.lat + "&date=" + props.content.date + "&dim=0.15&api_key=mchZhjYmtPYa9GpCmPCwRDlL5h8waPmfurrWxPDc"}/>
        </div>
      </>)
}