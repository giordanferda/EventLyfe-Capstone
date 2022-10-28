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
