import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { InputBase } from '@material-ui/core';
import 'fontsource-roboto';
import { mod, coordinatesAreEqual } from "../../../../functions/Math.js"

import DistanceContentInput from "../DistanceContent/DistanceContentInput.js"

import { useState, useEffect } from "react";
import { Amplify, Auth} from 'aws-amplify';
import { API } from "@aws-amplify/api";


export default function DistanceContent(props) {
  let content = "Select two points..."
  if(props.content.pointsDistance > 0) {
   content = "Distance: "+ props.content.pointsDistance + " miles"
  }
  return (
      <div className={styles.textContent}>
        <Typography variant="body1">{content}</Typography>
      </div>)
}