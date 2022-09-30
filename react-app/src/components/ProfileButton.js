import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import { Link } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  return (
    <div className="profile-dropdown">
      <div className="profile-button">Profile</div>
      <div className="profile-dropdown-content">
        {/* <Link className='drop-buttons' to='my-events'/> */}
        <Link className="drop-buttons" to="/createEvent">
          Create Event
        </Link>
        <Link
          className="drop-buttons"
          to="/"
          onClick={() => dispatch(sessionActions.logout())}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default ProfileButton;
