import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import App from "./App.tsx";

import {
  webLightTheme,
  FluentProvider,
  Theme,
} from "@fluentui/react-components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// You can pass your own custom tokens to a theme and pass that to the provider.
type CustomTheme = Theme & {
  tokenA: string;
  tokenB: string;
  tokenC: string;
};
const customTheme: CustomTheme = {
  ...webLightTheme,
  tokenA: "red",
  tokenB: "blue",
  tokenC: "green",
};

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={customTheme}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </FluentProvider>
    </QueryClientProvider>
  </StrictMode>
);
