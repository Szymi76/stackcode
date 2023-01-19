import { apiSlice } from "../../app/api/apiSlice";
import Question from "../../types/Question";

type AddQuestionBody = { title: string; content: object; tags: string[] };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addQuestion: build.mutation<Question, AddQuestionBody>({
      query: (body) => ({
        url: "/question/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddQuestionMutation } = questionApiSlice;
