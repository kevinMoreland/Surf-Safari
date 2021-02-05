import Head from 'next/head'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5tb3JlbGFuZCIsImEiOiJja2hyMWRwczMwcWRqMnNvMnRldzFjYmtzIn0.5zO1V-Zr91Rsq_1dSHFYVg'

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-77.02, 38.887],
      zoom: 1,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.flexContainer}>
        <div id="my-map" className={styles.fillingDiv}/>
      </main>
    </div>
  )
}
