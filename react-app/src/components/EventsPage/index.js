import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/event";
import { useParams, useHistory } from "react-router-dom";
import EventCard from "../EventCard";

function EventsPage() {
  const history = useHistory();
  const events = useSelector((state) => Object.values(state.event));
  function redirectToShow(eventId) {
    history.push(`/events/${eventId}`);
  }

  return (
    <div className="Eventpage-container">
      {events.map((event) => (
        <EventCard event={event} redirectToShow={redirectToShow} />
      ))}
    </div>
  );
}

export default EventsPage;
