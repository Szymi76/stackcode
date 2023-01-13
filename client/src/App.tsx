import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import Editor from "./components/Editor";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);

  useEffect(() => {
    if (!cookies.access_token) return;
    const decoded = jwtDecode(cookies.access_token);
    console.log(decoded);
  }, [cookies]);

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true });
  };

  return (
    <div>
      {/* <button onClick={handleLoginWithGoogle}>Login with google</button> */}
      <a href="http://localhost:3000/api/auth/google">Login with google</a>
      {cookies?.access_token}
      {cookies?.refresh_token}
      <Editor />
      <Login />
      <Register />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
