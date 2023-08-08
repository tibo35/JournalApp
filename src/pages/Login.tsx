import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonButton, IonInput, IonPage, IonItem, IonIcon } from "@ionic/react";
import { personCircleOutline, lockClosedOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

import "./Login.css";
import "../theme/variables.css";

const Login = () => {
  const history = useHistory();
  const username = useRef("");
  const password = useRef("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username.current);
    console.log(password.current);
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current,
        password: password.current,
      }),
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
      <form onSubmit={handleSubmit} className="login-page">
        <h1>Login</h1>
        <IonItem className="login-input">
          <IonInput
            placeholder="Username"
            onIonChange={(e) => (username.current = e.detail.value || "")}
          />
          <IonIcon slot="start" icon={personCircleOutline} />
        </IonItem>
        <IonItem className="login-input">
          <IonInput
            placeholder="Password"
            type="password"
            onIonChange={(e) => (password.current = e.detail.value || "")}
          />
          <IonIcon slot="start" icon={lockClosedOutline} />
        </IonItem>
        <IonButton type="submit">Submit </IonButton>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link-no-underline">
            Sign up
          </Link>
        </p>
      </form>
    </IonPage>
  );
};

export default Login;
