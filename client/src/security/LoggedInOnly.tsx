import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import Loading from "./Loading";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const LoggedInOnly = () => {
  const { user, isVerified } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (user === null && !isVerified)
    return (
      <>
        <Nav />
        <Loading />
        <Footer />
      </>
    );
  if (user === null && isVerified) return <Navigate to={"/home"} state={{ pathname }} replace />;
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default LoggedInOnly;
