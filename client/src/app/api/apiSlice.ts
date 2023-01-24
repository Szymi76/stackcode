import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsVerified, setUser } from "../../features/auth/authSlice";
import { Mutex } from "async-mutex";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const SERVER_URL = import.meta.env.DEV ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_PROD_SERVER_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://stackcode.win/api",
  credentials: "include",
});

// funkcja w przypadku odrzucenia zapytania ze statusem 403, próbuje odświerzyć token i ponowić próbe pierwotnego zapytania
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // czekanie na odblokowanie - /auth/refresh
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // @ts-ignore // blok który odbędzie się jeśli wystąpił brak autoryzacji
  if (result?.error && result.error?.originalStatus === 403) {
    // sprawdzanie czy /auth/refresh jest odblokowany
    if (!mutex.isLocked()) {
      // funkcja do zwolnienia /auth/refresh
      const release = await mutex.acquire();
      try {
        // próba odświerzenia tokena
        const res = await baseQuery("/auth/refresh", api, extraOptions);

        // jesli się udało to ponowna próba pierwotnego zapytania
        if (res.meta?.response?.status === 200) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          // w przeciwnym razie wylogowanie uzytkownika
          await baseQuery("/auth/logout", api, extraOptions);
          api.dispatch(setUser(null));
          api.dispatch(setIsVerified(true));
        }
      } finally {
        //zwolnienie /auth/refresh
        release();
      }
    } else {
      // czekanie na odblokowanie i próba pierwotnego zapytania
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({}),
});
