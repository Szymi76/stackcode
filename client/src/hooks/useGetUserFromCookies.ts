import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import User from "../types/User";
import { setUser, setIsVerified } from "../features/auth/authSlice";

type DecodedUser = User & {
  exp: number;
  iat: number;
};

const useGetUserFromCookies = () => {
  const { isVerified } = useAppSelector((state) => state.auth);
  const [{ access_token }] = useCookies(["access_token"]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(access_token);
    if (isVerified || !access_token) {
      dispatch(setUser(null));
      dispatch(setIsVerified(true));
      return;
    }

    const user: DecodedUser = jwtDecode(access_token);
    if (user.exp > +new Date() / 1000) dispatch(setUser(user));
    else dispatch(setUser(null));

    dispatch(setIsVerified(true));
  }, [isVerified]);
};

export default useGetUserFromCookies;
