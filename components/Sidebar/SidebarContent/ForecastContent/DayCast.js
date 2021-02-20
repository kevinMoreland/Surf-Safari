import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import 'fontsource-roboto';

export default function DayCast(props) {
  return (
      <Paper elevation={2} square={true} style={{marginTop: "5px"}}>
        <Typography variant="body1">"60°F/85°F"</Typography>
        <Typography variant="body1">"Mostly Cloudy"</Typography>
        <br />
        <Typography variant="body1">"Swells:"</Typography>
        <Typography variant="body1">"3.1ft 15s 198°"</Typography>
        <Typography variant="body1">"1.8ft 11s 256°"</Typography>
        <Typography variant="body1">"2.1ft 9s 241°"</Typography>
      </Paper>)
}