import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppWrapper from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>
);
