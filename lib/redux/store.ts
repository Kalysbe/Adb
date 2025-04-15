import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import usersReducer from "./slices/usersSlice"
import declarationsReducer from "./slices/declarationsSlice"
import clientsReducer from "./slices/clientsSlice"
import analyticsReducer from "./slices/analyticsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    declarations: declarationsReducer,
    clients: clientsReducer,
    analytics: analyticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
