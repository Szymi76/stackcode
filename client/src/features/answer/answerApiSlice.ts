import { apiSlice } from "../../app/api/apiSlice";
import Answer from "../../types/Answers";

type AddAnswerBody = { questionID: string; content: string };
type ToggleAnswerVoteBody = { answerID: string; vote: "up" | "down" };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addAnswer: build.mutation<{ answer: Answer }, AddAnswerBody>({
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
