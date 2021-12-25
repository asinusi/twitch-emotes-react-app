import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import config from "./firebaseConfig";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

//Initialise firebase so we can use the functions later
initializeApp(config);

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement
);
