import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CurrentUserContextProvider from "./context/CurrentUserContextProvider";
import "./styles/index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <CurrentUserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CurrentUserContextProvider>
);
