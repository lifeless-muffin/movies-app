import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./reducers/filtersReducer";
import searchBarReducer from "./reducers/searchBarReducer";
import searchReducer from "./reducers/searchReducer";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    searchBar: searchBarReducer,
    filters: filtersReducer,
  }
})  