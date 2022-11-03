import "./EventCard.css";
import defaultImage from "../defaultImage.jpg";
import { formatDate, convertMilitaryTime } from "../../util/datesUtil";
import { getEvents } from "../../store/event";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import defaultimg from "./defaultimg.png";

function EventCard({ redirectToShow, event }) {
  // if (!event) return null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  console.log(event, "this is event");

  const events = useSelector((state) => state.event);
  console.log("this is events", events);
  const currEvent = events[event.event_id || event.id];
  console.log(currEvent, "THIS IS CURR EVENT");
  return (
    <div
      className="event-card"
      to={`/events/${currEvent?.id}`}
      onClick={() => redirectToShow(currEvent?.id)}
    >
      <img
        className="event-card-image"
        src={currEvent?.preview_image}
        onError={(e) => (e.target.src = defaultImage)}
        alt="Failed to load asset"
      />
      <div className="event-card-name" to={`/events/${event.id}`}>
        {currEvent?.name}
      </div>
      <div className="event-location">
        <i class="fa-solid fa-location-dot"></i> {currEvent?.address}{" "}
        {currEvent?.city}, {currEvent?.state}, {currEvent?.zipcode}
      </div>
      <div className="date-event">
        <i class="fa-regular fa-calendar-days"></i>{" "}
        {formatDate(currEvent?.event_starts?.split("-"))} -{" "}
        {formatDate(currEvent?.event_ends?.split("-"))}
      </div>
      <div className="start-end-time">
        <i class="fa-regular fa-clock"></i>{" "}
        {convertMilitaryTime(currEvent?.start_time)} -{" "}
        {convertMilitaryTime(currEvent?.end_time)}
      </div>
      {/* <div className="card-description">{currEvent?.description}</div> */}
      <div className="card-review-data">
        <div className="review-count">
          <i class="fa-regular fa-comments"></i>{" "}
          {currEvent?.review_ids?.length === 1 ? (
            <div className="review-length">
              {currEvent?.review_ids?.length} review
            </div>
          ) : (
            <div className="review-length">
              {currEvent?.review_ids?.length} reviews
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
