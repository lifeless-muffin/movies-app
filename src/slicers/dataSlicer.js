import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	contentDetails: {},
	contentList: [],	
};

export const dataSlicer = createSlice({
  name: 'APP_DATA', 
  initialState,
  reducers: {
    updateDetails: (state, action) => {
      state.contentDetails = action.payload
    }, 
    updateList: (state, action) => {
      state.contentList = action.payload
    }, 
  }
});

export const {updateList, updateDetails} = dataSlicer.actions;
export default dataSlicer.reducer;