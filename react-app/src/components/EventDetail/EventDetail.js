import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

//dummy commit
function EventDetail() {
  const { eventId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event[eventId]);
  // const user = useSelector((state) => state.session.user);
  console.log(eventId);
  return (
    <div className="event-detail-container">
      <div className="event-detail-image">
        <img src={event?.preview_image} alt="event" />
      </div>
      <div className="event-detail-name">{event?.name}</div>
      <div className="event-detail-location">
        {event?.address} {event?.city}, {event?.state}, {event?.zipcode}
      </div>
      <div className="event-detail-start-end-time">
        {event?.start_time} - {event?.end_time}
      </div>
      <div className="event-detail-description">{event?.description}</div>
    </div>
  );
}

export default EventDetail;
