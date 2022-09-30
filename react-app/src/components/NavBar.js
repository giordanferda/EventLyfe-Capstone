import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
import logo from "./eventlyfe-logo.png";

const NavBar = ({ loaded }) => {
  const sessionUser2 = useSelector((state) => state.session.user);

  let currentUser;

  if (sessionUser2) currentUser = true;
  else currentUser = false;

  return (
    <nav>
      <div className="navbar-container">
        <div className="eventlyfe-button">
          <NavLink
            to="/"
            className="eventlyfe-logo"
            exact={true}
            activeClassName="active"
          >
            <img className="logo-img" alt="" src={logo} />
          </NavLink>
        </div>
        {currentUser ? (
          <ProfileButton user={currentUser} />
        ) : (
          <NavLink to="/login" exact={true} activeClassName="active">
            <button>Log In</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
