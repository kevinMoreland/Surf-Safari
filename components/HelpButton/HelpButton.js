import HelpIcon from '@material-ui/icons/Help';

export default function HelpButton(props) {
  return (
    <HelpIcon onClick={props.handleClick} style={{fontSize: 40, color: "white", cursor: "pointer"}} />)
}