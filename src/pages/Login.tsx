import React, { useState } from "react";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import "./Login.css";

const Login = () => {
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
    } else {
      console.log("Login failed");
    }
  };

  return (
    <IonPage>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <IonInput
          placeholder="Username"
          onIonChange={(e) => e.detail.value && setUsername(e.detail.value)}
          value={username}
        />
        <IonInput
          placeholder="Password"
          type="password"
          onIonChange={(e) => e.detail.value && setPassword(e.detail.value)}
          value={password}
        />
        <IonButton type="submit">Submit</IonButton>
      </form>
    </IonPage>
  );
};

export default Login;
