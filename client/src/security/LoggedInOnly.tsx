import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import Loading from "./Loading";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const LoggedInOnly = () => {
  const { user, isVerified } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => localStorage.setItem("last-pathname", pathname), []);

  if (user === null) return <Navigate to={"/zaloguj-sie"} state={{ pathname }} replace />;
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default LoggedInOnly;
