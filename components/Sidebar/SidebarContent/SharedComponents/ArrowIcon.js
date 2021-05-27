export default function ArrowIcon(props) {
  //input will be the degrees direction FROM where swell is coming from, I want where it is going for rotating the arrow,
  //so I flip this input by 180 degrees (exact opposite direction)
  if(props.direction == null) {
    return <></>
  }
  let degreesFrom = props.direction - 180
  return (<img src="/weatherIcons/wi-wind-deg.svg"
            style={{width: "15%",
                    WebkitTransform: "rotate(" + degreesFrom + "deg)",
                    msTransform: "rotate(" + degreesFrom + "deg)",
                    transform: "rotate(" + degreesFrom + "deg)"}}/>)
}