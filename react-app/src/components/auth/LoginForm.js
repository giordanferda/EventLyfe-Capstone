import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";
import loginImg from "../login-signup.png";
import img from "../eventlyfe-logo.png";
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setBackendErrors(data);
    }
  };

  useEffect(() => {
    const postError = {};
    if (!email) postError.email = "Please enter an email";
    if (!email.includes("@") || !email.includes("."))
      postError.email = "Invalid Email";
    if (!password) postError.password = "Please enter a password";
    if (password.length < 6)
      postError.password = "Password must be at least 6 characters";
    if (password.length > 255)
      postError.password = "Password must be less than 255 characters";
    setErrors(postError);
  }, [email, password]);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex-container">
      <div className="flex-child left-login">
        <form onSubmit={onLogin} className="loginForm">
          <div>
            <img className="logo-img" alt="Not Found" src={img} />
            <h3 className="auth-header">Log In</h3>
          </div>
          <div className="create-event-errors">
            {backendErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              className="event-first-container-input"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              required
            />
            <div className="signup-error-message">{errors?.email}</div>
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              className="event-first-container-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              required
            />
            <div className="signup-error-message">{errors?.password}</div>
          </div>
          <div className="button-flex-row">
            <button type="submit">Log in</button>
            <button
              disabled={errors.length > 0}
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
              type="submit"
              className="demo-user"
            >
              Demo Login
            </button>
          </div>
          <Link to="/signup">Sign Up Here</Link>
        </form>
      </div>
      <div className="flex-child blue">
        <img className="loginImg" src={loginImg} alt="not found" />
      </div>
    </div>
  );
};

export default LoginForm;
