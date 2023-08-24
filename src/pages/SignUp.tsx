import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IonButton, IonInput, IonPage, IonItem, IonIcon } from "@ionic/react";
import {
  mailOutline,
  peopleOutline,
  personCircleOutline,
  lockClosedOutline,
} from "ionicons/icons";
import "./Signup.css";
import { postSignUp } from "../Api/Api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const password = useRef("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertMessages, setAlertMessages] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    const errors = [nameError, emailError, usernameError, passwordError].filter(
      (error) => error
    );
    setAlertMessages(errors);
  }, [nameError, emailError, usernameError, passwordError]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "* Please enter a valid email address");
  };

  const validateUsername = (username: string) => {
    const isValid = username.trim() !== "" && username.length >= 5;
    setUsernameError(
      isValid ? "" : "* Username must be at least 5 characters long"
    );
  };

  const validateName = (name: string) => {
    const isValid = name.trim() !== "" && name.length >= 2;
    setNameError(isValid ? "" : "* Name must be at least 2 characters long");
  };

  const validatePassword = (password: string) => {
    const isPasswordValid =
      password.length >= 8 &&
      password.length <= 128 &&
      /\d/.test(password) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      password !== username;
    setPasswordError(
      isPasswordValid
        ? ""
        : "* Password must be at least 8 characters, include at least 1 digit, 1 uppercase letter, 1 lowercase letter, and one (!@#$%^&*)"
    );
  };

  const handleInputChange = (type: string, value: string) => {
    switch (type) {
      case "name":
        setName(value);
        validateName(value);
        break;
      case "email":
        setEmail(value);
        validateEmail(value);
        break;
      case "username":
        setUsername(value);
        validateUsername(value);
        break;
      case "password":
        password.current = value;
        validatePassword(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform all validations on form submit
    validateName(name);
    validateEmail(email);
    validateUsername(username);
    validatePassword(password.current);

    // if there are any error messages, stop the form submission
    if (alertMessages.length > 0) {
      return;
    }
    const data = await postSignUp(name, email, username, password.current);
    if (data.token) {
      // Save the token in localStorage
      localStorage.setItem("token", data.token);
      history.push("/home");
      console.log("Signup successful");
    } else {
      console.log("Signup failed");
    }
  };

  return (
    <IonPage>
      <form onSubmit={handleSubmit} autoComplete="off" className="signup-page">
        <h1>Signup</h1>
        <IonItem className={`signup-input ${nameError ? "invalid-input" : ""}`}>
          <IonInput
            placeholder="Name"
            onIonChange={(e) => handleInputChange("name", e.detail.value!)}
          />
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        </IonItem>
        <IonItem
          className={`signup-input ${emailError ? "invalid-input" : ""}`}>
          <IonInput
            placeholder="Email Address"
            onIonChange={(e) => handleInputChange("email", e.detail.value!)}
          />
          <IonIcon slot="start" icon={mailOutline} />
        </IonItem>
        <IonItem
          className={`signup-input ${usernameError ? "invalid-input" : ""}`}>
          <IonInput
            placeholder="Username"
            onIonChange={(e) => handleInputChange("username", e.detail.value!)}
          />
          <IonIcon slot="start" icon={personCircleOutline} />
        </IonItem>
        <IonItem
          className={`signup-input ${passwordError ? "invalid-input" : ""}`}>
          <IonInput
            placeholder="Password"
            type="password"
            onIonChange={(e) => handleInputChange("password", e.detail.value!)}
          />
          <IonIcon slot="start" icon={lockClosedOutline} />
        </IonItem>
        {alertMessages.length > 0 && (
          <ul className="alert-list">
            {alertMessages.map((message, index) => (
              <li key={index} className="alert">
                {message}
              </li>
            ))}
          </ul>
        )}
        <IonButton type="submit">Sign Up</IonButton>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link-no-underline">
            Sign in
          </Link>
        </p>
      </form>
    </IonPage>
  );
};

export default Signup;
