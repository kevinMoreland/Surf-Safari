import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

export default function LoginContent(props) {
  return (
      <>
        <DialogTopBar title="Login" handleClose={props.handleClose}/>
          <div style={{textAlign: "center"}}>
            <div style={{marginTop: "30vh"}}>
              <TextField style={{width: "40vw"}} id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div style={{marginTop: "1vh"}}>
              <TextField style={{width: "40vw"}} id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <div style={{marginTop: "1vh"}}>
              <Button style={{width: "40vw"}} variant="contained" color="primary" onClick={() => alert("Logging in...")}>Log in</Button>
            </div>
            <div style={{marginTop: "1vh"}}>
              <br />
              <Typography style={{fontStyle: "italic"}} variant="caption">No account? No problem! Create one here:</Typography>
            </div>
            <div style={{marginTop: "1vh"}}>
              <Button style={{width: "40vw"}} variant="contained" color="primary" onClick={() => alert("Logging in...")}>Create Account</Button>
            </div>
          </div>
      </>)
}