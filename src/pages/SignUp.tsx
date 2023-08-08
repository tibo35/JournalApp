import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/signup", {
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
      console.log("Signup successful");
    } else {
      console.log("Signup failed");
    }
  };

  return (
    <IonPage className="signup-page">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <IonInput
          className="signup-input"
          placeholder="Username"
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          className="signup-input"
          placeholder="Password"
          type="password"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton type="submit">Sign Up</IonButton>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="link-no-underline">
          Sign in
        </Link>
      </p>
    </IonPage>
  );
};

export default Signup;
