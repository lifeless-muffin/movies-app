import { createSlice } from "@reduxjs/toolkit";

// search bar reducer's initial state
const initialState = {
  query: '', 
  isInputOnFocus: false, 
  isDropdownActive: false,
}

// the reducer itself
export const searchBarSlicer = createSlice({
  name: 'SEARCHBAR_SLICER',
  initialState,
  reducers: {
    SET_SEARCHBAR_QUERY: (state, action) => {
      state.query = action.payload
    },
    SET_SEARCHBAR_FOCUS_STATE: (state, action) => {
      state.isInputOnFocus = action.payload
    },
    SET_SEARCHBAR_DROPDOWN_STATE: (state, action) => {
      state.isDropdownActive = action.payload
    },
  }
})

export const {
 SET_SEARCHBAR_DROPDOWN_STATE,
 SET_SEARCHBAR_FOCUS_STATE,
 SET_SEARCHBAR_QUERY,
} = searchBarSlicer.actions;
export default searchBarSlicer.reducer;