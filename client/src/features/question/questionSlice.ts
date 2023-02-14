import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Question from "../../types/Question";
import Comment from "../../types/Comment";
import Answer from "../../types/Answers";

const questionSlice = createSlice({
  name: "question",
  initialState: null as Question | null,
  reducers: {
    // ustawianie całego state-u
    setQuestion: (state, action: PayloadAction<Question | null>) => {
      return action.payload;
    },
    // zmiana głosów dla pytania
    toggleQuestionVote: (state, action: PayloadAction<{ votes: any }>) => {
      if (!state) return state;
      state.votes = action.payload.votes;
    },

    // zmiana zaznaczonego pytania
    toggleMarked: (state, action: PayloadAction<{ markedBy: string[] }>) => {
      if (!state) return state;
      state.markedBy = action.payload.markedBy;
    },

    // zmiana głosów dla odpowiedzi
    toggleAnswerVote: (state, action: PayloadAction<{ answerID: string; votes: any }>) => {
      const { answerID, votes } = action.payload;

      if (!state) return state;
      const index = state.answers.findIndex((a) => a._id == answerID);
      if (index < 0) return state;
      state.answers[index].votes = votes;
    },

    // dodawanie nowej odpowiedzi
    addAnswer: (state, action: PayloadAction<{ answer: Answer }>) => {
      if (!state) return state;

      state.answers.push(action.payload.answer);
    },

    // dodawanie nowego komentarza
    addComment: (state, action: PayloadAction<{ answerID: string; comment: Comment }>) => {
      const { answerID, comment } = action.payload;

      if (!state) return state;
      const index = state?.answers.findIndex((a) => a._id == answerID);
      if (index < 0) return state;
      // @ts-ignore
      state.answers[index].comments.push(comment);
    },

    changeVerificationTo: (state, action: PayloadAction<{ answerID: string; to: boolean }>) => {
      const { answerID, to } = action.payload;

      if (!state) return state;

      const index = state?.answers.findIndex((a) => a._id == answerID);

      state.answers[index].verified = to;
    },
  },
});

export default questionSlice.reducer;
export const {
  setQuestion,
  toggleQuestionVote,
  toggleAnswerVote,
  toggleMarked,
  addComment,
  addAnswer,
  changeVerificationTo,
} = questionSlice.actions;
