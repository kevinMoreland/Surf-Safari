import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';
import { createUser, updateUser } from "../../../../src/graphql/mutations";
import { getUser } from "../../../../src/graphql/queries";
import { mod, coordinatesAreEqual } from "../../../../functions/Math.js"
import { generateForecast } from "../../../../functions/ForecastGenerator.js"

import { useState, useEffect } from "react";
import { Amplify, Auth} from 'aws-amplify';
import { API } from "@aws-amplify/api";

export default function SurfSpotContent(props) {
  const [titleVal, setTitleVal] = useState(props.content.title);
  const [descVal, setDescVal] = useState(props.content.description);

  //Ensures that when select a new markers, the title and description value change.
  //This is important because there is only 1 sidebar in the website that is never regenerated,
  //so otherwise without this the titleVal and descVal would just be set to whatever they were when the most recent marker was made
  useEffect(() => {
    setTitleVal(props.content.title)
    setDescVal(props.content.description)
  }, [props.content]);

  return (
      <div className={styles.textContent}>
        <InputBase
          style={{fontSize: 26}}
          id="standard-basic"
          label=""
          placeholder="Title"
          value={titleVal}
          onChange={(e)=>{setTitleVal(e.target.value);}}
          multiline
          rowsMax={2}/>
        <br/>
        <br/>
        <InputBase
          style={{width: "100%"}}
          id="standard-textarea"
          label=""
          placeholder="Description"
          value={descVal}
          onChange={(e)=>{setDescVal(e.target.value);}}
          multiline
          rowsMax={20}/>
        <div className={styles.buttons}>
          <Button onClick={()=>{props.openAlertDiag("Weather and Surf Forecasting", "In the full version of Surf Safari, forecasts of swells and weather conditions will be available for most locations.")}} variant="contained" color="primary">Get Forecast</Button>
          <Button onClick={()=>{props.content.updateMapMarker(titleVal, descVal); props.onClose();}} variant="contained" color="primary">Save</Button>
          <Button onClick={()=>{props.content.removeMapMarker(); props.onClose();}} variant="contained" color="primary">Delete</Button>
        </div>
      </div>)
}