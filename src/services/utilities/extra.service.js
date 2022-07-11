// Dependencies
import { API_XTOKEN } from "../../constants"
import fetch from "./fetch.service"

export async function getSearchResult ({searchTerm, searchType, page, keywords}) {
    // search type in plain text
  let st = searchType === 0 ? 'movie' : 'tv';
  let pg = page ? page : 1;
  let fetchEndpoint = keywords ? `/search/keyword` : `/search/${st}`;

  return fetch({
    accessKey: API_XTOKEN,
    endpoint: fetchEndpoint,
    queries: [{name: 'query', value: searchTerm}, {name: 'page', value: pg}],
  })
  
}

