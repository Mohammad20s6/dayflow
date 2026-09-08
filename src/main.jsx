import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";

import App from "./App.jsx";

import { store } from "./store";

import "./styles/tokens.css";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />

        <Toaster
          position="top-center"
          expand={false}
          richColors={false}
          closeButton={false}
          duration={Infinity}
          visibleToasts={1}
        />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
