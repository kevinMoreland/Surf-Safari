import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { InputBase } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import 'fontsource-roboto';

export default function DialogTopBar(props) {
  return (
    <AppBar style={{position: 'relative'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" style={{marginLeft: "2vw", flex: "1"}}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>)
}