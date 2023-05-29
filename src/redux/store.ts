import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { worldMapReducer, worldMapName } from "./modules/world-map";
import { createLogger } from "redux-logger";

export const middlewareLogger = (production = false) =>
  createLogger({
    predicate: () => production === false,
  });

export const store = configureStore({
  reducer: combineReducers({
    [worldMapName]: worldMapReducer,
  }),
  middleware: [middlewareLogger()],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
