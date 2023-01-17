import { Outlet } from "react-router";
import useInitializeUser from "../hooks/useInitializeUser";

const Layout = () => {
  // pobieranie użytkownika z ciasteczek podczas pierwszego renderu
  useInitializeUser();

  const isWantToSeeModal = localStorage.getItem("want-to-see-finish-modal");
  if (isWantToSeeModal === null) localStorage.setItem("want-to-see-finish-modal", JSON.stringify(true));

  return <Outlet />;
};

export default Layout;
