import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../../features/auth/authSlice";

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_SERVER_URL
  : import.meta.env.VITE_PROD_SERVER_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

// @ts-ignore
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    const res = await baseQuery("/auth/refresh", api, extraOptions);

    if (res.meta?.response?.status === 200) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setUser(null));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({}),
});
