import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';
import { createUser, updateUser } from "../../../../src/graphql/mutations";
import { getUser } from "../../../../src/graphql/queries";
import { mod, coordinatesAreEqual } from "../../../../functions/Math.js"

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

  const removeSurfSpot = async (lng, lat) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    try {
      const response = await API.graphql({
        query: getUser,
        variables: { id: currentUser.attributes.sub },
      });
      if(response.data.getUser) {
        console.log(response.data.getUser)
        let existingSurfSpots = response.data.getUser.surfspots
        let indexToSlice = -1;
        for(let i = 0; i < existingSurfSpots.length; i ++){
          if(coordinatesAreEqual({lng: existingSurfSpots[i].long, lat: existingSurfSpots[i].lat}, {lng: lng, lat: lat})) {
            indexToSlice = i
            break
          }
        }
        if(indexToSlice == -1) {
          alert("Could not remove surf spot becaust it could not be found")
          return
        }
        existingSurfSpots.splice(indexToSlice, 1)
        console.log("array:")
        console.log(existingSurfSpots)
        const result = await API.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: currentUser.attributes.sub,
                    surfspots: existingSurfSpots
                },
            },
        });
        console.log("response:")
        console.log(response);
      }
    }
    catch (err) {
      let errMessage = "Error deleting surf spot"
      if(err.errors.length > 0) {
        errMessage = "We got an error deleting your surf spot: " + err.errors[0].message
      }
      alert(errMessage)
      console.log(err);
    }
  }

  const addSurfSpot = async (lng, lat, title, descr) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    try {
      const response = await API.graphql({
        query: getUser,
        variables: { id: currentUser.attributes.sub },
      });
      if(response.data.getUser) {
        console.log(response.data.getUser)
        let existingSurfSpots = response.data.getUser.surfspots
        const result = await API.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: currentUser.attributes.sub,
                    surfspots: existingSurfSpots.concat({long: lng, lat: lat, name: title, description: descr})
                },
            },
        });
        console.log("response:")
        console.log(response);
      }
      else {
        //User couldn't be found because they haven't saved any spots yet. Save the first spot
        const result = await API.graphql({
            query: createUser,
            variables: {
                input: {
                    id: currentUser.attributes.sub,
                    surfspots: [{long: lng, lat: lat, name: title, description: descr}]
                },
            },
        });
        console.log("response:")
        console.log(response);
      }
    }
    catch (err) {
      let errMessage = "Error saving data"
      if(err.errors.length > 0) {
        errMessage = "We got an error saving your data: " + err.errors[0].message
      }
      alert(errMessage)
      console.log(err);
    }
  }

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
        <p style={{fontSize: 10}}>Longitude: {props.content.lng} Latitude: {props.content.lat}</p>
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
          <Button onClick={()=>alert("Changing content to weather info...")} variant="contained" color="primary">Get Forecast</Button>
          <Button onClick={()=>{addSurfSpot(props.content.lng, props.content.lat, titleVal, descVal); props.content.updateMapMarker(titleVal, descVal);}} variant="contained" color="primary">Save</Button>
          <Button onClick={()=>{removeSurfSpot(props.content.lng, props.content.lat); props.content.removeMapMarker(); props.onClose();}} variant="contained" color="primary">Delete</Button>
        </div>
      </div>)
}