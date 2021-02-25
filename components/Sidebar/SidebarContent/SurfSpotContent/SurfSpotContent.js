import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';
import { createUser, updateUser } from "../../../../src/graphql/mutations";
import { Amplify, Auth} from 'aws-amplify';
import { API } from "@aws-amplify/api";

export default function SurfSpotContent(props) {
  const submitHandler = async (event) => {
      event.preventDefault();
      const currentUser = await Auth.currentAuthenticatedUser();
      try {
          const result = await API.graphql({
              query: createUser,
              variables: {
                  input: {
                      id: currentUser.attributes.sub,
                      surfspots: [{long: 10.0, lat: 11.0, name: "Test Title", description: "Test Description"}]
                  },
              },
          });
          console.log(result);
      } catch (err) {
          console.log(err);
      }
  };
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
          <Button onClick={submitHandler} variant="contained" color="primary">Save</Button>
          <Button onClick={()=>alert("Deleting or cancelling...")} variant="contained" color="primary">Delete</Button>
        </div>
      </div>)
}