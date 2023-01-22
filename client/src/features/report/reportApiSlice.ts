import { apiSlice } from "../../app/api/apiSlice";

export type AddReportBody = {
  id: string;
  text: string;
  reasons: string[];
  for: "question" | "answer" | "comment" | "user";
};

const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addReport: build.mutation<void, AddReportBody>({
      query: (body) => ({
        url: "/report/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddReportMutation } = reportApiSlice;
