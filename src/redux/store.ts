import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { worldMapReducer, worldMapName } from './modules/world-map/world-map'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
    [worldMapName]: worldMapReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
