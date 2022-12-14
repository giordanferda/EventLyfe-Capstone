import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cityAndStates } from "../states";
import { createEvent } from "../../store/event";
import {
  startsBefore,
  getCurrentDate,
  isAfterOrOn,
} from "../../util/datesUtil";
import { errorStyle } from "../../util/styleUtil";
import "./CreateEvent.css";

function CreateEvent() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [ticket_quantity] = useState(300);
  const [state, setState] = useState("Alabama");
  const [city, setCity] = useState("Prattville");
  const [zipcode, setZipcode] = useState("");
  const [event_starts, setEventStarts] = useState(getCurrentDate());
  const [event_ends, setEventEnds] = useState(getCurrentDate());
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const eventData = {
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

    const newEvent = await dispatch(createEvent(eventData));
    if (newEvent && newEvent.errors) {
      setErrors(newEvent.errors);
    } else if (newEvent && !newEvent.errors) {
      history.push(`/events/${newEvent.id}`);
    }
  };
  useEffect(() => {
    const imageUrlValid = /\.(jpeg|jpg|png)$/;
    const errors = [];

    if (!previewUrl.match(imageUrlValid)) {
      errors.push(
        "preview_url: Preview image url must end in valid img extension [png/jpg/jpeg]"
      );
    }
    if (name.length > 35) {
      errors.push("name: Event Name must be less than 35 characters");
    }
    if (name.length < 3) {
      errors.push("name: Event Name must be more than 3 characters");
    }
    if (description.length > 350) {
      errors.push("description: Description must be less than 350 characters");
    }
    if (description.length < 10) {
      errors.push("description: Description must be more than 10 characters");
    }
    if (address.length > 50) {
      errors.push("address: Address must be less than 50 characters");
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
    if (zipcode.length !== 5) {
      errors.push("zipcode: Zipcode must be 5 digits");
    }
    if (zipcode.match(/^[a-zA-Z0-9!@#$%^&()_+-=[]{};':"\|,.<>/)) {
      errors.push("zipcode: Zipcode must be a number");
    }
    if (event_starts.length < 1) {
      errors.push("event_starts: Event start date must be filled out");
    }
    if (event_ends.length < 1) {
      errors.push("event_ends: Event end date must be filled out");
    }
    if (startsBefore(event_starts, getCurrentDate()) === false) {
      errors.push(
        "event_starts: Event start date must be in the present or future."
      );
    }
    if (startsBefore(event_ends, getCurrentDate()) === false) {
      errors.push(
        "event_ends: Event end date must be in the present or future."
      );
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
        "event_ends: Event end date must be on or after event start date"
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
    <div className="create-event-container">
      <form onSubmit={handleSubmit} className="form-event-column">
        <h1 className="CreateEventTitle">Create Your Event</h1>
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
        <div className="event-first-container">
          <h1 className="eventh1">
            {" "}
            <i className="fa-regular fa-file-lines"></i> Basic Info
          </h1>
          <p>
            Name your event and tell event-goers why they should come. Add
            details that highlight what makes it unique.
          </p>
          <div className="event-first-container-description">
            <label>Event Name</label>
            <input
              className="event-first-container-input"
              placeholder="Event Title"
              value={name}
              required
              type="text"
              style={errorStyle(errors, "name")}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="event-first-container-description">
            <label>Description</label>
            <input
              className="event-first-container-input desc-input-event"
              placeholder="Description"
              required
              value={description}
              type="text"
              style={errorStyle(errors, "description")}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="create-event-image">
              <label>Add Image For Event </label>
              <label htmlFor="previewUrl" />
              <input
                type="url"
                name="previewUrl"
                value={previewUrl}
                className="event-first-container-input"
                placeholder="Preview Image URL"
                style={errorStyle(errors, "preview_url")}
                onChange={(e) => setPreviewUrl(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="event-first-container ">
          <h1 className="eventh1">
            <i className="fa-solid fa-calendar-days"></i> Location & Event
            Date/Time
          </h1>
          <p>
            Help people discover your event and let attendees know where and
            when to show up.
          </p>
          <div className="event-first-container-description">
            <label>Address</label>
            <input
              className="event-first-container-input"
              placeholder="Address"
              required
              value={address}
              type="text"
              style={errorStyle(errors, "address")}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* <div className="event-first-container-description">
            <input
              className="event-first-container-input"
              placeholder="Ticket Quantity"
              required
              value={ticket_quantity}
              type="number"
              onChange={(e) => setTicketQuantity(e.target.value)}
            />
          </div> */}
          <div className="event-first-container-description">
            <label> State</label>
            <select
              value={state}
              style={errorStyle(errors, "state")}
              onChange={(e) => {
                setState(e.target.value);
              }}
              className="event-first-container-input"
            >
              {STATES.map((state, i) => (
                <option key={`state-${i}`} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="create-event-city-zip">
            <div className="event-first-container-description">
              <label> City </label>
              <select
                style={errorStyle(errors, "city")}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="event-first-container-input"
              >
                {CITIES.map((city, i) => (
                  <option key={`city-${i}`} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="event-first-container-description">
              <label>Zip Code </label>
              <input
                className="event-first-container-input"
                placeholder="Zip Code"
                required
                value={zipcode}
                type="number"
                style={errorStyle(errors, "zipcode")}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="event-first-container">
          <div className="create-event-city-zip">
            <div className="event-first-container-description">
              <label>Event Starts</label>
              <input
                className="event-first-container-input"
                placeholder="Event Starts"
                required={true}
                value={event_starts}
                type="date"
                style={errorStyle(errors, "event_starts")}
                onChange={(e) => setEventStarts(e.target.value)}
              />
            </div>
            <div className="event-first-container-description">
              <label>Event Ends</label>
              <input
                className="event-first-container-input"
                placeholder="Event Ends"
                required={true}
                value={event_ends}
                type="date"
                style={errorStyle(errors, "event_ends")}
                onChange={(e) => setEventEnds(e.target.value)}
              />
            </div>
          </div>
          <div className="create-event-city-zip">
            <div className="event-first-container-description">
              <label>Start Time</label>
              <input
                className="event-first-container-input"
                placeholder="Start Time"
                required
                value={start_time}
                type="time"
                style={errorStyle(errors, "start_time")}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="event-first-container-description">
              <label>End Time</label>
              <input
                className="event-first-container-input"
                placeholder="End Time"
                required
                value={end_time}
                type="time"
                style={errorStyle(errors, "end_time")}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button disabled={errors.length > 0} className="submitEvent">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
