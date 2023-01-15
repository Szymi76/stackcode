import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./security/Layout";
import Register from "./pages/register";
import Login from "./pages/login";
import NotLoggedInOnly from "./security/NotLoggedInOnly";
import LoggedInOnly from "./security/LoggedInOnly";
import { WuiProvider, createTheme } from "@welcome-ui/core";
import theme from "./utils/theme";
import { CookiesProvider } from "react-cookie";

// const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <WuiProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* -- DO ZMIANY -- */}
                <Route index path="/home" element={<App />} />
                <Route path="/" element={<Navigate to={"/home"} />} />
                {/* route tylko dla NIE zalogowanych użytkowników */}
                <Route path="/" element={<NotLoggedInOnly />}>
                  <Route path="/zaloguj-sie" element={<Login />} />
                  <Route path="/stworz-konto" element={<Register />} />
                </Route>
                {/* route tylko dla zalogowanych użytkowników */}
                {/* <Route path="/" element={<LoggedInOnly />}></Route> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </WuiProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
