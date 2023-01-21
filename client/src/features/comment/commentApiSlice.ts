import { apiSlice } from "../../app/api/apiSlice";
import Comment from "../../types/Comment";

type AddCommentBody = { questionID: string; answerID: string; content: string };

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation<{ comment: Comment }, AddCommentBody>({
      query: (body) => ({
        url: "/comment/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddCommentMutation } = commentApiSlice;
