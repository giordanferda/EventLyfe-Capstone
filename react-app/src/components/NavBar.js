import React from "react";
import { NavLink, Link } from "react-router-dom";
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
        <div className="navbar-links">
          <div>
            <NavLink to="/createEvent" exact={true} activeClassName="active">
              <button className="create-event-button">Create Event</button>
            </NavLink>
            {/* <Link to="/createEvent">
              <div className="link-to-create-event"></div>
              <i class="fa-solid fa-plus"></i>
              <button>Create Event</button> */}
            {/* </Link> */}
          </div>
          {currentUser ? (
            <ProfileButton user={currentUser} />
          ) : (
            <NavLink to="/login" exact={true} activeClassName="active">
              <button className="login-button">Log In</button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
