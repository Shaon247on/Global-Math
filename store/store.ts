import { configureStore } from '@reduxjs/toolkit'
import {mainApi} from "./slice/apiSlice"


export const makeStore = () => {
  return configureStore({
    reducer: {
      [mainApi.reducerPath]: mainApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']