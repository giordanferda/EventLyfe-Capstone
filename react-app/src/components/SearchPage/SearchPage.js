import { useLocation, useHistory } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import "./SearchPage.css";
import EventCard from "../EventCard";

function SearchPage({ redirectToShow }) {
  const history = useHistory();
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("name");
  const events = useSelector((state) => Object.values(state.queried_events));
  console.log(events, "this is events");
  function redirectToShow(eventId) {
    history.push(`/events/${eventId}`);
  }

  return (
    <div className="main-search-container">
      <div className="search-header">
        {events.length} results found for event name:{" "}
        <div id="query">{query}</div>
      </div>
      <div className="Eventpage-container">
        {events.map((event) => (
          <EventCard
            key={event?.id}
            event={event}
            redirectToShow={redirectToShow}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
