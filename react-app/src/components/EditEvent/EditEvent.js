import { useState, useEffect, useMemo } from "react";
import { cityAndStates } from "../states";
import { updateEvent, getEventById } from "../../store/event";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { errorStyle } from "../../util/styleUtil";
import {
  startsBefore,
  getCurrentDate,
  isAfterOrOn,
} from "../../util/datesUtil";
import "./EditEvent.css";
function EditEventForm({ closeModal }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.event[parseInt(eventId)]);
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [address, setAddress] = useState(event.address);
  const [ticket_quantity, setTicketQuantity] = useState(event.ticket_quantity);
  const [state, setState] = useState(event.state);
  const [city, setCity] = useState(event.city);
  const [zipcode, setZipcode] = useState(event.zipcode);
  const [event_starts, setEventStarts] = useState(event.event_starts);
  const [event_ends, setEventEnds] = useState(event.event_ends);
  const [start_time, setStartTime] = useState(event.start_time);
  const [end_time, setEndTime] = useState(event.end_time);
  const [previewUrl, setPreviewUrl] = useState(event.preview_image);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  if (event && !loaded) {
    setLoaded(true);
  } else if (!event && !loaded) {
    dispatch(getEventById(eventId)).then(() => setLoaded(true));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const eventData = {
      id: eventId,
      owner_id: user.id,
      name,
      description,
      address,
      ticket_quantity,
      state,
      city,
      zipcode: zipcode,
      event_starts: event_starts,
      event_ends: event_ends,
      start_time: start_time,
      end_time: end_time,
      preview_image: previewUrl,
    };

    dispatch(updateEvent(eventData));
    closeModal();
  };

  useEffect(() => {
    const imageUrlValid = /\.(jpeg|jpg|png)$/;
    const errors = [];

    if (!previewUrl.match(imageUrlValid)) {
      errors.push(
        "preview_url: Preview url must end in valid img extension [png/jpg/jpeg]"
      );
    }
    if (name.length > 40) {
      errors.push("name: Name must be less than 40 characters");
    }
    if (name.length < 3) {
      errors.push("name: Name must be more than 3 characters");
    }
    if (description.length > 350) {
      errors.push("description: Description must be less than 350 characters");
    }
    if (description.length < 10) {
      errors.push("description: Description must be more than 10 characters");
    }
    if (address.length > 75) {
      errors.push("address: Address must be less than 75 characters");
    }
    if (address.length < 5) {
      errors.push("address: Address must be more than 5 characters");
    }
    if (ticket_quantity < 1) {
      errors.push("ticket_quantity: Ticket quantity must be more than 0");
    }
    if (ticket_quantity > 2500) {
      errors.push("ticket_quantity: Ticket quantity must be less than 2500");
    }
    if (JSON.stringify(zipcode).length !== 5) {
      errors.push("zipcode: Zipcode must be 5 digits");
    }
    if (
      JSON.stringify(zipcode).match(/^[a-zA-Z0-9!@#$%^&()_+-=[]{};':"\|,.<>/)
    ) {
      errors.push("zipcode: Zipcode must be a number");
    }
    if (event_starts.length < 1) {
      errors.push("event_starts: Event start date must be filled out");
    }
    if (event_ends.length < 1) {
      errors.push("event_ends: Event end date must be filled out");
    }
    if (startsBefore(event_starts, getCurrentDate()) === false) {
      errors.push("event_starts: Event start date must be in the future");
    }
    if (start_time.length < 1) {
      errors.push("start_time: Event start time must be filled out");
    }
    if (end_time.length < 1) {
      errors.push("end_time: Event end time must be filled out");
    }
    if (end_time <= start_time) {
      const start = new Date(event_starts);
      const end = new Date(event_ends);
      if (start.getTime() === end.getTime()) {
        errors.push("end_time: Event end time must be after start time");
      }
    }
    if (isAfterOrOn(event_starts, event_ends) === false) {
      errors.push(
        "event_ends: Event end date must be after or on event start date"
      );
    }
    if (cityAndStates[city] !== state) {
      errors.push("city: City must be in the selected state");
    }

    setErrors(errors);
  }, [
    previewUrl,
    name,
    description,
    address,
    event_starts,
    event_ends,
    start_time,
    end_time,
    zipcode,
    ticket_quantity,
    state,
    city,
  ]);

  const CITIES = useMemo(() => {
    const dictionary = cityAndStates;
    let dictionaryEntries = Object.entries(dictionary);
    dictionaryEntries = dictionaryEntries.filter((entry) => entry[1] === state);
    return dictionaryEntries.map((entry) => entry[0]);
  }, [state]);
  const STATES = useMemo(() => {
    return [...new Set(Object.values(cityAndStates))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  return (
    <div className="edit-content-container">
      <form onSubmit={handleSubmit}>
        <h2 className="EditEventTitle">Edit Your Event</h2>
        <div className="create-event-errors">
          {errors.length > 0 &&
            errors.map((error, i) => (
              <div className="eventErrors">
                <div key={i} className="eventError">
                  {error.split(": ")[1]}
                </div>
              </div>
            ))}
        </div>
        <div className="event-first-container">
          <h3 className="eventh1 margin-edit">
            {" "}
            <i class="fa-regular fa-file-lines"></i> Basic Info
          </h3>
          <div className="event-first-container-description">
            <label>Event Name</label>
            <input
              className="edit-event-input"
              placeholder="Name"
              value={name}
              required
              type="text"
              style={errorStyle(errors, "name")}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="event-first-container-description">
            <label>Description</label>
            <input
              className="edit-event-input"
              placeholder="Description"
              required
              value={description}
              type="text"
              style={errorStyle(errors, "description")}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            <div className="create-event-image">
              <label>Add Image For Event </label>
              <label htmlFor="previewUrl" />
              <input
                type="url"
                name="previewUrl"
                value={previewUrl}
                className="edit-event-input"
                placeholder="Preview Image URL"
                style={errorStyle(errors, "preview_url")}
                onChange={(e) => setPreviewUrl(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="event-first-container">
            <h3 className="eventh1 margin-edit">
              <i class="fa-solid fa-calendar-days"></i> Location & Event
              Date/Time
            </h3>
            <label>Address</label>
            <input
              className="edit-event-input"
              placeholder="Address"
              required
              value={address}
              type="text"
              style={errorStyle(errors, "address")}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          {/* <div>
        <label>Ticket quantity</label>
        <input
        className="edit-event-Ticket-quantity"
        placeholder="Ticket Quantity"
        required
        value={ticket_quantity}
        type="number"
        onChange={(e) => setTicketQuantity(e.target.value)}
        ></input>
      </div> */}
          <div className="event-first-container-description edit-event-input">
            <label>State</label>
            <select
              value={state}
              style={errorStyle(errors, "state")}
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="create-event-city-zip">
            <div className="event-first-container-description">
              <label>City</label>
              <select
                style={errorStyle(errors, "city")}
                onChange={(e) => {
                  const city = e.target.value;
                  setCity(city);
                  setState(cityAndStates[city]);
                }}
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="event-first-container-description">
              <label>Zip Code</label>
              <input
                className="edit-event-zipcode"
                placeholder="Zip Code"
                required
                value={zipcode}
                type="number"
                style={errorStyle(errors, "zipcode")}
                onChange={(e) => setZipcode(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="event-first-container">
          <div className="create-event-city-zip">
            <div className="event-first-container-description">
              <label>Event Starts</label>
              <input
                className="edit-event-input"
                placeholder="Event Starts"
                required
                value={event_starts}
                type="date"
                style={errorStyle(errors, "event_starts")}
                onChange={(e) => setEventStarts(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="event-first-container-description">
            <label>Event Ends</label>
            <input
              className="edit-event-input"
              placeholder="Event Ends"
              required
              value={event_ends}
              type="date"
              style={errorStyle(errors, "event_ends")}
              onChange={(e) => setEventEnds(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="create-event-city-zip">
          <div className="event-first-container-description">
            <label>Start Time</label>
            <input
              className="edit-event-input"
              placeholder="Start Time"
              required
              value={start_time}
              type="time"
              style={errorStyle(errors, "start_time")}
              onChange={(e) => setStartTime(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="event-first-container-description">
          <label>End Time</label>
          <input
            className="edit-event-input"
            placeholder="End Time"
            required
            value={end_time}
            type="time"
            style={errorStyle(errors, "end_time")}
            onChange={(e) => setEndTime(e.target.value)}
          ></input>
        </div>
        <button className="editButton" disabled={errors.length > 0}>
          Edit Your Event
        </button>
      </form>
    </div>
  );
}

export default EditEventForm;
