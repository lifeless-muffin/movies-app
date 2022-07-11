// Dependencies
import axios from "axios";
import { API_XTOKEN, DROPDOWNS, URL } from "../../constants";

export default async function fetch ({...props}) {
  // destructuring properties
  const {endpoint, accessKey, queries} = props;

  let queriesString = `?api_key=${accessKey}`;
  
  if (queries) {
    queries.map((query) => {
      let queryString = `${query.name}=${query.value}`;
      queriesString = queriesString + `&${queryString}`
    })
  }

  let response = await axios({
    method: 'get',
    url: URL.tmdbApiURL + endpoint + queriesString,
  }) 

  .then((responseData) => ({ 
    data: responseData.data, 
    success: true, 
    status_code: responseData.status,
  }))

  .catch((error) => ({
    error: error,
    error_message: 'Something went wrong',
    status_code: 401, 
    success: false,
  }))

  return response;

}

export async function fetchSearchResults ({pageParam, query, searchType, callback, addOn}) {
  const type = DROPDOWNS.searchBarDropdown[searchType].toLowerCase() === 'movie' ? 'movie' : 'tv';
  const endpoint = `/search/${type}/`;

  if (!query) {
    return null;
  }

  const response = await fetch({
    endpoint,
    accessKey: API_XTOKEN,
    queries: [
      {name: 'page', value: pageParam},
      {name: 'query', value: query}
    ]
  });

  callback({data: response.data, addOn})  
  return response.data;
} 