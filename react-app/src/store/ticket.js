import { getEventById } from "./event";

const GET_TICKETS = "tickets/GET_TICKETS";
const CREATE = "tickets/CREATE_TICKET";
const DELETE_TICKET = "tickets/DELETE_TICKET";

const getTickets = (tickets) => ({
  type: GET_TICKETS,
  payload: tickets,
});

const createTicket = (ticket) => ({
  type: CREATE,
  payload: ticket,
});

const deleteTicket = (ticketId) => ({
  type: DELETE_TICKET,
  payload: ticketId,
});

export const getTicketThunk = () => async (dispatch) => {
  const res = await fetch("/api/tickets/");
  if (res.ok) {
    const data = await res.json();
    dispatch(getTickets(data));
  }
};

export const createTicketThunk = (ticket) => async (dispatch) => {
  const res = await fetch("/api/tickets/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
  // console.log(ticket);
  if (res.ok) {
    // console.log("res.ok", res);
    const data = await res.json();
    dispatch(createTicket(data));
    dispatch(getEventById(ticket.event_id));
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

export const deleteTicketThunk = (ticketId) => async (dispatch) => {
  const res = await fetch(`/api/tickets/${ticketId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteTicket(ticketId));
  }
};

export default function ticketReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_TICKETS:
      newState = {};
      action.payload.tickets.forEach((ticket) => {
        newState[ticket.id] = ticket;
      });
      return newState;
    case CREATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_TICKET:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
