import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';
import { createUser, updateUser } from "../../../../src/graphql/mutations";
import { getUser } from "../../../../src/graphql/queries";
import { Amplify, Auth} from 'aws-amplify';
import { API } from "@aws-amplify/api";

export default function SurfSpotContent(props) {
  let inputTitleVal = ""
  let inputDescrVal = ""

  console.log(props.content)
  const addSurfSpot = async (event) => {
    event.preventDefault();
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
                    surfspots: existingSurfSpots.push({long: 10.0, lat: 13.0, name: "Test Title", description: "Test Description"})
                },
            },
        });
        console.log(result);
      }
    }
    catch (err) {
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
          defaultValue={props.content.title}
          onChange={(e)=>{console.log(e); inputTitleVal = e.target.value;}}
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
          defaultValue={props.content.description}
          onChange={(e)=>{console.log(e); inputDescrVal = e.target.value;}}
          multiline
          rowsMax={20}/>
        <div className={styles.buttons}>
          <Button onClick={()=>alert("Changing content to weather info...")} variant="contained" color="primary">Get Forecast</Button>
          <Button onClick={()=>props.content.updateMapMarker(inputTitleVal, inputDescrVal)} variant="contained" color="primary">Save</Button>
          <Button onClick={props.content.removeMapMarker} variant="contained" color="primary">Delete</Button>
        </div>
      </div>)
}