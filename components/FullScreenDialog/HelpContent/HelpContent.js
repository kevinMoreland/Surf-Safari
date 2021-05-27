import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import DialogTopBar from '../DialogTopBar/DialogTopBar.js'
import 'fontsource-roboto';
import TextField from '@material-ui/core/TextField';

export default function HelpContent(props) {
  return (
      <>
        <DialogTopBar title="Help" handleClose={props.handleClose}/>
      </>)
}