import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="about-span">
          Giordan Maniti
          <div className="about-links">
            <a href="https://github.com/giordanferda" target="_blank">
              <i className="fab fa-github fa-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/giordanmaniti/"
              target="_blank"
            >
              <i className="fab fa-linkedin fa-2xl" />
            </a>
          </div>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
