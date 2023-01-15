import { Outlet } from "react-router";
import useInitializeUser from "../hooks/useInitializeUser";

const Layout = () => {
  // pobieranie użytkownika z ciasteczek podczas pierwszego renderu
  useInitializeUser();

  return <Outlet />;
};

export default Layout;
