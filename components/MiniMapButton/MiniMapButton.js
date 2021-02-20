import styles from './MiniMapButton.module.css'

export default function MiniMapButton(props) {
  let miniMapStyle = ""
  let miniMapIndex = props.miniMapIndex
  let i = 0
  while(true) {
    console.log("mapstyle: " + props.currentMap)
    console.log("currcheck: " + props.availableMaps[i])
    if(props.currentMap != props.availableMaps[i]) {
      if(miniMapIndex == 0) {
        miniMapStyle = props.availableMaps[i]
        break;
      }
      miniMapIndex -= 1
    }
    i = (i + 1) % props.availableMaps.length
  }
  let imgSrc = miniMapStyle.includes("satellite") ? "/miniMapSatellite.PNG" :
              miniMapStyle.includes("outdoor") ? "/miniMapOutdoor.PNG": "/miniMapSurf.PNG"
  return (
    <img className={styles.miniMap} onClick={() => props.clickAction(miniMapStyle)} src={imgSrc} />)
}