import { createSlice } from "@reduxjs/toolkit";

// search reducer's initial state
const initialState = {
  error: false,
  loading: false,
  loadingPage: false,
  filtered: false,
  total: 0,
  current: 0,
  payload: {
    query: '', 
    result: [],
    filteredResult: []
  }
}

// the reducer itself
export const searchSlicer = createSlice({
  name: 'SEARCH_SLICER',
  initialState,
  reducers: {
    SET_SEARCH_ERROR: (state, action) => {
      state.error = action.payload
    },
    SET_SEARCH_LOADING: (state, action) => {
      state.loading = action.payload
    },
    SET_SEARCH_LOADING_PAGE: (state, action) => {
      state.loadingPage = action.payload
    },
    SET_SEARCH_FILTERED: (state, action) => {
      state.filtered = action.payload
    },
    SET_SEARCH_TOTAL: (state, action) => {
      state.total = action.payload
    },
    SET_SEARCH_CURRENT: (state, action) => {
      state.current = action.payload
    },
    SET_SEARCH_PAYLOAD: (state, action) => {
      state.payload = action.payload
    },
  }
})

export const {
  SET_SEARCH_LOADING,
  SET_SEARCH_ERROR, 
  SET_SEARCH_LOADING_PAGE, 
  SET_SEARCH_FILTERED,
  SET_SEARCH_TOTAL,
  SET_SEARCH_CURRENT,
  SET_SEARCH_PAYLOAD
} = searchSlicer.actions;
export default searchSlicer.reducer;