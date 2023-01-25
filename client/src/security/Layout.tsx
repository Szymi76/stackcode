import useInitializeUser from "../hooks/useInitializeUser";
import { Outlet } from "react-router";

const Layout = () => {
  // pobieranie użytkownika z ciasteczek podczas pierwszego renderu
  useInitializeUser();

  return <Outlet />;
};

export default Layout;
