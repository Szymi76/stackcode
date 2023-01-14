import React from "react";
import { Outlet } from "react-router";
import useGetUserFromCookies from "../hooks/useGetUserFromCookies";

const Layout = () => {
  // pobieranie użytkownika z ciasteczek
  useGetUserFromCookies();

  return <Outlet />;
};

export default Layout;
