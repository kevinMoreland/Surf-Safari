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

  //hook for displaying the correct map. TODO replace surfMap with my perosonalized map
  const [Map, setMap] = useState();
  const satMap = "mapbox://styles/mapbox/satellite-v9";
  const outdoorsMap = "mapbox://styles/mapbox/outdoors-v11";
  const surfMap = "mapbox://styles/mapbox/streets-v11"
  const availableMaps = [satMap, outdoorsMap, surfMap]
  const [mapStyle, setMapStyle] = useState(outdoorsMap);

  //TODO Probably will delete this later, use as example for now
  const { data, error } = useSWR("/api/testAPI", fetcher);

  //hook for sidebar info
  const [sideBarInfo, setSideBarInfo] = useState({title: "", description: "", contentType: "", isActive: false});

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'

  function toggleMap(newMapStyle) {
    setMapStyle(newMapStyle);
  }

  useEffect(() => {
    console.log(sideBarInfo)
  }, [sideBarInfo])
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
    initializeMap(mapboxgl, map, mapStyle, (a, b, c, d) => setSideBarInfo({title: a, description: b, contentType: c, isActive: d}));
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
        active={sideBarInfo.isActive}
        title={sideBarInfo.title}
        description={sideBarInfo.description}
        onClose={() => setSideBarInfo({title: "", description: "", contentType: sideBarInfo.contentType, isActive: false})}
        contentType={sideBarInfo.contentType}/>

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
