import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchLoading: false, 
  streamLoading: false,
  detailsLoading: false,
  searchError: false,
  streamError: false, 
  detailsError: false,
};

export const stateSlicer = createSlice({
  name: 'APP_STATE', 
  initialState,
  reducers: {
    updateSearchLoading: (state, action) => {
      state.searchLoading = action.payload
    }, 
    updateSearchError: (state, action) => {
      state.searchError = action.payload
    }, 

    updateStreamLoading: (state, action) => {
      state.streamLoading = action.payload
    }, 
    updateStreamError: (state, action) => {
      state.streamError = action.payload
    }, 

    updateDetailsLoading: (state, action) => {
      state.detailsLoading = action.payload
    }, 
    updateDetailsError: (state, action) => {
      state.detailsError = action.payload
    }, 
  }
});

export const {
  updateSearchLoading, updateSearchError, 
  updateStreamLoading, updateStreamError,
  updateDetailsLoading, updateDetailsError
} = stateSlicer.actions;
export default stateSlicer.reducer;