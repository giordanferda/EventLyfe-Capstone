import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { deleteEventById } from "../../store/event";
import { formatDate, convertMilitaryTime } from "../../util/datesUtil";
import EditEventModal from "../EditEvent/EditEventModal";
import ReviewModal from "../Reviews/CreateReview/ReviewModal";
import ReviewCard from "../Reviews/ReviewCard/ReviewCard";
import defaultImage from "../defaultImage.jpg";
import { MONTHS } from "../../util/datesUtil";
import TicketsForm from "../Tickets/TicketsForm";
import { Modal } from "../../context/Modal";
import "./EventDetail.css";
//dummy commit pt 2 reseeding
function EventDetail() {
  const { eventId } = useParams();
  let currentUser;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event[eventId]);
  const reviews = useSelector((state) => state.reviews);
  const [showModal, setShowModal] = useState(false);
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

  const renderEventStartColumn = (date) => {
    const dateArray = date.split("-");
    const month = MONTHS[dateArray[1]].slice(0, 3);
    const day = dateArray[2];
    return (
      <>
        <div>{month}</div>
        <div>{day}</div>
      </>
    );
  };

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
          alt="Failed to load asset"
          className="event-preview-image"
          src={event?.preview_image}
          onError={(e) => (e.target.src = defaultImage)}
        />
      </div>
      <div className="event-info-wrapper">
        <div className="early-access">
          <img
            alt="Failed to load asset"
            className="event-img-two"
            src={event?.preview_image}
            onError={(e) => (e.target.src = defaultImage)}
          />
          <div className="early-access-right-info">
            <div className="event-date-column">
              {renderEventStartColumn(event?.event_starts)}
            </div>
            <h2 className="event-detail-name">{event?.name}</h2>
            <div className="early-access-text">Early Access</div>
            <h4 className="hosted-by">
              Hosted By: {event?.event_owner.firstname}{" "}
              {event?.event_owner.lastname}
            </h4>
          </div>
        </div>
        <div className="ticket-box">
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
            <>
              <button
                className="tickets-btn-on-reg-pg"
                onClick={() => setShowModal(true)}
              >
                Tickets
              </button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <TicketsForm />
                </Modal>
              )}
            </>
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
                {convertMilitaryTime(event?.start_time)} -{" "}
                {convertMilitaryTime(event?.end_time)}
              </div>
            </div>
          </div>
        </div>
        <div className="event-reviews-container">
          {/* Show every Review Card Here */}
          <div className="reviews-header header">
            <span>
              <i class="fa-solid fa-comment"></i> Reviews
            </span>{" "}
            {event?.review_ids.length}{" "}
            {event?.review_ids.length !== 1 ? "Reviews" : "Review"}
          </div>
          <div className="reviews-inner-container">
            {event?.review_ids.length ? (
              event?.review_ids.map((reviewId, i) => {
                const border = i === event?.review_ids.length - 1;
                return (
                  <ReviewCard
                    key={reviewId}
                    review={reviews[reviewId]}
                    border={border}
                  />
                );
              })
            ) : (
              <div className="no-reviews" style={{ paddingBottom: "25px" }}>
                No reviews yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
