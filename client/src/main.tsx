import React from "react";
import ReactDOM from "react-dom/client";

// providers
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { WuiProvider, createTheme } from "@welcome-ui/core";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

// security routes
import Layout from "./security/Layout";
import AccessForAll from "./security/AccessForAll";
import NotLoggedInOnly from "./security/NotLoggedInOnly";
import LoggedInOnly from "./security/LoggedInOnly";
import NotFound from "./security/NotFound";
import Loading from "./security/Loading";

// pages
import App from "./App";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Question from "./pages/question";
import Profile from "./pages/profile";
import Search from "./pages/search";
import EditQuestion from "./pages/editQuestion";
import UpdateDisplayName from "./pages/settings/Tabs/UpdateDisplayName";
import UpdateAwatar from "./pages/settings/Tabs/UpdateAwatar";
import UploadQuestion from "./pages/uploadQuestion";
import Tests from "./pages/tests";

// other
import theme from "./utils/theme";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <WuiProvider theme={theme}>
          {/* <BrowserRouter> */}
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* route dla zalogowanych i nie zalogowanych */}
                <Route path="/" element={<AccessForAll />}>
                  <Route index path="/home" element={<Home />} />
                  <Route path="/" element={<Navigate to={"/home"} />} />
                  <Route path="/pytanie/:questionId" element={<Question />} />
                  <Route path="/szukaj" element={<Search />} />
                  {/* <Route path="/tests" element={<TestSettings />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* route tylko dla NIE zalogowanych użytkowników */}
                <Route path="/" element={<NotLoggedInOnly />}>
                  <Route path="/zaloguj-sie" element={<Login />} />
                  <Route path="/stworz-konto" element={<Register />} />
                </Route>
                {/* route tylko dla zalogowanych użytkowników */}
                <Route path="/" element={<LoggedInOnly />}>
                  <Route path="/zadaj-pytanie" element={<UploadQuestion />} />
                  <Route path="/twoj-profil" element={<Profile />} />
                  <Route path="/edytuj-pytanie/:id" element={<EditQuestion />} />

                  {/* ustawienia */}
                  <Route path="/ustawienia/twoja-nazwa" element={<UpdateDisplayName />} />
                  <Route path="/ustawienia/awatar" element={<UpdateAwatar />} />
                </Route>
              </Route>
            </Routes>
          </HashRouter>
          {/* </BrowserRouter> */}
        </WuiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
