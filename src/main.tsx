import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FluentProvider>
  </StrictMode>
);
