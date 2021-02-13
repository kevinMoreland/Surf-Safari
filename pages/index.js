import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import Sidebar from "../components/Sidebar/Sidebar.js"
import { addDataLayer } from "../map/addDataLayer";
import { initializeMap, changeMapStyle } from "../map/initializeMap";
import { fetcher } from "../utilities/fetcher";
import 'fontsource-roboto';

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const satMap = "mapbox://styles/mapbox/satellite-v9";
  const outdoorsMap = "mapbox://styles/mapbox/outdoors-v11";
  const [mapStyle, setMapStyle] = useState(outdoorsMap);
  const { data, error } = useSWR("/api/testAPI", fetcher);
  const [sideBarIsActive, setSideBarActive] = useState(false);

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'

  function toggleSideBar() {
    setSideBarActive(sideBarIsActive => !sideBarIsActive);
  }
  function toggleMap() {
    if(mapStyle == satMap) {
      setMapStyle(outdoorsMap);
    }
    else if(mapStyle == outdoorsMap) {
      setMapStyle(satMap);
    }
    changeMapStyle(Map, mapStyle);
  }
  useEffect(() => {
    setPageIsMounted(true);
    let map = new mapboxgl.Map({
      container: "my-map",
      style: mapStyle,
      center: [-77.02, 38.887],
      zoom: 1,
    });
    initializeMap(mapboxgl, map, mapStyle, () => {toggleSideBar();});
    setMap(map);
  }, []);
  useEffect(() => {
      if (pageIsMounted && data) {
        Map.on("load", function () {
          addDataLayer(Map, data);
        });
      }
    }, [pageIsMounted, setMap, data, Map]);

  return (
  //TODO: on start, get browser data to see if login saved. Login user if so, go straight to map
    <div>
      <Head>
        <title>Create Next App</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
          type="text/css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar
        active={sideBarIsActive}
        title="test"
        description="this is a test description"
        onClose={() => alert("Close Sidebar")}
        buttons={[{title: "Button 1", action: () => alert("Button 1")},
                  {title: "Button 2", action: () => alert("Button 2")}]}/>

      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id="my-map" className={styles.mapContainer}/>
        </main>
        <button onClick={toggleMap} className={styles.test}>Switch Map</button>
      </div>
    </div>
  )
}
