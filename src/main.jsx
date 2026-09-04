import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { store } from "./store";
// import { LanguageProvider } from "./i18n/LanguageContext";
import "./styles/tokens.css";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <LanguageProvider> */}
        <App />
        {/* </LanguageProvider> */}
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
