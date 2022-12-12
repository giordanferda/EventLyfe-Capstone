import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Splash from "./components/Splashpage/Splash";
import EventsPage from "./components/EventsPage";
import { getEvents } from "./store/event";
import EventDetail from "./components/EventDetail/EventDetail";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import "./index.css";
import ManageEvents from "./components/ManageEvents/ManageEvents";
import * as reviewActions from "./store/review";
import AboutMe from "./components/AboutMe/AboutMe";
import BrokenLink from "./components/404Page.js/404Page";
import ManageTickets from "./components/ManageTickets/ManageTickets";
import SearchPage from "./components/SearchPage/SearchPage";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getEvents());
      setLoaded(true);
    })();
  }, [dispatch]);
  useEffect(() => {
    dispatch(reviewActions.getReviews());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  // dummy commit 

  return (
    <BrowserRouter>
      <div className="whole-app">
        <NavBar loaded={loaded} />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/" exact={true}>
            <Splash />
          </Route>
          <Route path="/events" exact={true}>
            <EventsPage />
          </Route>
          <Route path="/events/:eventId" exact={true}>
            <EventDetail />
          </Route>
          <Route path="/about" exact={true}>
            <AboutMe />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <ProtectedRoute path="/createEvent" exact={true}>
            <CreateEvent />
          </ProtectedRoute>
          <ProtectedRoute path="/manageEvents" exact={true}>
            <ManageEvents />
          </ProtectedRoute>
          <ProtectedRoute path="/manageTickets" exact={true}>
            <ManageTickets />
          </ProtectedRoute>
          <Route>
            <BrokenLink />
          </Route>
        </Switch>
        {/* <Footer loaded={loaded} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
