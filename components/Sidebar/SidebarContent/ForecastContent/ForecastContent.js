import styles from '../../Sidebar.module.css'
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import DayCast from './DayCast.js'

export default function ForecastContent(props) {
  return (
      <>
        <DayCast />
        <DayCast />
      </>)
}