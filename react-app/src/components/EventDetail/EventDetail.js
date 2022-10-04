import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteEventById } from "../../store/event";
import EditEventModal from "../EditEvent/EditEventModal";
import CreateReview from "../Reviews/CreateReview/CreateReview";
import ReviewModal from "../Reviews/CreateReview/ReviewModal";
import ReviewCard from "../Reviews/ReviewCard/ReviewCard";
import "./EventDetail.css";
//dummy commit
function EventDetail() {
  const { eventId } = useParams();
  let currentUser;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((state) => state.event[eventId]);
  const reviews = useSelector((state) => state.reviews);
  // const user = useSelector((state) => state.session.user);

  async function handleDelete(e) {
    e.preventDefault();
    await dispatch(deleteEventById(eventId));
    history.push("/events");
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

  return (
    <div className="event-detail-container">
      <div className="event-detail-image">
        <img
          className="event-preview-image"
          src={event?.preview_image}
          alt="event"
        />
      </div>
      <div className="event-info-wrapper">
        <div className="early-access">
          <img
            className="event-img-two"
            src={event?.preview_image}
            alt="event"
          />
          <div className="early-access-right-info">
            <div className="event-detail-name">{event?.name}</div>
          </div>
        </div>
        <div className="ticket-box">
          <ul>
            <li>B1</li>
            <li>heart</li>
          </ul>

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
            <button className="ticket-button">Tickets</button>
          </div>
        </div>
        <div className="event-desc">
          <div className="bigger-desc">
            <div className="event-detail-description">{event?.description}</div>
          </div>
          <div className="smaller-desc">
            <div className="event-detail-location">
              {event?.address} {event?.city}, {event?.state}, {event?.zipcode}
            </div>
            <div className="event-detail-start-end-time">
              {event?.start_time} - {event?.end_time}
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
