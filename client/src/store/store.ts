import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from "../store/features/messages/messagesSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']