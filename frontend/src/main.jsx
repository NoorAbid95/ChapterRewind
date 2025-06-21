import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {SummaryProvider} from "./context/SummaryCotext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </BrowserRouter>
  </StrictMode>
);
