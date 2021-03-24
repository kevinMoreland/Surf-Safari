import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Mailchimp from 'react-mailchimp-form'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{props.desc}</DialogContentText>
            <DialogContentText id="alert-dialog-description">Interested in the full version? Subscribe to updates on the release!</DialogContentText>
            <Mailchimp
            action='https://gmail.us1.list-manage.com/subscribe/post?u=5b3d14f9bf18f83e9d0985c26&amp;id=2d1a155711'
            fields={[
              {
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                required: true
              }
            ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" autoFocus>Ok!</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}