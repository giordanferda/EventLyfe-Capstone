import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
import logo from "./eventlyfe-logo.png";
import { restrictedNavbarPathnames } from "../util/data";
import { searchEvents } from "../store/queried_event";

const NavBar = ({ loaded }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const sessionUser2 = useSelector((state) => state.session.user);
  const [search, setSearch] = useState("");
  let currentUser;

  if (sessionUser2) currentUser = true;
  else currentUser = false;
  if (restrictedNavbarPathnames[location.pathname] === true) {
    return null;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchEvents(search));
    const url = `/search?name=${search}`;
    setSearch("");
    history.push(url);
  };
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
        <div className="search-bar flex">
          <input
            className="search-input"
            type="text"
            placeholder="Search Events"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          ></input>
          <button className="search-button spacing" onClick={handleSearch}>
            <svg width="24" height="24" class="icon_svg">
              <path d="M21.853 20.355l-3.444-3.443a9.428 9.428 0 10-16.761-6.171 9.428 9.428 0 0015.348 7.586l3.443 3.442a1 1 0 101.414-1.414zM5.82 16.245a7.429 7.429 0 115.253 2.175 7.38 7.38 0 01-5.253-2.176z"></path>
            </svg>
            {/* <i class="fa-duotone fa-magnifying-glass"></i> */}
          </button>
        </div>
        <div className="navbar-links">
          {location.pathname !== "/about" && (
            <button
              onClick={() => {
                history.push("/about");
              }}
            >
              About Me
            </button>
          )}
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
