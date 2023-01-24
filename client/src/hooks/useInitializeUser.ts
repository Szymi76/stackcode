import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCookies } from "react-cookie";
import { setUser, setIsVerified } from "../features/auth/authSlice";
import { useLogoutMutation, useGetCurrentUserMutation, useGetCookieQuery } from "../features/auth/authApiSlice";
import jwtDecode from "jwt-decode";
import User from "../types/User";

type DecodedUser = User & {
  exp: number;
  iat: number;
};

// hook służy aby podczas pierwszego renderu pobrać użytkownika z ciasteczek i
// sprawdzić czy jest on jeszcze ważny.
const useInitializeUser = () => {
  const { isVerified, user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const [getCurrentUser] = useGetCurrentUserMutation();
  const [{ access_token }] = useCookies();
  const { data } = useGetCookieQuery();
  const dispatch = useAppDispatch();

  // inicjacja użytkownika
  const initialize = async () => {
    if (isVerified) return;

    if (data) {
      const userFromToken: DecodedUser = jwtDecode(data.access_token);
      const now = +new Date();

      // sprawdzanie czy ciasteczka użytkownika są ważne
      if (userFromToken.exp * 1000 > now) dispatch(setUser(userFromToken));
      else {
        const freshUser = await (await getCurrentUser().unwrap()).user;
        dispatch(setUser(freshUser));
      }
    }

    if (!user && !access_token) {
      dispatch(setIsVerified(true));
      return;
    }

    if (access_token) {
      const userFromToken: DecodedUser = jwtDecode(access_token);
      const now = +new Date();

      // sprawdzanie czy ciasteczka użytkownika są ważne
      if (userFromToken.exp * 1000 > now) dispatch(setUser(userFromToken));
      else {
        const freshUser = await (await getCurrentUser().unwrap()).user;
        dispatch(setUser(freshUser));
      }
    }

    dispatch(setIsVerified(true));
  };

  useEffect(() => {
    try {
      initialize();
    } catch (err) {
      console.warn("Coś poszło nie tak podczas inicjacji użytkownika.");
    }
  }, [isVerified]);
};

export default useInitializeUser;
