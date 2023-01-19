import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Question from "../../types/Question";

const questionSlice = createSlice({
  name: "question",
  initialState: null as Question | null,
  reducers: {
    setQuestion: (state, action: PayloadAction<Question | null>) => {
      return action.payload;
    },
    toggleVote: (state, action: PayloadAction<{ vote: "up" | "down"; userID: string }>) => {
      const { vote, userID } = action.payload;

      // if(state == null) return state;
    },
  },
});

export default questionSlice.reducer;
export const { setQuestion, toggleVote } = questionSlice.actions;
