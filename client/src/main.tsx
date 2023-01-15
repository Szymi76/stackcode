import React from "react";
import ReactDOM from "react-dom/client";

// providers
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { WuiProvider, createTheme } from "@welcome-ui/core";
import { store } from "./app/store";

// security routes
import Layout from "./security/Layout";
import AccessForAll from "./security/AccessForAll";
import NotLoggedInOnly from "./security/NotLoggedInOnly";
import LoggedInOnly from "./security/LoggedInOnly";

// pages
import App from "./App";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";

// other
import theme from "./utils/theme";

// css
import "./styles/index.css";

// const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <WuiProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* route dla zalogowanych i nie zalogowanych */}
                <Route path="/" element={<AccessForAll />}>
                  <Route index path="/home" element={<Home />} />
                  <Route path="/" element={<Navigate to={"/home"} />} />
                </Route>

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
