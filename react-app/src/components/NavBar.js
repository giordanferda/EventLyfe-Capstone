import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
import logo from "./eventlyfe-logo.png";
const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const sessionUser2 = useSelector((state) => state.session.user);

  let sessionLinks;
  let currentUser;
  const history = useHistory();

  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="session-links flex center">
        <div className="login-btton">
          <button>Login</button>
        </div>
        <div className="signup-button">
          <button>Signup</button>
        </div>
      </div>
    );
  }

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
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>

          {/* <div>
          <NavLink to="/users" exact={true} activeClassName="active">
          Users
          </NavLink>
        </div> */}
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
