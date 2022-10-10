import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/event";
import { Link, useHistory } from "react-router-dom";
import EventCard from "../EventCard";
import "./ManageEvents.css";

const ManageEvents = () => {
  const user = useSelector((state) => state.session.user);
  const events = useSelector((state) => Object.values(state.event));
  const filteredEvents = events.filter(
    (event) => event.event_owner.id === user.id
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(eventActions.getEvents());
  }, [dispatch]);
  function redirectToShow(eventId) {
    history.push(`/events/${eventId}`);
  }
  if (!filteredEvents.length) {
    return (
      <div className="currentEventContainer">
        <h2 className="MyReviewHeader">Manage Events</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          No created events yet! <Link to="/createEvent">Create one here!</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="currentEventContainer">
        <h2 className="MyEventHeader">My Events</h2>
        <div className="my-Event">
          <div className="my-event-inner">
            <div className="review-cards-inner-container">
              {filteredEvents.map((event, i) => (
                <div className="user-review-card">
                  <EventCard
                    event={event}
                    key={i}
                    redirectToShow={redirectToShow}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageEvents;
