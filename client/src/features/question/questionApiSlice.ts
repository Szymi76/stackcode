import { apiSlice } from "../../app/api/apiSlice";
import Question from "../../types/Question";

type AddQuestionBody = { title: string; content: object; tags: string[] };
type ToggleVoteBody = { questionID: string; vote: "up" | "down" };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // dodawanie nowego pytania
    addQuestion: build.mutation<void, AddQuestionBody>({
      query: (body) => ({
        url: "/question/add",
        method: "POST",
        body,
      }),
    }),

    // wybieranie pytania po tytule
    getQuestionByTitle: build.query<{ question: Question }, { questionTitle: string }>({
      query: ({ questionTitle }) => `/question/by-title/${questionTitle}`,
    }),

    // zmiana głosu
    toggleQuestionVote: build.mutation<{ votes: any }, ToggleVoteBody>({
      query: (body) => ({
        url: "/question/toggle-vote",
        method: "PATCH",
        body,
      }),
    }),

    // zmiana zaznaczonego pytania
    toggleMarkekQuestion: build.mutation<{ markedBy: string[] }, { questionID: string }>({
      query: (body) => ({
        url: "/question/toggle-marked",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useGetQuestionByTitleQuery,
  useToggleMarkekQuestionMutation,
  useToggleQuestionVoteMutation,
} = questionApiSlice;
