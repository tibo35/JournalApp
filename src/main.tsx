import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements as defineIonPwaElements } from "@ionic/pwa-elements/loader";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

defineIonPwaElements(window);
