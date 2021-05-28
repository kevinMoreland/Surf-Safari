import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Sidebar from "../components/Sidebar/Sidebar.js"

import LoginContentInput from "../components/FullScreenDialog/LoginContent/LoginContentInput.js"
import HelpContentInput from "../components/FullScreenDialog/HelpContent/HelpContentInput.js"
import FullScreenDialog from "../components/FullScreenDialog/FullScreenDialog.js"
import MiniMapButton from "../components/MiniMapButton/MiniMapButton.js"
import fullScreenDialogContentTypes from '../components/FullScreenDialog/contentTypes.js'
import ProfileButton from '../components/ProfileButton/ProfileButton.js'
import HelpButton from '../components/HelpButton/HelpButton.js'

import { initializeMap, clearMapMarkers, fillAllMarkersFromCloud, changeMapStyle, updateMapOnLogInChange, mapContainerDivName, clearBuoyMarkers, populateBuoyMarkers } from "../map/initializeMap";
import { mapModes, availableMaps } from "../map/mapModes";

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { fetcher } from "../utilities/fetcher";
import 'fontsource-roboto';
//Necessary for AWS Cognito for sign up/ sign in ------
import { Amplify, Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../src/aws-exports';
Amplify.configure({...awsconfig, ssr: true });
//-----------------------------------------------------

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [mapStyle, setMapStyle] = useState(mapModes.OUTDOOR);
  const [sideBarInfo, setSideBarInfo] = useState({content: {}, isActive: false});
  const [fullScreenDialogInfo, setFullScreenDialogInfo] = useState({content: {}, isActive: false});
  const [authState, setAuthState] = useState();

  //for toggling if buoys displayed. 'true' because initially buoys are populated
  const [showBuoysChecked, setShowBuoysChecked] = useState(true);
  const toggleShowBuoysChecked = () => {
    setShowBuoysChecked((prev) => {
      let settingToShow = !prev;
      if(settingToShow) {
        populateBuoyMarkers();
      }
      else {
        clearBuoyMarkers();
      }
      return settingToShow}
    );

  };

  //When page first loads, set page mounted to true and initialize map
  useEffect(() => {
    setPageIsMounted(true);
    initializeMap(mapContainerDivName,
                  mapStyle,
                  authState == AuthState.SignedIn,
                  (a, b) => setSideBarInfo({content: a, isActive: b}),
                  (a, b) => setFullScreenDialogInfo({content: a, isActive: b}));
    setFullScreenDialogInfo({content: new HelpContentInput(), isActive: true})
  }, []);

  //When page first loads, set auth state
  useEffect(() => {
      if(authState === undefined) {
        Auth.currentAuthenticatedUser().then(authData => {
          setAuthState(AuthState.SignedIn);
        });
      }
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
      });

  }, []);

  //update map content when status of login changes
  useEffect(() => {
    if(pageIsMounted) {
      let isLoggedIn = authState == AuthState.SignedIn;
      updateMapOnLogInChange(isLoggedIn);

      clearMapMarkers();
      if(isLoggedIn) {
        fillAllMarkersFromCloud();
      }
    }
  }, [authState])

  //toggleMap changes the value of 'mapStyle', which triggers the below effect to actually change map content
  function toggleMap(newMapStyle) {
    setMapStyle(newMapStyle);
  }
  useEffect(() => {
    if(pageIsMounted){
      changeMapStyle(mapStyle);
    }
  }, [mapStyle])

  return (
  //TODO: on start, get browser data to see if login saved. Login user if so, go straight to map
    <div>
      <Head>
        <title>Surf Safari</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
          type="text/css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullScreenDialog
        contentType={fullScreenDialogInfo.contentType}
        handleClose={() => setFullScreenDialogInfo({content: fullScreenDialogInfo.content, isActive: false})}
        open={fullScreenDialogInfo.isActive}
        content={fullScreenDialogInfo.content}
        authState={authState}
        />
      <Sidebar
        active={sideBarInfo.isActive}
        content={sideBarInfo.content}
        onClose={() => setSideBarInfo({content: sideBarInfo.content, isActive: false})}/>

      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id={mapContainerDivName} className={styles.mapContainer}/>
        </main>

        <div className={styles.profileIconContainer}>
          <HelpButton handleClick={() => setFullScreenDialogInfo({content: new HelpContentInput(), isActive: true})}/>
          <ProfileButton handleClick={() => setFullScreenDialogInfo({content: new LoginContentInput(), isActive: true})}/>
        </div>
        <div className={styles.miniMapContainer}>
          <FormGroup className={styles.buoyToggleContainer}>
            <FormControlLabel
              control={<Switch checked={showBuoysChecked} onChange={toggleShowBuoysChecked} color="secondary"/>}
              label="Buoys"
              labelPlacement="end"
            />
          </FormGroup>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={0} availableMaps={availableMaps}/>
        </div>
      </div>
    </div>
  )
}
