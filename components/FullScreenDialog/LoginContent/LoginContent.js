import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import Typography from '@material-ui/core/Typography';
import { SignUp } from '../../Authorization/Authorization.js'
import 'fontsource-roboto';

export default function LoginContent(props) {
  return (
      <>
        <DialogTopBar title="Login" handleClose={props.handleClose}/>
          <div>
            <SignUp />
          </div>
      </>)
}