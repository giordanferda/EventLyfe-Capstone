import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/event";
import EventCard from "../EventCard";

function EventsPage() {
  return (
    <div>
      <div>
        <h1>Events</h1>
      </div>
    </div>
  );
}

export default EventsPage;
