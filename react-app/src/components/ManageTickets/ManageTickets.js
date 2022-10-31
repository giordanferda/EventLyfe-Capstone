import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ticketActions from "../../store/ticket";
import * as eventActions from "../../store/event";
import { Link, useHistory } from "react-router-dom";
import EventCard from "../EventCard";
import "./ManageTickets.css";

const ManageTickets = () => {
  const user = useSelector((state) => state.session.user);
  const tickets = useSelector((state) => Object.values(state.tickets));
  console.log(tickets, "this is tickets");
  const filteredTickets = tickets.filter((event) => event.id == user.id);
  console.log(filteredTickets, "this is filtered tickets");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ticketActions.getTicketThunk());
    // console.log(tickets, "this is tickets");
  }, [dispatch]);

  function redirectToShow(ticketId) {
    history.push(`/events/${ticketId}`);
  }

  if (!filteredTickets.length) {
    return (
      <div className="currentTicketContainer">
        <h2 className="MyTicketHeader">Manage Tickets</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          No tickets yet! <Link to="/events">Buy one here!</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="currentTicketContainer">
        <h2 className="MyTicketHeader">My Tickets</h2>
        <div className="my-Ticket">
          <div className="my-ticket-inner">
            <div className="ticket-cards-inner-container">
              {filteredTickets.map((event, i) => (
                <div className="user-ticket-card">
                  <EventCard
                    event={event}
                    key={i}
                    redirectToShow={redirectToShow}
                  />
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
