import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ticketActions from "../../store/ticket";
import * as eventActions from "../../store/event";
import { Link, useHistory } from "react-router-dom";
import "./ManageTickets.css";
import TicketCard from "../TicketCard/TicketCard";
import EventCard from "../EventCard";

const ManageTickets = () => {
  const user = useSelector((state) => state.session.user);
  // console.log(user);
  //dummy commit
  const tickets = useSelector((state) => Object.values(state.tickets));
  const events = useSelector((state) => Object.values(state.event));
  // console.log(events);
  // console.log(tickets, "this is tickets");
  const filteredTickets = tickets.filter(
    (ticket) => ticket.user_id === user.id
  );
  console.log(filteredTickets);
  // console.log(filteredTickets);
  const filteredEvents = events.filter((event) => {
    return event.event_id === event.id;
  });

  //get filtered tickets event id to match events id

  // console.log(event);
  // console.log(filteredTickets, "this is filtered tickets");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ticketActions.getTicketThunk());
    dispatch(eventActions.getEventById());
    // console.log(tickets, "this is tickets");
  }, [dispatch]);

  const handleDeleteButton = (ticketId) => {
    dispatch(ticketActions.deleteTicketThunk(ticketId));
  };

  function redirectToShow(ticketId) {
    history.push(`/events/${ticketId}`);
  }

  if (!filteredTickets.length) {
    return (
      <div className="currentEventContainer">
        <h2 className="MyTicketHeader">Manage Tickets</h2>
        <div
          className="no-tickets-yet"
          style={{ display: "flex", justifyContent: "center" }}
        >
          No tickets yet!
        </div>
        <div
          className="no-tickets-yet"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link to="/events"> Buy one here! </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="currentEventContainer">
        <h2 className="MyEventHeader">My Tickets</h2>
        <div className="my-Event">
          <div className="my-event-inner">
            <div className="review-cards-inner-container">
              {filteredTickets.map((event, i) => (
                <div className="user-review-card">
                  <EventCard
                    event={event}
                    key={i}
                    redirectToShow={redirectToShow}
                  />
                  <button
                    className="refund-ticket"
                    onClick={() => handleDeleteButton(event.id)}
                  >
                    Refund Ticket
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageTickets;
