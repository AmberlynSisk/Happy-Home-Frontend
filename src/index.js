import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppWrapper from "./Context";
import "react-datetime/css/react-datetime.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
