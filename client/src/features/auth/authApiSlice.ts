import { apiSlice } from "../../app/api/apiSlice";
import type User from "../../types/User";

type LoginBody = { email: string; password: string };
type RegisterBody = { displayName: string; email: string; password: string };

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.mutation<{ user: User }, void>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
    login: build.mutation<{ user: User }, LoginBody>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: build.mutation<{ user: User }, RegisterBody>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentUserMutation, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
