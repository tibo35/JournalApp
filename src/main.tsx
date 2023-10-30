import React from "react";
import { ReactDOM } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements as defineIonPwaElements } from "@ionic/pwa-elements/loader";

//redux
import { Provider } from "react-redux";
import store from "./store";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

defineIonPwaElements(window);
