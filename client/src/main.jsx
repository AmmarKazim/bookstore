import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

// creating react root in html
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// rendering <App /> component which holds header, footer, and routes for pages
root.render(
  // wrapping <App /> in BrowserRouter to be able to make routing work in browser
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
