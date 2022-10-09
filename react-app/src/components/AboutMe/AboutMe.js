import "./AboutMe.css";
import img from "../gio.jpg";
function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="img-container">
        <img className="about-pic" src={img} alt="PIC NOT FOUND XD "></img>
        <div className="aboutme-desc">
          <h1 className="aboutme-title">Hey, My name is Giordan</h1>
          <p className="aboutme-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <ul>
        <li>
          <a
            href="https://github.com/giordanferda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github fa-2xl"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/giordanmaniti/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-linkedin fa-2xl"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AboutMe;
