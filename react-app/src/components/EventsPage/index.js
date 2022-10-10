import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EventCard from "../EventCard";
import "./EventsPage.css";
function EventsPage() {
  const history = useHistory();
  const events = useSelector((state) => Object.values(state.event));
  function redirectToShow(eventId) {
    history.push(`/events/${eventId}`);
  }

  return (
    <div className="Eventpage-container">
      {events.map((event, i) => (
        <EventCard event={event} key={i} redirectToShow={redirectToShow} />
      ))}
    </div>
  );
}

export default EventsPage;
