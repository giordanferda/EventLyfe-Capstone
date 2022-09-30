import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

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
