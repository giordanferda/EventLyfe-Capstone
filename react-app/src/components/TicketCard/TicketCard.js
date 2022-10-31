import "./TicketCard.css";
import defaultImage from "../defaultImage.jpg";
import { formatDate, convertMilitaryTime } from "../../util/datesUtil";

function TicketCard({ event, redirectToShow }) {
  return (
    <div
      className="event-card"
      to={`/events/${event?.id}`}
      onClick={() => redirectToShow(event?.id)}
    >
      <img
        className="event-card-image"
        src={event.preview_image}
        onError={(e) => (e.target.src = defaultImage)}
        alt="Failed to load asset"
      />
      <div className="event-card-name" to={`/events/${event.id}`}>
        {event.name}
      </div>
      <div className="event-location">
        <i class="fa-solid fa-location-dot"></i> {event.address} {event.city},{" "}
        {event.state}, {event.zipcode}
      </div>
      <div className="date-event">
        <i class="fa-regular fa-calendar-days"></i>{" "}
        {formatDate(event.event_starts.split("-"))} -{" "}
        {formatDate(event.event_ends.split("-"))}
      </div>
      <div className="start-end-time">
        <i class="fa-regular fa-clock"></i>{" "}
        {convertMilitaryTime(event.start_time)} -{" "}
        {convertMilitaryTime(event.end_time)}
      </div>
      <div className="card-review-data">
        <div className="review-count">
          <i class="fa-regular fa-comments"></i>{" "}
          {event?.review_ids.length === 1 ? (
            <div className="review-length">
              {event?.review_ids.length} review
            </div>
          ) : (
            <div className="review-length">
              {event?.review_ids.length} reviews
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
