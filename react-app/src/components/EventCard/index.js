import "./EventCard.css";
import defaultImage from "../defaultImage.jpg";

// import defaultimg from "./defaultimg.png";

function EventCard({ redirectToShow, event }) {
  function redirectToShow() {
    window.location.href = `/events/${event.id}`;
  }

  return (
    <div className="event-card" to={`/events/${event?.id}`}>
      <div className="event-card-outer">
        <div onClick={() => redirectToShow(event?.id)}>
          <img
            className="event-card-image"
            src={event.preview_image}
            onError={(e) => (e.target.src = defaultImage)}
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
      <div className="card-review-data">
        <div className="review-count">
          {event?.review_ids.length == 1 ? (
            <div>{event?.review_ids.length} review</div>
          ) : (
            <div>{event?.review_ids.length} reviews</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
