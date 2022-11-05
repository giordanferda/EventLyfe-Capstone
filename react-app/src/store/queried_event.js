const GET_ALL = "queried_event/GET_ALL";

const getAll = (events) => ({
  type: GET_ALL,
  payload: events,
});

export const searchEvents = (name) => async (dispatch) => {
  const res = await fetch(`/api/events/search?name=${name}`);
  if (res.ok) {
    const events = await res.json();
    dispatch(getAll(events));
  }
  return res;
};

export default function queriedEventReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      newState = {};
      action.payload.events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    default:
      return state;
  }
}
