import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cityAndStates } from "../states";

function CreateEvent() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [ticket_quantity, setTicketQuantity] = useState(300);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [preview_image, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  const CITIES = useMemo(() => Object.keys(cityAndStates), []);
  const STATES = useMemo(() => {
    return [...new Set(Object.values(cityAndStates))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  return (
    <form>
      <div>
        <label>Name</label>
        <input
          className="create-event-input"
          placeholder="Name"
          value={name}
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <input
          className="create-event-description"
          placeholder="Description"
          required
          value={description}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Address</label>
        <input
          className="create-event-Address"
          placeholder="Address"
          required
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Ticket quantity</label>
        <input
          className="create-event-Ticket-quantity"
          placeholder="Ticket Quantity"
          required
          type="number"
          onChange={(e) => setTicketQuantity(e.target.value)}
        ></input>
      </div>
      <select>
        {STATES.map((state) => (
          <option value={state} onClick={(e) => setState(e.target.value)}>
            {state}
          </option>
        ))}
      </select>

      <select>
        {CITIES.map((city) => (
          <option
            value={city}
            onClick={(e) => {
              setCity(e.target.value);
              setState(cityAndStates[e.target.value]);
              console.log(e.target);
            }}
          >
            {city}
          </option>
        ))}
      </select>
      <div>
        <label>Zip Code</label>
        <input
          className="create-event-zipcode"
          placeholder="Zip Code"
          required
          type="number"
          onChange={(e) => setZipcode(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Start Time</label>
        <input
          className="create-event-start-time"
          placeholder="Start Time"
          required
          type="number"
          onChange={(e) => setZipcode(e.target.value)}
        ></input>
      </div>
    </form>
  );
}

export default CreateEvent;
