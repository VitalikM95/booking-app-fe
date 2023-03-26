import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { searchActions } from './slices/searchSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from './store'
import { authActions } from './slices/authSlice'

const actions = {
  ...searchActions,
  ...authActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useIsAuth(): boolean {
  const isAuth = Boolean(useAppSelector(state => state.auth.token))
  return isAuth
}
