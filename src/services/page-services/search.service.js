import { DROPDOWNS } from "../../constants";
import { sortArray } from "../utilities/sort.service.js";

const handleContentFilter = (props) => {
  // props
  const {
    searchResults,
    results, 
    filters, 
    callback
  } =  props;

  let searchResultsCopy = results ? [...results] : [...searchResults];
  if (searchResultsCopy.length < 1) return null;

  // setting sort by
  // order decides which way to start from
  // scenario:- if order is 'decending' then we start from the top results and viceversa
  let order_by = filters.order === 0 ? -1 : 1;
  let sort_by = DROPDOWNS.filterSortDropdown[filters.sort].toLowerCase();

  // add parsed release date to all results
  searchResultsCopy.map((result, index) => {
    let resultReleaseDate = result?.release_date; 
    searchResultsCopy[index].parsedReleaseDate = !resultReleaseDate ? 0 : parseInt(resultReleaseDate.split('-').join(''));
  })

  // sort search resutls copy array
  let sortedArray = sortArray({array: searchResultsCopy, sortBy: sort_by, order: order_by, type: filters.type});

  // check if sorted array is not the same as the current array; 
  return callback(sortedArray);
}

export {handleContentFilter};