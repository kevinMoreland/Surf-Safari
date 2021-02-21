import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';

//props.title, and props.description
//        <Typography align="center" variant="h5">{props.title}</Typography>
//        <Typography variant="body1">{props.description}</Typography>

export default function SurfSpotContent(props) {
  return (
      <div className={styles.textContent}>
        <InputBase
          style={{fontSize: 26}}
          id="standard-basic"
          label=""
          placeholder="Title"
          onChange={()=>console.log("changed Title")}
          multiline
          rowsMax={2}/>
        <br/>
        <br/>
        <InputBase
          style={{width: "100%"}}
          id="standard-textarea"
          label=""
          placeholder="Description"
          onChange={()=>console.log("changed Description")}
          multiline
          rowsMax={20}/>
        <div className={styles.buttons}>
          <Button onClick={()=>alert("Changing content to weather info...")} variant="contained" color="primary">Get Forecast</Button>
          <Button onClick={()=>alert("Deleting or cancelling...")} variant="contained" color="primary">Delete</Button>
        </div>
      </div>)
}