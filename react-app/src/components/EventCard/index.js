import "./EventCard.css";
// import defaultimg from "./defaultimg.png";
import ShowStars from "../ShowStars";

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
      <div className="card-review-data">
        <div className="review-avg-stars">
          <ShowStars rating={event?.avg_rating} />
        </div>
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
