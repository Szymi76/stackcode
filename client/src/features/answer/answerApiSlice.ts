import { apiSlice } from "../../app/api/apiSlice";
import Answer from "../../types/Answer";

type AddAnswerBody = { questionID: string, content: string};

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addAnswer: build.mutation<void, AddAnswerBody>({
            query: (body) => ({
                url: "/answer/add",
                method: "POST",
                body
            })
        }),

    })
})

export const { useAddAnswerMutation } = questionApiSlice;