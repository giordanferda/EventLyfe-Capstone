import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import signupImg from "../login-signup.png";
import { capitalizeWord } from "../../util/stringUtil";
import "./SignUpForm.css";
import img from "../eventlyfe-logo.png";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setIsSubmitted(true);
    const capitalizedFirstName = capitalizeWord(firstName);
    const capitalizedLastName = capitalizeWord(lastName);
    if (password === repeatPassword) {
      setBackendErrors([]);
      const data = await dispatch(
        signUp({
          username,
          firstName: capitalizedFirstName,
          lastName: capitalizedLastName,
          email,
          password,
        })
      );
      if (data) {
        setBackendErrors(data);
      }
    } else {
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  useEffect(() => {
    const errors = [];
    if (password !== repeatPassword) {
      errors.push(
        "Confirm Password field must be the same as the Password field"
      );
    }
    setErrors(errors);
  }, [password, repeatPassword]);

  useEffect(() => {
    const postErrors = {};
    if (username.length > 20)
      postErrors.username = "Username must be less than 20 characters";
    if (!username) postErrors.username = "Please enter a user name";
    if (!email.includes("@") || !email.includes("."))
      postErrors.email = "Invalid Email";
    if (!email) postErrors.email = "Please enter an email";
    if (password.length < 6)
      postErrors.password = "Password must be at least 6 characters";
    if (password.length > 50)
      postErrors.password = "Password must be less than 50 characters";
    if (firstName.length === 0)
      postErrors.firstName = "Please enter your first name";
    if (firstName.length > 50)
      postErrors.firstName = "First name must be less than 50 characters";
    if (lastName.length === 0)
      postErrors.lastName = "Please enter your last name";
    if (lastName.length > 50)
      postErrors.lastName = "Last name must be less than 50 characters";
    if (!password) postErrors.password = "Please enter a password";
    if (!repeatPassword)
      postErrors.repeatPassword = "Please repeat your password";
    if (password !== repeatPassword)
      postErrors.repeatPassword = "Passwords must match";

    setErrors(postErrors);
  }, [username, firstName, lastName, email, password, repeatPassword]);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex-container">
      <div className="flex-child left-login">
        <form className="signup-event" onSubmit={onSignUp}>
          <div>
            <img className="logo-img" alt="Not Found" src={img} />
            <h3 className="auth-header">Sign Up</h3>
          </div>
          <div className="create-event-errors">
            {backendErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="input-container">
            <label>User Name</label>
            <input
              className="event-first-container-input"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required
            ></input>
            <div className="signup-error-message">{errors?.username}</div>
          </div>
          <div className="input-container">
            <label>First Name</label>
            <input
              className="event-first-container-input"
              type="text"
              name="firstName"
              onChange={updateFirstName}
              value={firstName}
              required
            ></input>
            <div className="signup-error-message">{errors?.firstName}</div>
          </div>
          <div className="input-container">
            <label>Last Name</label>
            <input
              className="event-first-container-input"
              type="text"
              name="lastName"
              onChange={updateLastName}
              value={lastName}
              required
            ></input>
            <div className="signup-error-message">{errors?.lastName}</div>
          </div>
          <div className="input-container">
            <label>Email</label>
            <input
              className="event-first-container-input"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              required
            ></input>
            <div className="signup-error-message">{errors?.email}</div>
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              className="event-first-container-input"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required
            ></input>
            <div className="signup-error-message">{errors?.password}</div>
          </div>
          <div className="input-container">
            <label>Repeat Password</label>
            <input
              className="event-first-container-input"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <div className="signup-error-message">{errors?.repeatPassword}</div>
          </div>
          <div className="sign-but">
            <button
              className="signup-button"
              disabled={
                errors.length > 0
                // ? (style = { cursor: "not-allowed" })
                // : (style = { cursor: "pointer" })
              }
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <Link to="/login">Log in here</Link>
        </form>
      </div>
      <div className="flex-child blue">
        <img className="loginImg" src={signupImg} alt="not found" />
      </div>
    </div>
  );
};

export default SignUpForm;
