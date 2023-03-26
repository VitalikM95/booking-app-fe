import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearchState } from '../../models'

const initialState: ISearchState = {
  destination: '',
  dates: [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
}

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchInfo(state, action: PayloadAction<ISearchState>) {
      const { destination, dates, options } = action.payload
      state.destination = destination
      state.dates = dates
      state.options = options
      localStorage.setItem(
        'searchInfo',
        JSON.stringify({
          destination,
          dates,
          options,
        })
      )
    },
  },
})

export const searchActions = SearchSlice.actions
export const searchReducer = SearchSlice.reducer
