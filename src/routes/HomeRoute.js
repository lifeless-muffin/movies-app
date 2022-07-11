// Dependencies
import React from 'react';
import styled from 'styled-components';
import {COLORS, FONTS, LISTS} from '../constants';

// Components
import SearchBar from '../components/search/SearchBar';
import { Link } from 'react-router-dom';

export default function HomeRoute ({...props}) {

  return (
  
    <HomeWrapper background={COLORS.primaryBackgroundColor} >
      <HomeContent>

        <AppDescription>
          <AppDescriptionText color={COLORS.textColorTypeC} fontFamily={FONTS.fontFamilyTypeC}> Moiva Entertainment <br/> An ad-free streaming platform </AppDescriptionText>
        </AppDescription>

        <SearchBarWrapper>
          
          <SearchBar
            query=''
            type={0}
            isInputOnFocus={false}
            isDropdownActive={false}
          />

          <PopularSearchesWrapper>  
            <PopularSearchesLabel fontFamily={FONTS.primaryFontFamily}>
              Popular Searches:
            </PopularSearchesLabel>
            <PopularSearchesList>

              {LISTS.listOfPopularSearches.map((popularSearchItem, index) => (
                <SearchItem key={index}>
                  <Link to={popularSearchItem.link} style={{textDecoration: "none"}}>
                    <SearchItemLink>
                      {popularSearchItem.query}
                    </SearchItemLink>
                  </Link>
                </SearchItem> 
              ))}      

            </PopularSearchesList>
          </PopularSearchesWrapper>

        </SearchBarWrapper>

      </HomeContent>
    </HomeWrapper>
  )
}




const SearchItemLink = styled.a `
  font-size: 14px;

  display: flex;
  align-items: center;
  text-decoration: none;
  color: #848A8F;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchItem = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
`;

const PopularSearchesList = styled.ul `
  list-style: none;
  display: flex;
  width: fit-content;
  column-gap: 15px;
`;

const PopularSearchesLabel = styled.span `
  font-family: ${props => props.fontFamily};
  font-size: 14px;

  display: flex;
  align-items: center;
  color: #969EA6;
`;

const PopularSearchesWrapper = styled.div `
  margin-top: 15px;
  column-gap: 15px;
  width: 100%;

  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarWrapper = styled.div `
  width: 650px;
`;

const AppDescriptionText = styled.span `
  text-align: center;
  color: ${props => props.color};

  font-family: ${props => props.fontFamily};
  font-size: 35px;
  font-weight: 300;
`;

const AppDescription = styled.div `
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const HomeContent = styled.div `
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  flex-direction: column;
  
  row-gap: 40px;
`;

const HomeWrapper = styled.div `
  background: ${props => props.background || "#FFFFFF"};
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding-bottom: 100px
`;