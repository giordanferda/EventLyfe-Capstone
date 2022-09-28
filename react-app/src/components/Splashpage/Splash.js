import { Link } from "react-router-dom";
import splashImg from "../eventbrite-splash.jpg";
import "./Splash.css";

function Splash() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={splashImg} />
      </div>
      <div className="viewallevents">
        <button>
          <Link to="/events"> View All Events</Link>
        </button>
      </div>
    </div>
  );
}

export default Splash;
