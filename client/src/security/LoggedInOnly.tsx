import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";

const LoggedInOnly = () => {
  const { user, isVerified } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (user === null && !isVerified) return <h1>Ładowanie ...</h1>;
  if (user === null && isVerified) return <Navigate to={"/home"} state={{ pathname }} replace />;
  return <Outlet />;
};

export default LoggedInOnly;
