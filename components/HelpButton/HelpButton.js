import HelpIcon from '@material-ui/icons/Help';

export default function ProfileButton(props) {
  return (
    <HelpIcon onClick={props.handleClick} style={{fontSize: 40, color: "white", cursor: "pointer"}} />)
}