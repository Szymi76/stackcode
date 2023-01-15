import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import Editor from "./components/Editor";
import Login from "./components/Login";
import Register from "./components/Register";
import useGetUserFromCookies from "./hooks/useInitializeUser";
import { useLogoutMutation } from "./features/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setIsVerified } from "./features/auth/authSlice";
import { setUser } from "./features/auth/authSlice";
import { Link } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);
  const auth = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  // console.log(import.meta.env.VITE_DEV_BASE_URL);
  // useEffect(() => {
  //   if (!cookies.access_token) return;
  //   const decoded = jwtDecode(cookies.access_token);
  //   console.log(decoded);
  // }, [cookies]);

  // useGetUserFromCookies();

  return (
    <div>
      {/* <button onClick={handleLoginWithGoogle}>Login with google</button> */}
      <a href="http://localhost:3000/api/auth/google">Login with google</a>
      {/* {cookies?.access_token} */}
      {/* {cookies?.refresh_token} */}
      <img src={auth.user?.photoURL} height={75} width={75} />
      {auth.user?.displayName}
      <Link to={"/zaloguj-sie"}>Login</Link>
      <Link to={"/stworz-konto"}>Register</Link>
      {/* <Editor /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <button
        onClick={async () => {
          await logout();
          dispatch(setUser(null));
        }}>
        Logout
      </button>
    </div>
  );
};

export default App;
