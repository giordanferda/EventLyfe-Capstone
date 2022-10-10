import img from "../defaultImage.jpg";
import "./404Page.css";
function BrokenLink() {
  return (
    <div className="four-container">
      <div className="broken-link">
        <h1 className="Not-found">404 - Not Found, No Events Here... </h1>
        <img className="img-four" src={img} alt="Broken/Not Found" />
      </div>
    </div>
  );
}

export default BrokenLink;
