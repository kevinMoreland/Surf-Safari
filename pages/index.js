import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import { addDataLayer } from "../map/addDataLayer";
import { initializeMap } from "../map/initializeMap";
import { fetcher } from "../utilities/fetcher";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");


export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const satMap = "mapbox://styles/mapbox/satellite-v9";
  const outdoorsMap = "mapbox://styles/mapbox/outdoors-v11";
  const [mapStyle, setMapStyle] = useState(outdoorsMap);
  const { data, error } = useSWR("/api/testAPI", fetcher);

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'

  useEffect(() => {
    setPageIsMounted(true);
    let map = new mapboxgl.Map({
      container: "my-map",
      style: mapStyle,
      center: [-77.02, 38.887],
      zoom: 1,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    initializeMap(mapboxgl, map, mapStyle);
    setMap(map);
  }, []);
  useEffect(() => {
      if (pageIsMounted && data) {
        Map.on("load", function () {
          addDataLayer(Map, data);
        });
      }
    }, [pageIsMounted, setMap, data, Map]);

  function toggleMap() {
    if(mapStyle == satMap) {
      setMapStyle(outdoorsMap);
    }
    else if(mapStyle == outdoorsMap) {
      setMapStyle(satMap);
    }
    initializeMap(mapboxgl, Map, mapStyle);
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.overlapContainer}>
        <main className={styles.flexContainer}>
          <div id="my-map" className={styles.mapContainer}/>
        </main>
        <button onClick={toggleMap} className={styles.test}>Switch Map</button>
      </div>
    </div>
  )
}
