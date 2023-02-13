import { apiSlice } from "../../app/api/apiSlice";
import type User from "../../types/User";

type LoginBody = { email: string; password: string };
type RegisterBody = { displayName: string; email: string; password: string };

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // wybieranie aktualnego użutkownika po ciasteczkach
    getCurrentUser: build.mutation<{ user: User }, void>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),

    // logowanie się
    login: build.mutation<{ user: User }, LoginBody>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // tworzenie konta
    register: build.mutation<{ user: User }, RegisterBody>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    // wylogowywanie się
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    // aktualizacja nazwy użytkownika
    updateDisplayName: build.mutation<{ user: User }, { displayName: string }>({
      query: (body) => ({
        url: "/auth/update-display-name",
        method: "PATCH",
        body,
      }),
    }),

    // upodate photo url
    updatePhotoURL: build.mutation<{ user: User }, { photoURL: string }>({
      query: (body) => ({
        url: "/auth/update-photo-url",
        method: "PATCH",
        body,
      }),
    }),

    // usuwanie konta
    deleteUser: build.mutation<void, void>({
      query: () => ({
        url: "/auth/delete-user",
        method: "DELETE",
      }),
    }),

    // zmiana hasła
    changePassword: build.mutation<{ user: User }, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateDisplayNameMutation,
  useUpdatePhotoURLMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
} = authApiSlice;
