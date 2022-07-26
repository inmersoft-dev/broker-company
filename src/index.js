import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// contexts
import { LanguageProvider } from "./contexts/LanguageProvider";
import { RouteProvider } from "./contexts/RouteProvider";

// styles
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </LanguageProvider>
  </React.StrictMode>
);
