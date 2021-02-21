import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//TODO pass in a prop so I know if this user is logged in or not yet
export default function ProfileButton(props) {
  return (
    <AccountCircleIcon onClick={props.handleClick} style={{fontSize: 40, color: "white", cursor: "pointer"}} />)
}