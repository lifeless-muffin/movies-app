// Dependencies
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SimilarKeywordsSection({similarKeywords}) {

  const renderGrid = () => {
    similarKeywords.results.map((result) => {
      return (
        <GridItem>
            <Link to='/unavailable' style={{textDecoration: 'none'}}>
              <Button>
                <ButtonText>
                  {result.name}
                </ButtonText>
              </Button>
            </Link>
        </GridItem>
      )
    })
  }

  return (

    <MainWrapper>
      
      <Header>
        <HeaderText>
            Similar Search Keywords
        </HeaderText>
      </Header>

      <Content>
        <Grid>
          {renderGrid()}
        </Grid>
      </Content>

    </MainWrapper>
  )
}

const ButtonText = styled.span `
	font-size: 14px;

	text-align: center;
	color: #5A5E62;
`;

const Button = styled.button `
  background: #EFF1F3;
  border: none;
  outline: none;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  padding: 0px 22px;
  height: 32px;
  border-radius: 6px;
`;

const GridItem = styled.div `
  width: 100%;
  height: auto;
`;

const Grid = styled.div `
  width: 100%;
  padding: 0px 10px; 
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 8px;

  display: grid;
`;

const Content = styled.div `
  width: 100%;
  height: fit-content;
`;

const HeaderText = styled.span `
  font-size: 16px;
  
  display: flex;
  align-items: center;
  color: #56595B;
`;

const Header = styled.div `
  height: 50px;
  padding-left: 10px;
  width: 100%;

  display: flex;
  align-items: center;
`;

const MainWrapper = styled.div `
  width: 100%;
  row-gap: 5px;
  padding-bottom: 20px;
  
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
