import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { deleteEventById } from "../../store/event";
import { formatDate } from "../../util/datesUtil";
import EditEventModal from "../EditEvent/EditEventModal";
import CreateReview from "../Reviews/CreateReview/CreateReview";
import ReviewModal from "../Reviews/CreateReview/ReviewModal";
import ReviewCard from "../Reviews/ReviewCard/ReviewCard";
import defaultImage from "../defaultImage.jpg";
import "./EventDetail.css";
//dummy commit pt 2 reseeding
function EventDetail() {
  const { eventId } = useParams();
  let currentUser;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((state) => state.event[eventId]);
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.session.user);

  async function handleDelete(e) {
    e.preventDefault();
    await dispatch(deleteEventById(eventId));
    // history.push("/events");
  }

  const alreadyReviewed = () => {
    let alreadyReviewedByUser = false;
    if (!event?.review_ids) return;
    for (let i of event?.review_ids) {
      if (reviews[i]?.user_id === sessionUser.id) {
        alreadyReviewedByUser = true;
      }
    }
    return alreadyReviewedByUser;
  };

  // function alreadyReviewed() {
  //   let alreadyReviewedByUser = false;
  //   for (let i = 1; i < event?.review_ids.length; i++) {
  //     if (event.review_ids[i] === sessionUser.id) {
  //       alreadyReviewedByUser = true;
  //     }
  //   }
  //   return alreadyReviewedByUser;
  // }

  if (sessionUser && event) {
    if (sessionUser.id === event.event_owner.id) {
      currentUser = true;
    } else currentUser = false;
  }
  if (!event) {
    return <Redirect to="/events" />;
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-image">
        <img
          className="event-preview-image"
          src={event?.preview_image}
          onError={(e) => (e.target.src = defaultImage)}
        />
      </div>
      <div className="event-info-wrapper">
        <div className="early-access">
          <img
            className="event-img-two"
            src={event?.preview_image}
            onError={(e) => (e.target.src = defaultImage)}
          />
          <div className="early-access-right-info">
            <h2 className="event-detail-name">{event?.name}</h2>
            <h4 className="hosted-by">
              Hosted By: {user?.firstname} {user?.lastname}
            </h4>
          </div>
        </div>
        <div className="ticket-box">
          {/* <ul>
            <li>B1</li>
            <li>heart</li>
          </ul> */}

          <div className="ticketbox-buttons">
            {sessionUser &&
              sessionUser.id !== event?.event_owner.id &&
              alreadyReviewed() === false && (
                <div>
                  <ReviewModal event={event} />
                </div>
              )}

            {currentUser && <EditEventModal />}
            {currentUser && (
              <button className="delete-event" onClick={handleDelete}>
                Delete Event
              </button>
            )}
            {/* <button className="ticket-button">Tickets</button> */}
          </div>
        </div>
        <div className="event-desc">
          <div className="bigger-desc">
            <div className="event-detail-description">
              <h4>
                <i class="fa-sharp fa-solid fa-circle-info"></i> About this
                event
              </h4>
              {event?.description}
            </div>
          </div>
          <div className="smaller-desc">
            <div className="event-detail-location">
              <h5>
                <i class="fa-solid fa-location-dot"></i> Location
              </h5>
              {event?.address} {event?.city}, {event?.state}, {event?.zipcode}
            </div>
            <h5>
              {" "}
              <i class="fa-regular fa-calendar-days"></i> Date & Time
            </h5>
            <div className="event-detail-start-end-time">
              <div className="date-event">
                {formatDate(event.event_starts.split("-"))} -{" "}
                {formatDate(event.event_ends.split("-"))}
              </div>
              <div>
                {event?.start_time} - {event?.end_time}
              </div>
            </div>
          </div>
        </div>
        <div className="event-reviews-container">
          {/* Show every Review Card Here */}
          <div className="reviews-header header">Reviews</div>
          <div className="reviews-inner-container">
            {event?.review_ids.length ? (
              event?.review_ids.map((reviewId) => (
                <ReviewCard key={reviewId} review={reviews[reviewId]} />
              ))
            ) : (
              <div style={{ paddingBottom: "25px" }}>No reviews. Yet...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
