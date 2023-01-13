import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);

  useEffect(() => {
    if (!cookies.access_token) return;
    const decoded = jwtDecode(cookies.access_token);
    console.log(decoded);
  }, [cookies]);

  const handleLoginWithGoogle = async () => {
    await axios.get("http://localhost:3000/api/auth/google");
  };

  return (
    <div>
      {/* <button onClick={handleLoginWithGoogle}>Login with google</button> */}
      <a href="http://localhost:3000/api/auth/google">Login with google</a>
    </div>
  );
};

export default App;
