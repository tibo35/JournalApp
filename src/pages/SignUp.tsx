import React, { useState } from "react";
import { IonButton, IonInput, IonPage } from "@ionic/react";

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
    <IonPage>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <IonInput
          placeholder="Username"
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
        <IonInput
          placeholder="Password"
          type="password"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton type="submit">Submit</IonButton>
      </form>
    </IonPage>
  );
};

export default Signup;
