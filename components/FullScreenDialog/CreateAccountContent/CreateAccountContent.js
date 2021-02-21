import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import 'fontsource-roboto';

export default function CreateAccountContent(props) {
  return (
      <>
        <DialogTopBar title="Create Account" handleClose={props.handleClose}/>
        <p>Create Account</p>
      </>)
}