import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import Typography from '@material-ui/core/Typography';
import { SignUp, SignOut } from '../../Authorization/Authorization.js'
import { AuthState } from '@aws-amplify/ui-components';
import 'fontsource-roboto';

export default function LoginContent(props) {
  let content = <SignUp />
  if(props.authState == AuthState.SignedIn && props.user) {
    content = <div style={{paddingTop: "20vh", paddingLeft: "10vw", paddingRight: "10vw"}}>
                <h1>Sign out from {props.user.username} ?</h1>
                <SignOut />
              </div>
  }
  return (
      <>
        <DialogTopBar title="Login" handleClose={props.handleClose}/>
          <div style={{textAlign: 'center'}}>
            {content}
          </div>
      </>)
}