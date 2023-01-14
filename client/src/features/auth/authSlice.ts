import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User";

type Auth = {
  user: User | null;
  isVerified: boolean;
};

// verify - zmiana na true spowoduje ponowne pobranie użytkownika z ciasteczek

const initialState: Auth = {
  user: null,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setIsVerified } = authSlice.actions;
