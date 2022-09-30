import "./EventCard.css";
// import defaultimg from "./defaultimg.png";

function EventCard({ redirectToShow, event }) {
  return (
    <div className="event-card" to={`/events/${event?.id}`}>
      <div className="event-card-outer">
        <div onClick={() => redirectToShow(event?.id)}>
          <img
            src={event.preview_image}
            alt="event"
            // onError={(e) => (e.target.src = defaultimg)}
          />
        </div>
      </div>
      <div>
        <div className="event-card-name" to={`/events/${event.id}`}>
          {event.name}
        </div>
      </div>
      <div className="event-location">
        {event.address} {event.city}, {event.state}, {event.zipcode}
      </div>
      <div className="start-end-time">
        {event.start_time} - {event.end_time}
      </div>
      <div className="card-description">{event.description}</div>
    </div>
  );
}

export default EventCard;
