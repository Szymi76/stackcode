import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { WuiProvider, createTheme } from "@welcome-ui/core";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./security/Loading";
import App from "./App";
import theme from "./utils/theme";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <WuiProvider theme={theme}>
          <App />
        </WuiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
