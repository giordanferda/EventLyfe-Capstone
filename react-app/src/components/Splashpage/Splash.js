import { Link } from "react-router-dom";
import splashImg from "../eventbrite-splash.jpg";
import "./Splash.css";

function Splash() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={splashImg} alt="not found" />
        <div className="viewallevents">
          <button className="view-all-button">
            <Link to="/events"> View All Events</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Splash;
