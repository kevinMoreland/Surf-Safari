import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import fullscreenDialogContentTypes from '../FullScreenDialog/contentTypes.js'
import SatelliteContent from './SatelliteContent/SatelliteContent.js'
import LoginContent from './LoginContent/LoginContent.js'
import CreateAccountContent from './CreateAccountContent/CreateAccountContent.js'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  let content = <p>Content not found.</p>
  if(props.contentType == fullscreenDialogContentTypes.SATELLITE) {
    content = <SatelliteContent handleClose={props.handleClose}/>
  }
  else if(props.contentType == fullscreenDialogContentTypes.LOGIN) {
    content = <LoginContent authState={props.authState}
                            handleClose={props.handleClose}/>
  }
  else if(props.contentType == fullscreenDialogContentTypes.CREATE_ACCOUNT) {
    content = <CreateAccountContent handleClose={props.handleClose}/>
  }
  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        {content}
      </Dialog>
    </div>
  );
}