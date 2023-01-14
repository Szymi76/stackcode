import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import User from "../types/User";
import { setUser, setIsVerified } from "../features/auth/authSlice";

const useGetUserFromCookies = () => {
  const [{ access_token }] = useCookies(["access_token"]);
  const dispatch = useAppDispatch();
  const { isVerified } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isVerified || !access_token) {
      dispatch(setIsVerified(true));
      return;
    }

    const decodedUser: User = jwtDecode(access_token);
    dispatch(setUser(decodedUser));
    dispatch(setIsVerified(true));
  }, [isVerified]);
};

export default useGetUserFromCookies;
