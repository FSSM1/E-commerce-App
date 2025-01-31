import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider } from "./components/productsClient/SearchContext.jsx";
import { store } from "./features/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <App />
      </SearchProvider>
      ,
    </Provider>
  </StrictMode>
);
