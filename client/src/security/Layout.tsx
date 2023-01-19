import { Outlet } from "react-router";
import useInitializeUser from "../hooks/useInitializeUser";
import { useLocation } from "react-router";
import { useToast } from "@welcome-ui/toast";
import Toast from "../components/Toast";
import { useCallback, useEffect } from "react";

const Layout = () => {
  const toast = useToast();

  // pobieranie użytkownika z ciasteczek podczas pierwszego renderu
  useInitializeUser();

  const location = useLocation();

  // useEffect(()=> {
  //   if (location.state?.toast) toast(<Toast />, { position: "top-right" });
  //   window.
  // }, [])

  // window.history.replaceState({}, document.title);

  return <Outlet />;
};

export default Layout;
