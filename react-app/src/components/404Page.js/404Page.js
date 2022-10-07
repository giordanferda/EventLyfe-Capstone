import img from "../defaultImage.jpg";
import { Redirect } from "react-router-dom";
import "./404Page.css";
function BrokenLink() {
  return (
    <div className="four-container">
      <div className="broken-link">
        <h1 className="Not-found">404 - Not Found, No Events Here... </h1>
        <img className="img-four" src={img} />
      </div>
    </div>
  );
}

export default BrokenLink;
