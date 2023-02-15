import { Outlet } from "react-router";
// import Nav from "../components/Nav";
import Nav from "../components/Nav/index";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const AccessForAll = () => {
  const { pathname } = useLocation();

  useEffect(() => localStorage.setItem("last-pathname", pathname), []);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default AccessForAll;
