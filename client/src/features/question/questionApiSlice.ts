import { apiSlice } from "../../app/api/apiSlice";
import Question from "../../types/Question";

type AddQuestionBody = { title: string; content: object; tags: string[] };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addQuestion: build.mutation<void, AddQuestionBody>({
      query: (body) => ({
        url: "/question/add",
        method: "POST",
        body,
      }),
    }),
    getQuestionByTitle: build.query<{ question: Question }, { questionTitle: string }>({
      query: ({ questionTitle }) => `/question/by-title/${questionTitle}`,
    }),
    
  }),
});

export const { useAddQuestionMutation, useGetQuestionByTitleQuery } = questionApiSlice;
