import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import questionReducer from "../features/question/questionSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  blacklist: ["question", apiSlice.reducerPath],
};

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: import.meta.env.DEV ? true : false,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
