import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Sidebar from "../components/Sidebar/Sidebar.js"

import FullScreenDialog from "../components/FullScreenDialog/FullScreenDialog.js"
import AlertDialog from "../components/AlertDialog/AlertDialog.js"

import MiniMapButton from "../components/MiniMapButton/MiniMapButton.js"
import fullScreenDialogContentTypes from '../components/FullScreenDialog/contentTypes.js'
import ProfileButton from '../components/ProfileButton/ProfileButton.js'
import { changeMapStyle, initializeMap, mapContainerDivName } from "../map/initializeMap";
import { mapModes, availableMaps } from "../map/mapModes";

import { fetcher } from "../utilities/fetcher";
import 'fontsource-roboto';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-192919844-1');
ReactGA.pageview("/");

//home for the demo version
export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [mapStyle, setMapStyle] = useState(mapModes.OUTDOOR);
  const [sideBarInfo, setSideBarInfo] = useState({content: {}, isActive: false});
  const [fullScreenDialogInfo, setFullScreenDialogInfo] = useState({contentType: "", isActive: false});

  //Specific to DEMO. Alert user of upcoming features
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDesc, setDialogDesc] = useState("");
  const handleDialogClickOpen = (titleText, descText) => {
    setDialogTitle(titleText);
    setDialogDesc(descText);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  //-------------------------------------------------

  //When page first loads, set page mounted to true and initialize map
  useEffect(() => {
    setPageIsMounted(true);
    handleDialogClickOpen("Welcome to Surf Safari! (beta version)", "The goal of Surf Safari is to combine satellite imagery, swell data, weather data, and other useful information for assessing the surf potential of beaches together into one tool. You can use this to get a forecast for your local beach or discover new, remote surf locations around the world!")
    initializeMap(mapContainerDivName,
                  mapStyle,
                  (a, b) => setSideBarInfo({content: a, isActive: b}),
                  (a, b) => {
                      if(a == fullScreenDialogContentTypes.SATELLITE) {
                        handleDialogClickOpen("NASA Satellite Imagery by Date and Location", "In the full version of Surf Safari, you will be able to view satellite imagery available from NASA of any beach location at any available date to better assess its surf potential.");
                      }
                      setFullScreenDialogInfo({contentType: a, isActive: b});
                  },
                  () => handleDialogClickOpen("Distance Measuring", "In the full version of Surf Safari, you will be able to calculate the distance and elevation change between two points on the map."),
                  () => handleDialogClickOpen("Weather and Surf Forecasting", "In the full version of Surf Safari, forecasts of swells and weather conditions will be available for most locations."))
  }, []);

//  //When page first loads, set auth state
//  useEffect(() => {
//      if(authState === undefined) {
//        Auth.currentAuthenticatedUser().then(authData => {
//          setAuthState(AuthState.SignedIn);
//        });
//      }
//      return onAuthUIStateChange((nextAuthState, authData) => {
//          setAuthState(nextAuthState);
//      });
//  }, []);

//  //update map content when status of login changes
//  useEffect(() => {
//    if(pageIsMounted) {
//      let isLoggedIn = authState == AuthState.SignedIn;
//      updateMapOnLogInChange(isLoggedIn);
//
//      clearMapMarkers();
//      if(isLoggedIn) {
//        fillAllMarkersFromCloud();
//      }
//    }
//  }, [authState])

  //toggleMap changes the value of 'mapStyle', which triggers the below effect to actually change map content
  function toggleMap(newMapStyle) {
    if(newMapStyle == mapModes.SURF) {
      handleDialogClickOpen("Global Swell Tracker Map", "In the full version of Surf Safari, this option will open a swell tracker map so that you can see where the best swells are hitting!");
    }
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
        handleClose={() => setFullScreenDialogInfo({contentType: fullScreenDialogInfo.contentType, isActive: false})}
        open={fullScreenDialogInfo.isActive}
        />
      <Sidebar
        active={sideBarInfo.isActive}
        content={sideBarInfo.content}
        openAlertDiag={(a, b) => handleDialogClickOpen(a, b)}
        onClose={() => setSideBarInfo({content: sideBarInfo.content, isActive: false})}/>

      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id={mapContainerDivName} className={styles.mapContainer}/>
        </main>

        <div className={styles.profileIconContainer}>
          <ProfileButton handleClick={() => handleDialogClickOpen("Profile Login", "In the full version of Surf Safari, this button would take you to our login screen. A Surf Safari account will allow you to mark surf spots on the map and save them for future reference!")}/>
        </div>
        <div className={styles.miniMapContainer}>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={0} availableMaps={availableMaps}/>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={1} availableMaps={availableMaps}/>
        </div>
      </div>
      <AlertDialog title={dialogTitle} desc={dialogDesc} open={openDialog} handleClose={handleDialogClose}/>
    </div>
  )
}
