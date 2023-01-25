import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser, setIsVerified } from "../features/auth/authSlice";
import { useLogoutMutation, useGetCurrentUserMutation, useGetCookieQuery } from "../features/auth/authApiSlice";

// hook służy aby podczas pierwszego renderu pobrać użytkownika z ciasteczek i
// sprawdzić czy jest on jeszcze ważny.
const useInitializeUser = () => {
  const [logout] = useLogoutMutation();
  const [getCurrentUser] = useGetCurrentUserMutation();

  const dispatch = useAppDispatch();

  // inicjacja użytkownika
  const initialize = async () => {
    // if (user == null) return;
    try {
      const freshUser = await (await getCurrentUser().unwrap()).user;
      if (freshUser) dispatch(setUser(freshUser));
      else {
        dispatch(setUser(null));
        await logout().unwrap();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);
};

export default useInitializeUser;
