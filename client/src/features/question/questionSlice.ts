import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Question from "../../types/Question";

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
  },
});

export default questionSlice.reducer;
export const { setQuestion, toggleQuestionVote, toggleAnswerVote, toggleMarked } = questionSlice.actions;
