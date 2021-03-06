import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";
import { AuthContextProvider } from "./store/Auth/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);
