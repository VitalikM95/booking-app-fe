import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi, bookingApi } from './booking.api'
import { authReducer } from './slices/authSlice'
import { searchReducer } from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    [bookingApi.reducerPath]: bookingApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    search: searchReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(bookingApi.middleware)
      .concat(authApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
