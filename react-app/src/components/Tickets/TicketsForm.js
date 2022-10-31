import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTicketThunk } from "../../store/ticket";
import { errorStyle } from "../../util/styleUtil";
import "./TicketsForm.css";

function TicketsForm({ event, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const eventId = useParams();
  const user = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [csv, setCsv] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState([]);
  console.log("eventId", eventId);
  //   console.log(numEventId, "this is num event");

  useEffect(() => {
    const errors = [];
    if (firstName.length === 0) {
      errors.push("First name is required");
    }
    if (firstName.length > 50) {
      errors.push("First name must be less than 50 characters");
    }
    if (lastName.length === 0) {
      errors.push("Last name is required");
    }
    if (cardNumber.length === 0) {
      errors.push("Card number is required");
    }
    if (csv.length === 0) {
      errors.push("CSV is required");
    }
    if (zipcode.length === 0) {
      errors.push("Zipcode is required");
    }
    setErrors(errors);
  }, [firstName, lastName, cardNumber, csv, zipcode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      card_number: cardNumber,
      csv: csv,
      zip_code: zipcode,
      event_id: eventId.eventId,
      user_id: user.id,
    };
    // console.log(eventId.eventId, user.id);
    const data = await dispatch(createTicketThunk(payload));
    // console.log(data, "this is data");
    if (data && data.errors) {
      setErrors(data);
    } else if (data && !data.errors) {
      history.push(`/events/${eventId}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-event-column">
        <h2>Purchase Tickets</h2>
        <div className="create-event-errors">
          {errors.length > 0 &&
            errors.map((error, i) => (
              <div className="eventErrors">
                <div key={i + 0} className="eventError">
                  {error.split(": ")[1]}
                </div>
              </div>
            ))}
        </div>
        <div className="event-first-container-description">
          <label>First Name</label>
          <input
            className="event-first-container-input"
            placeholder="First Name"
            value={firstName}
            required
            type="text"
            style={errorStyle(errors, "firstName")}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="event-first-container-description">
          <label>Last Name</label>
          <input
            className="event-first-container-input"
            placeholder="Last Name"
            value={lastName}
            required
            type="text"
            style={errorStyle(errors, "lastName")}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="event-first-container-description">
          <label>Card Number</label>
          <input
            className="event-first-container-input"
            placeholder="Card Number"
            value={cardNumber}
            required
            type="text"
            style={errorStyle(errors, "cardNumber")}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="event-first-container-description">
          <label>Csv</label>
          <input
            className="event-first-container-input"
            placeholder="Csv"
            value={csv}
            required
            type="text"
            style={errorStyle(errors, "csv")}
            onChange={(e) => setCsv(e.target.value)}
          />
        </div>
        <div className="event-first-container-description">
          <label>Zipcode</label>
          <input
            className="event-first-container-input"
            placeholder="Zipcode"
            value={zipcode}
            required
            type="text"
            style={errorStyle(errors, "zipcode")}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        <button disabled={errors.length > 0} className="submitEvent">
          Purchase Tickets
        </button>
      </form>
    </div>
  );
}

export default TicketsForm;
