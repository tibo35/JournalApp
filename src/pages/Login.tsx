import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";

import "./Login.css";
import "../theme/variables.css";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password: password }),
    });

    const data = await response.json();

    if (data.token) {
      // Save the token in localStorage (or wherever you want to store it)
      localStorage.setItem("token", data.token);
      console.log("Login successful");
      history.push("/tab2");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <IonPage className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <IonInput
          className="login-input"
          placeholder="Username"
          onIonChange={(e) => e.detail.value && setUsername(e.detail.value)}
          value={username}
        />
        <IonInput
          className="login-input"
          placeholder="Password"
          type="password"
          onIonChange={(e) => e.detail.value && setPassword(e.detail.value)}
          value={password}
        />
        <IonButton type="submit">Submit </IonButton>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="link-no-underline">
          Sign up
        </Link>
      </p>
    </IonPage>
  );
};

export default Login;
