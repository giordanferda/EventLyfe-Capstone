const GET_ALL = "events/GET_ALL";
const CREATE = "events/CREATE";
const UPDATE = "events/UPDATE";
const DELETE = "events/DELETE";

const getAll = (events) => ({
  type: GET_ALL,
  payload: events,
});

const create = (event) => ({
  type: CREATE,
  payload: event,
});

const update = (event) => ({
  type: UPDATE,
  payload: event,
});

const deleteEvent = (eventId) => ({
  type: DELETE,
  payload: eventId,
});
//get all events
export const getEvents = () => async (dispatch) => {
  const res = await fetch("/api/events/");
  if (res.ok) {
    const events = await res.json();
    dispatch(getAll(events));
  }
};

//Get one event by id
export const getEventById = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`);
  if (res.ok) {
    const event = await res.json();
    dispatch(getAll(event));
  }
};

//create an event
export const createEvent = (event) => async (dispatch) => {
  const res = await fetch("/api/events/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(create(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    console.log(await res.json());
    return ["Bad Data, Please try again"];
  }
};

export const updateEvent = (event) => async (dispatch) => {
  const res = await fetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(update(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["Bad Data, Please try again"];
  }
  return res;
};

export const deleteEventById = (id) => async (dispatch) => {
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteEvent(id));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["Bad Data, Please try again"];
  }
  return res;
};

//reducers

export default function eventReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      newState = {};
      action.payload.events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    case CREATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
