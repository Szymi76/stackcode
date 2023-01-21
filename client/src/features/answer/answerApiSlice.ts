import { apiSlice } from "../../app/api/apiSlice";

type AddAnswerBody = { questionID: string; content: any };
type ToggleAnswerVoteBody = { answerID: string; vote: "up" | "down" };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addAnswer: build.mutation<void, AddAnswerBody>({
      query: (body) => ({
        url: "/answer/add",
        method: "POST",
        body,
      }),
    }),
    toggleAnswerVote: build.mutation<{ votes: any }, ToggleAnswerVoteBody>({
      query: (body) => ({
        url: "/answer/toggle-vote",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useAddAnswerMutation, useToggleAnswerVoteMutation } = questionApiSlice;
