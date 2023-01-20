import { apiSlice } from "../../app/api/apiSlice";
import Comment from "../../types/Comment";

type AddCommentBody = { answerID: string, text: string};

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addComment: build.mutation<void, AddCommentBody>({
            query: (body) => ({
                url: "/comment/add",
                method: "POST",
                body
            })
        }),

    })
})

export const { useAddCommentMutation } = commentApiSlice;