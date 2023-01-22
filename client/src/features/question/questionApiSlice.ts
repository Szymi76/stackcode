import { apiSlice } from "../../app/api/apiSlice";
import Question from "../../types/Question";

type AddQuestionBody = { title: string; content: object; tags: string[] };
type ToggleVoteBody = { questionID: string; vote: "up" | "down" };

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // dodawanie nowego pytania
    addQuestion: build.mutation<{ question: Question }, AddQuestionBody>({
      query: (body) => ({
        url: "/question/add",
        method: "POST",
        body,
      }),
    }),

    // wybieranie pytania po tytule
    getQuestionById: build.query<{ question: Question }, { id: string }>({
      query: ({ id }) => `/question/by-title/${id}`,
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

    // zwraca stworzone przez użytkownika pytania
    getUserCreatedQuestions: build.query<{ questions: Question[] }, void>({
      query: () => "/questions/created-by-user",
    }),

    // zwraca zaznaczone przez użytkownika pytania
    getUserMarkedQuestions: build.query<{ questions: Question[] }, void>({
      query: () => "/questions/marked-by-user",
    }),

    // usuwa pytania po id
    deleteQuestion: build.mutation<void, { questionID: string }>({
      query: (body) => ({
        url: "/question/delete",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useGetQuestionByIdQuery,
  useToggleMarkekQuestionMutation,
  useToggleQuestionVoteMutation,
  useGetUserCreatedQuestionsQuery,
  useGetUserMarkedQuestionsQuery,
  useDeleteQuestionMutation,
} = questionApiSlice;
