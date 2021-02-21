import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import Sidebar from "../components/Sidebar/Sidebar.js"
import MiniMapButton from "../components/MiniMapButton/MiniMapButton.js"
import { addDataLayer } from "../map/addDataLayer";
import { initializeMap, changeMapStyle } from "../map/initializeMap";
import { fetcher } from "../utilities/fetcher";
import 'fontsource-roboto';
import contentTypes from '../components/Sidebar/contentTypes.js'

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const satMap = "mapbox://styles/mapbox/satellite-v9";
  const outdoorsMap = "mapbox://styles/mapbox/outdoors-v11";
  const surfMap = "mapbox://styles/mapbox/streets-v11"
  const availableMaps = [satMap, outdoorsMap, surfMap]
  const [mapStyle, setMapStyle] = useState(outdoorsMap);
  const { data, error } = useSWR("/api/testAPI", fetcher);
  const [sideBarIsActive, setSideBarActive] = useState(false);

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'

  function toggleSideBar() {
    setSideBarActive(sideBarIsActive => !sideBarIsActive);
  }
  function toggleMap(newMapStyle) {
    setMapStyle(newMapStyle);
  }
  useEffect(() => {
    if(pageIsMounted){
      changeMapStyle(Map, mapStyle);
    }
  }, [mapStyle])
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
        <link href='/css/weather-icons-wind.css' rel='stylesheet'/>
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
          type="text/css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar
        active={sideBarIsActive}
        title="Ghana Beach Break"
        description="A great spot with a lot of potential. The lefts look better than the rights, but the spot seems all around good. Is currently receiving a large swell, this should hold at least for another week or so."
        onClose={() => setSideBarActive(false)}
        contentType={contentTypes.SPOT_INFO}/>

      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id="my-map" className={styles.mapContainer}/>
        </main>
        <div className={styles.test}>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={0} availableMaps={availableMaps}/>
          <MiniMapButton clickAction={toggleMap} currentMap={mapStyle} miniMapIndex={1} availableMaps={availableMaps}/>
        </div>
      </div>
    </div>
  )
}
