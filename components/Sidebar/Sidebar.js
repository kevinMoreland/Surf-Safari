import styles from './Sidebar.module.css'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import 'fontsource-roboto';

export default function Sidebar(props) {
  //Careful! the order of the classes specified for <Paper> matters
  return (
    <Paper className={(props.active ? styles.active : styles.inactive) + " " + styles.sidebar}
           elevation={3}
           square={true}>
      <div className={styles.closeButton}>
        <CloseIcon onClick={props.onClose} fontSize="large"/>
      </div>
      <div className={styles.content}>
        <Typography align="center" variant="h3">{props.title}</Typography>
        <br/>
        <Typography variant="body1">{props.description}</Typography>
      </div>
      <div className={styles.buttons}>
        {props.buttons.map((button, index) =>
          <>
            <Button onClick={button.action} key={index} variant="contained" color="primary">{button.title}</Button>
          </>
        )}
      </div>
    </Paper>)
}