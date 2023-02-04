import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import Loading from "./Loading";

const NotLoggedInOnly = () => {
  const { user, isVerified } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const to = localStorage.getItem("last-pathname") ?? "/home";

  // if (user === null && !isVerified) return <Loading />;
  if (user === null) return <Outlet />;
  return <Navigate to={to} state={{ pathname }} replace />;
};

export default NotLoggedInOnly;
