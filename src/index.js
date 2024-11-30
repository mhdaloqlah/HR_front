import React from "react";
import ReactDOM from "react-dom/client";
import Approuter from "./Routes/Approuter";
// In your index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure you're using the bundle version which includes Popper.js
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/line-awesome.min.css";
import "./assets/scss/main.scss";
import "./assets/css/material.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Approuter />
  </>
);
