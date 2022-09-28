import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import { useHistory, useLocation } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="hamburger">
      <button onClick={openMenu} className="nav-button">
        <i className="fa-solid fa-bars profile-bars fa-lg"></i>
        <i className="fas fa-user-circle fa-2xl" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li
            onClick={() => {
              if (location.pathname === "/my-events") {
                return;
              }
              history.push("/my-events");
            }}
          >
            Manage My Events
          </li>
          {/* <li
            onClick={() => {
              if (location.pathname === "/bookmarks") {
                return;
              }
              history.push("/bookmarks");
            }}
          >
            My Bookmarks
          </li> */}
          <li>
            <button className="profile-logout-button" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
