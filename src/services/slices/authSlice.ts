import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from '../../models'

const initialState: IAuthState = {
  name: null,
  token: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthState>) {
      state.name = action.payload.name
      state.token = action.payload.token
    },
    logout(state) {
      localStorage.clear()
      state.name = null
      state.token = null
    },
  },
})

export const authActions = AuthSlice.actions
export const authReducer = AuthSlice.reducer
