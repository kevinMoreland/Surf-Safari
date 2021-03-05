import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Sidebar from "../components/Sidebar/Sidebar.js"

import FullScreenDialog from "../components/FullScreenDialog/FullScreenDialog.js"
import MiniMapButton from "../components/MiniMapButton/MiniMapButton.js"
import fullScreenDialogContentTypes from '../components/FullScreenDialog/contentTypes.js'
import ProfileButton from '../components/ProfileButton/ProfileButton.js'
import { initializeMap, changeMapStyle, updateMapOnLogInChange } from "../map/initializeMap";
import { fetcher } from "../utilities/fetcher";
import 'fontsource-roboto';

//Necessary for AWS Cognito for sign up/ sign in ------
import { Amplify, Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
//-----------------------------------------------------

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);

  //hook for displaying the correct map. TODO replace surfMap with my personalized map
  //const [Map, setMap] = useState();
  const satMap = "mapbox://styles/mapbox/satellite-v9";
  const outdoorsMap = "mapbox://styles/mapbox/outdoors-v11";
  const surfMap = "mapbox://styles/mapbox/streets-v11"
  const availableMaps = [satMap, outdoorsMap, surfMap]
  const [mapStyle, setMapStyle] = useState(outdoorsMap);

  //hook for sidebar info
  const [sideBarInfo, setSideBarInfo] = useState({content: {}, isActive: false});

  //hook for full screen dialog info
  const [fullScreenDialogInfo, setFullScreenDialogInfo] = useState({contentType: "", isActive: false});

  //stuff for login/signup authentication and keeping track of the logged in account
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
      if(authState === undefined) {
        Auth.currentAuthenticatedUser().then(authData => {
          setAuthState(AuthState.SignedIn);
          setUser(authData);
        });
      }
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  //toggleMap changes the value of 'mapStyle', which triggers the below effect to actually change map content
  function toggleMap(newMapStyle) {
    setMapStyle(newMapStyle);
  }
  useEffect(() => {
    if(pageIsMounted){
      changeMapStyle(mapStyle);
    }
  }, [mapStyle])

  useEffect(() => {
    if(pageIsMounted) {
      let isLoggedIn = authState == AuthState.SignedIn;
      console.log("page is mounted, updating content w log in info:")
      updateMapOnLogInChange(isLoggedIn);
    }
  }, [authState])

  useEffect(() => {
    setPageIsMounted(true);
    initializeMap("my-map",
                  mapStyle,
                  authState == AuthState.SignedIn,
                  (a, b) => setSideBarInfo({content: a, isActive: b}),
                  (a, b) => setFullScreenDialogInfo({contentType: a, isActive: b}));
  }, []);

  return (
  //TODO: on start, get browser data to see if login saved. Login user if so, go straight to map
    <div>
      <Head>
        <title>Create Next App</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
        <link href='/css/weather-icons-wind.css' rel='stylesheet'/>
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
        authState={authState}
        user={user}
        />
      <Sidebar
        active={sideBarInfo.isActive}
        content={sideBarInfo.content}
        onClose={() => setSideBarInfo({content: sideBarInfo.content, isActive: false})}/>

      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id="my-map" className={styles.mapContainer}/>
        </main>

        <div className={styles.profileIconContainer}>
          <ProfileButton handleClick={() => setFullScreenDialogInfo({contentType: fullScreenDialogContentTypes.LOGIN, isActive: true})}/>
        </div>
        <div className={styles.miniMapContainer}>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={0} availableMaps={availableMaps}/>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={1} availableMaps={availableMaps}/>
        </div>
      </div>
    </div>
  )
}
