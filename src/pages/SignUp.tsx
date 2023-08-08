import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IonButton, IonInput, IonPage, IonItem, IonIcon } from "@ionic/react";
import {
  mailOutline,
  peopleOutline,
  personCircleOutline,
  lockClosedOutline,
} from "ionicons/icons";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const password = useRef("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Password before check: ", password.current);
    if (
      password.current.length < 8 ||
      password.current.length > 128 ||
      !/\d/.test(password.current) ||
      !/[a-z]/.test(password.current) ||
      !/[A-Z]/.test(password.current) ||
      !/[!@#$%^&*]/.test(password.current)
    ) {
      alert(
        "Password must be between 8 and 128 characters, and include at least one digit, one lowercase letter, one uppercase letter, and one special character (!@#$%^&*)"
      );
      return;
    }
    console.log("Password after check: ", password.current);
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password: password.current,
      }),
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
      <form onSubmit={handleSubmit} autoComplete="off" className="signup-page">
        <h1>Signup</h1>
        <IonItem className="signup-input">
          <IonInput
            placeholder="Name"
            onIonChange={(e) => setName(e.detail.value!)}
          />
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        </IonItem>

        <IonItem className="signup-input">
          <IonInput
            placeholder="Email Address"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          <IonIcon slot="start" icon={mailOutline} />
        </IonItem>

        <IonItem className="signup-input">
          <IonInput
            placeholder="Username"
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
          <IonIcon slot="start" icon={personCircleOutline} />
        </IonItem>

        <IonItem className="signup-input">
          <IonInput
            placeholder="Password"
            type="password"
            onIonChange={(e) => (password.current = e.detail.value!)}
          />
          <IonIcon slot="start" icon={lockClosedOutline} />
        </IonItem>

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
