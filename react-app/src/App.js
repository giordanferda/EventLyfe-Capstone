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

  return (
    <BrowserRouter>
      <div className="whole-app">
        <NavBar loaded={loaded} />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
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
          <ProtectedRoute path="/createEvent" exact={true}>
            <CreateEvent />
          </ProtectedRoute>
          <ProtectedRoute path="/manageEvents" exact={true}>
            <ManageEvents />
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
