import { createSlice } from "@reduxjs/toolkit";

// search bar reducer's initial state
const initialState = {
  type: 0, 
  order: 0,
  sort: 0,
  genre: 0,
}

// the reducer itself
export const filtersSlicer = createSlice({
  name: 'FILTERS_SLICER',
  initialState,
  reducers: {
    SET_FILTER_TYPE: (state, action) => {
      state.type = action.payload
    },
    SET_FILTER_ORDER: (state, action) => {
      state.order = action.payload
    },
    SET_FILTER_SORT: (state, action) => {
      state.sort = action.payload
    },
    SET_FILTER_GENRE: (state, action) => {
      state.genre = action.payload
    },
    SET_FILTER_STATE: (state, action) => {
      state[action.payload.key] = action.payload.value
    }
  }
})

export const {
  SET_FILTER_STATE,
  SET_FILTER_GENRE,
  SET_FILTER_ORDER,
  SET_FILTER_SORT, 
  SET_FILTER_TYPE
} = filtersSlicer.actions;
export default filtersSlicer.reducer;