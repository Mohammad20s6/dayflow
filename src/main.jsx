import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store.js";
// import { LanguageProvider } from "./i18n/translations.js";
import "./styles/tokens.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <LanguageProvider> */}
      <App />
      {/* </LanguageProvider> */}
    </Provider>
  </StrictMode>,
);
