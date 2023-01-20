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
    // zmiana vote w momencie kliknięcia "up"
    toggleVoteUp: (state, action: PayloadAction<{ userID: string }>) => {
      const { userID } = action.payload;

      if (!state) return state;

      if (state.votes.down.includes(userID)) {
        state.votes.down = state.votes.down.filter((id) => id != userID);
        state.votes.up = [...state.votes.up, userID];
      } else if (state.votes.up.includes(userID)) {
        state.votes.up = state.votes.up.filter((id) => id != userID);
      } else {
        state.votes.up = [...state.votes.up, userID];
      }
    },
    // zmiana vote w momencie kliknięcia "down"
    toggleVoteDown: (state, action: PayloadAction<{ userID: string }>) => {
      const { userID } = action.payload;

      if (!state) return state;

      if (state.votes.up.includes(userID)) {
        state.votes.up = state.votes.up.filter((id) => id != userID);
        state.votes.down = [...state.votes.down, userID];
      } else if (state.votes.down.includes(userID)) {
        state.votes.down = state.votes.down.filter((id) => id != userID);
      } else {
        state.votes.down = [...state.votes.down, userID];
      }
    },
    // zmiana zaznaczonego pytania
    toggleMarked: (state, action: PayloadAction<{ userID: string }>) => {
      const { userID } = action.payload;

      if (!state) return state;

      if (state.markedBy.includes(userID)) state.markedBy = state.markedBy.filter((id) => id != userID);
      else state.markedBy = [...state.markedBy, userID];
    },
  },
});

export default questionSlice.reducer;
export const { setQuestion, toggleVoteUp, toggleVoteDown, toggleMarked } = questionSlice.actions;
