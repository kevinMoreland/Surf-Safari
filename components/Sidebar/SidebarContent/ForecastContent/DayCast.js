import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import 'fontsource-roboto';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { loadCSS } from 'fg-loadcss';

export default function DayCast(props) {

  return (
      <Paper elevation={2} square={true} style={{marginTop: "5px"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <div style={{width: "50%", verticalAlign: "center", textAlign: "center"}}>
            <img src={"http://openweathermap.org/img/wn/" + props.weather.icon +"@2x.png"} style={{width: "75%", marginBottom: "-2vw"}}/>
            <Typography variant="body1">{props.weather.weatherDesc}</Typography>

          </div>
          <div style={{width: "50%"}}>
            <Typography variant="h5">High: {props.weather.lo}°C</Typography>
            <Typography variant="h5">Low: {props.weather.hi}°C</Typography>
          </div>

        </div>
      </Paper>)
}