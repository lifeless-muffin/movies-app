// dependencies 
import React from 'react'
import styled from 'styled-components';

// components
import GridTypeAItem from './GridTypeAItem';

export default function GridTypeA({gridData, type, query, setSelectedItem}) {

  // this would map grid data
  // and then return gridItem for each item
  const getGridList = () => {
    return gridData.map((gridItem, index) => {
      
      // if it's movie, then do this if statement
      if (type === 0) {
        if (gridItem.title !== '' && gridItem.release_date !== '') {
          return (
            <GridTypeAItem 
              data={gridItem} 
              key={index} 
              type={type} 
              query={query} 
              setSelectedItem={setSelectedItem} 
          />)
      }}

      // if it's show, then do this if statement
      if (type === 1) {
        if (gridItem.name !== '' && gridItem.first_air_date !== '') {
          return (
            <GridTypeAItem 
              data={gridItem} 
              key={index} 
              type={type} 
              query={query} 
              setSelectedItem={setSelectedItem} 
            />)
      }}
    })
  }

  return (
    <MainWrapper>
      <MainGrid>
        {getGridList()}
      </MainGrid>
    </MainWrapper>
  )

}

const MainGrid = styled.ul `
  display: grid;
  justify-content: space-evenly;
  align-items: space-between;

  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 175px));
  grid-gap: 2rem 0.95rem;
`;

const MainWrapper = styled.div `
  width: 100%;
  padding-bottom: 35px;

  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;