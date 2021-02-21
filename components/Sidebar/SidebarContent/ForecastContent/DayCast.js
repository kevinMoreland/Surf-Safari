import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import 'fontsource-roboto';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { loadCSS } from 'fg-loadcss';
import ArrowIcon from './ArrowIcon.js';

export default function DayCast(props) {

  return (
      <Paper elevation={2} square={true} style={{marginTop: "5px"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <div style={{width: "50%", verticalAlign: "center", textAlign: "center"}}>
            <img src="/weatherIcons/wi-cloudy.svg" style={{width: "75%", marginBottom: "-2vw"}}/>
            <Typography variant="h5">60°F/85°F</Typography>
            <Typography variant="body1">Mostly Cloudy</Typography>

          </div>
          <div style={{width: "50%"}}>
            <Typography variant="body1">Swells:</Typography>
            <div style={{display:"flex"}}>
              <Typography variant="body1">3.1ft 15s 187°</Typography>
              <ArrowIcon direction={187} />
            </div>
            <div style={{display:"flex"}}>
              <Typography variant="body1">1.8ft 11s 260°</Typography>
              <ArrowIcon direction={260} />
            </div>
            <div style={{display:"flex"}}>
              <Typography variant="body1">2.1ft 9s 268°</Typography>
              <ArrowIcon direction={268} />
            </div>
          </div>
        </div>
      </Paper>)
}