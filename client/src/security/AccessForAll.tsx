import { Outlet } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const AccessForAll = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default AccessForAll;
