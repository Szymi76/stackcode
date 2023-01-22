import useInitializeUser from "../hooks/useInitializeUser";
import { Outlet } from "react-router";
import { useToast } from "@welcome-ui/toast";

const Layout = () => {
  const toast = useToast();

  // pobieranie użytkownika z ciasteczek podczas pierwszego renderu
  useInitializeUser();

  return <Outlet />;
};

export default Layout;
