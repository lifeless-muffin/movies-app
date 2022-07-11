import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

import FiltersSection from '../components/filter/FiltersSection';
import {initializeFilters} from '../services/utilities/sort.service.js'
import GridTypeA from '../components/grid/GridTypeA';
import NavSearchBar from '../components/navbar/NavSearchBar';
import Icon from '../components/utilities/Icon';
import DisplayCard from '../components/card/DetailsDisplayCard';
import { useSelector } from 'react-redux';
import { handleContentFilter } from '../services/page-services/search.service';
import { fetchSearchResults } from '../services/utilities/api.service';
import { DROPDOWNS } from '../constants';

export default function SearchRoute () {

  // Component Variables
  const navigate = useNavigate();
  const {search} = useLocation();
    
  const query = new URLSearchParams(search);
  let queryParam = query.get('query');
  
  // Send user to '/' if nothing has been searched for
  if (!queryParam || queryParam.length < 1) {
    navigate('/');
  } 
  
  let getQueryTypeIndex = (type) => type === 'show' ? 1 : 0;
  let getQueryTypeName = (index) => index === 1 ? 'show' : 'movie';
  let queryType = getQueryTypeIndex(query.get('type'));

  // states and references
  const componentMounted = useRef(true);
  const filtersState = useSelector(states => states.filters)
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([])
  const [selectedItem, setSelectedItem] = useState({});
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false)
  const [pageParams, setPageParams] = 
    useState({page: 0, total_pages: 0, total_results: 0});

  // handle content render
  const SearchGridRenderer = () => {
    if (searchLoading) {return null}
    
    if (JSON.stringify(filtersState) !== JSON.stringify(initializeFilters({searchType: filtersState.type}))) {
      return <GridTypeA 
        gridData={filteredResults} 
        type={filtersState.type} 
        query={searchTerm} 
        setSelectedItem={setSelectedItem} 
      />
    }

    return <GridTypeA 
      gridData={searchResults} 
      type={filtersState.type} 
      query={searchTerm} 
      setSelectedItem={setSelectedItem} 
    />
  }

  const filterCallback = (filteredResponse) => {
    setFilteredResults(filteredResponse)
  }

  // this function will filter the results
  const filterResults = (results) => {
    handleContentFilter({
      results,
      searchResults,
      filters: filtersState,
      callback: filterCallback
    })
  }

  const handleTypeChange = () => {
    let redirectTo = location.href.split('&type=')[0];
    navigate('?query=' + queryParam + '&type=' + DROPDOWNS.searchBarDropdown[filtersState.type].toLowerCase(), {replace: true})
  }

  const handleInputChange = (input) => {
    setSearchTerm(input)
  }

  const handleResults = async ({data, addOn}) => {
    let updatedResultsList = addOn ? [
      ...searchResults,
      ...data.results
    ] : data.results

    setPageParams({
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    })
    
    setSearchResults(updatedResultsList);
    filterResults(updatedResultsList);
    setSearchLoading(false);
    setLoadingMore(false);
  }

  const handleLoadMore = async () => {
    let shouldFetchMore = !searchLoading && !loadingMore; 
    let isNextPage = pageParams.page < pageParams.total_pages;
    
    if (!shouldFetchMore || !isNextPage || searchError) {
      return false;
    }

    setLoadingMore(true);
    let response = await fetchSearchResults({
      callback: handleResults,
      query: searchTerm,
      searchType: filtersState.type,
      pageParam: pageParams.page + 1,
      addOn: true
    })
  }

  const handleSearchRequest = async ({addOn}) => {
    if (!searchTerm) {
      return null;
    }
    
    setSearchLoading(true);
    let response = await fetchSearchResults({
      addOn: addOn || false,
      callback: handleResults,
      query: searchTerm,
      searchType: filtersState.type,
    })
  }

  const handleScrollBehavior = (event) => {
    if (Object.keys(selectedItem).length > 0) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (componentMounted.current) handleSearchRequest({addOn: true}); 
    return () => {componentMounted.current = false};
  }, [])

  useEffect(() => {
    if (filtersState.type !== queryType) return handleTypeChange();
    filterResults();
  }, [filtersState])

  useEffect(() => {
    setPageParams({page: 0, total_pages: 0, total_results: 0});
    handleSearchRequest({addOn: false});
  }, [queryType])
  
  return (
    <Wrapper className={Object.keys(selectedItem).length > 0 ? 'pt-scroll' : ''}>
      
      <DisplayCard
        selectedItem={selectedItem}
        itemType={getQueryTypeName(filtersState.type)}
        setSelectedItem={setSelectedItem}
      />

      <MainWrapper>

        <Navbar>
          <FiltersSection
            searchType={queryType}
          />
        </Navbar>

        <SearchWrapper>
          <SearchHeader>
            <NavSearchBar 
              query={decodeURI(searchTerm)}
              setQuery={handleInputChange}
              type={filtersState.type}/>    
          </SearchHeader>
          
          <Content className={Object.keys(selectedItem).length > 0 ? 'pt-scroll' : ''}>
            {searchLoading ? ((
              <LoaderWrapper>
                <Loader>
                  <Icon 
                    iconSize={{iconWidth: 50, iconHeight: 50}}
                    iconFile='loading-icon.svg'
                    iconAlt='Loading results'
                  />
                </Loader>
              </LoaderWrapper>
            )) : (SearchGridRenderer())}

            {!searchLoading && !loadingMore && pageParams.page < pageParams.total_pages && (
              <ButtonWrapper onClick={handleLoadMore}>
                <ButtonText>
                  Load more
                </ButtonText> 
            </ButtonWrapper>
            )}

            {loadingMore && (
              <LoaderWrapper>
                <Loader>
                  <Icon 
                    iconSize={{iconWidth: 30, iconHeight: 30}}
                    iconFile='loading-icon.svg'
                    iconAlt='Loading results'
                  />
                </Loader>
              </LoaderWrapper>
            )}

          </Content>

        </SearchWrapper>
      </MainWrapper>
    </Wrapper>
  );

}

const ButtonText = styled.span `

`;

const ButtonWrapper = styled.button `
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Loader = styled.div `

`;

const LoaderWrapper = styled.div `
  width: 70%; 
  height: 150px;

  display: flex;
  align-items: center; 
  justify-content: center;
`;

const Navbar = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 10px;
`;

const Content = styled.div `
  width: 100%;
  padding-bottom: 35px;

  height: auto;
  display: flex;
  flex-direction: column; 
`;

const SearchHeader = styled.div `
  width: 100%;
  height: 100%;
  padding-right: 230px;

  display: flex;
  align-items: center;
  justify-content: center;

  .pt-scroll {
    height: calc(100vh - 113px);
    overflow: hidden;
  }

  @media screen and (max-width: 1150px) {
    padding-right: 0px;
  }
`;

const SearchWrapper = styled.div `
  width: 100%;
  height: 650px;
  row-gap: 28px;
  grid-template-rows: 50px 1fr;

  display: grid;
`;

const MainWrapper = styled.div `
  width: 90%;
  max-width: 1300px;
  column-gap: 35px;
  grid-template-columns: 230px 1fr;
  padding-top: 35px;

  display: grid;
  height: fit-content;
`;

const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  z-index: 1;

  display: flex;
  justify-content: center;

  .pt-scroll {
    height: calc(100vh - 113px);
    overflow: hidden;
  }
`;