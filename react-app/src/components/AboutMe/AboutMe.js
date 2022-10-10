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
            My name is Giordan and I am a 24 year old Full Stack Software
            Engineer based in Queens, New York City. I am a fitness
            enthusiast-turned software engineer. I fell in love with programming
            due to curiousity of real-world problems and natural intuition to
            solving questions. In my personal time, I enjoy working out, playing
            pickleball and spending time with my family. If anyone asks, my
            favorite video game is Valorant. If you want to know more about me,
            please feel free to reach out and connect with me.
          </p>
          <div className="tech">
            <i class="devicon-python-plain colored"></i>
            <i class="devicon-javascript-plain colored"></i>
            <i class="devicon-nodejs-plain colored"></i>
            <i class="devicon-flask-original colored"></i>
            <i class="devicon-express-original colored"></i>
            <i class="devicon-github-original colored"></i>
            <i class="devicon-react-original colored"></i>
            <i class="devicon-redux-original colored"></i>
            <i class="devicon-sqlite-plain colored"></i>
            <i class="devicon-heroku-original colored"></i>
            <i class="devicon-html5-plain colored"></i>
            <i class="devicon-css3-plain colored"></i>
            <i class="devicon-sequelize-plain colored"></i>
            <i class="devicon-docker-plain colored"></i>
            <i class="devicon-mocha-plain colored"></i>
            <i class="devicon-vscode-plain colored"></i>
            <i class="devicon-postgresql-plain colored"></i>
            <i class="devicon-ubuntu-plain colored"></i>
            <i class="devicon-google-plain-wordmark colored"></i>
            <i class="devicon-chrome-plain"></i>
          </div>
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
