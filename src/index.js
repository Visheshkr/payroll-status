import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Suspense, lazy, StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TitleContextProvider from "./contexts/TitleContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);

root.render(
  <Suspense fallback={<div />}>
    <TitleContextProvider>
      <HashRouter>
        {/* <StrictMode> */}
        <Provider store={store}>
          <Toaster />
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
        {/* </StrictMode> */}
      </HashRouter>
    </TitleContextProvider>
  </Suspense>
);
