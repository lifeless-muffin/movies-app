import React from 'react'
import styled from 'styled-components'
import Icon from '../utilities/Icon'

export default function MovieDetails({data, type}) {

  let title = () => type === 1 ? data?.name : data?.title;
  let releaseDate = () => type === 1 ? data?.first_air_date : data?.release_date;
  let releaseYear = releaseDate().split('-')[0];

  const extraDetailRenderer = ({heading, value}) => {
    return (
      <ExtraDetail>
        <EDHeader>
          <EDHHeading>
            {heading}
          </EDHHeading>
        </EDHeader>

        <EDValue>
          <EDVText>
            {value}
          </EDVText>
        </EDValue>
      </ExtraDetail>
    )
  }

  const titleRenderer = () => {
    return (
      <Title>
        <TitleText>
          {title()}
        </TitleText>
        <ReleaseYear>
          ({releaseYear})
        </ReleaseYear>
      </Title>
    )
  }

  const rTItemRenderer = (text) => {
    return (
      <RTItem>
        <RTItemText>
          {text}
        </RTItemText>
      </RTItem>
    )
  }

  const rTSeperatorRenderer = () => {
    return (
      <RTSeperator>
        <Icon 
          iconFile="circle-fill-icon.svg"
          iconSize={{iconHeight: 4, iconWidth: 4}}
          iconAlt="Small Circle Seperator"
        />
      </RTSeperator>    
    )
  }

  const rowTwoRenderer = () => {
    return (
      <RTList>
        {rTItemRenderer(releaseDate())}        
        {rTSeperatorRenderer()}
        {rTItemRenderer(data?.genres?.length > 0 ? data.genres[0].name : '???')}        
        {rTSeperatorRenderer()}
        {rTItemRenderer(data?.status)}        
        {rTSeperatorRenderer()}
        {rTItemRenderer(type === 0 ? 'Movie' : data?.type)}        
      </RTList>
    )
  }

  const rowFourRenderer = () => {
    return (
      <RThList>
        {extraDetailRenderer({
          heading: 'Language', 
          value: data?.spoken_languages?.length > 0 ? data.spoken_languages[0]?.english_name : '???'
        })}

        {extraDetailRenderer({
          heading: 'Rating', 
          value: `${data?.vote_average} / 10` || '???'
        })}

        {extraDetailRenderer({
          heading: 'Company', 
          value: data?.production_companies?.length > 0 ? data.production_companies[0]?.name : '???'
        })}
      </RThList>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Wrapper>  
      <Title>
        {titleRenderer()}
      </Title>

      <RowTwo>
        {rowTwoRenderer()}
      </RowTwo>

      <RowThree>
        {extraDetailRenderer({
          heading: 'Overview', 
          value: data?.overview
        })}
      </RowThree>

      <RowFour>
        {rowFourRenderer()}
      </RowFour>
    </Wrapper>
  )
}

const RThList = styled.ul `
  list-style: none; 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr;
`;

const RowFour = styled.div `
  width: 100%; 

  height: fit-content;
`;

const RowThree = styled.div `
  margin: 20px 0px 30px 0px; 
  width: 100%;
  
  height: fit-content;
`;

const EDVText = styled.span `
  font-weight: 400;
  font-size: 14px;

  color: #858A90;
`;

const EDValue = styled.div `
  width: fit-content; 
  height: fit-content; 
  display: flex;
  align-items: flex-start;
`;

const EDHHeading = styled.span `
  font-weight: 500;
  font-size: 14px;

  color: #565A5F;
`;

const EDHeader = styled.div `
  width: fit-content; 
  height: fit-content; 
  display: flex;
  align-items: flex-start;
`;

const ExtraDetail = styled.div `
  display: flex;
  width: fit-content; 
  height: fit-content; 
  flex-direction: column;

  row-gap: 6px;
`;

const RTSeperator = styled.div `
  width: 30px;

  align-items: center;
  justify-content: center;
  display: flex;
`;

const RTItemText = styled.span `
  font-weight: 400;
  font-size: 16px;

  color: #858A91;
`;

const RTItem = styled.div `
  width: fit-content; 
  height: fit-content;

  display: flex;
  align-items: center; 
  justify-content: center;
`;

const RTList = styled.div `
  display: flex;
  align-items: center;
`;

const RowTwo = styled.div `
  display: flex;
  height: fit-content;

  width: 100%; 
`;

const ReleaseYear = styled.span `
  font-weight: 300;
  font-size: 20px;

  display: inline;
  color: #7A7A7A;
`;

const TitleText = styled.span `
  font-size: 20px;
  font-weight: 600;
  margin-right: 6px;
  
  width: fit-content;
  font-style: normal;
  display: inline;
  color: #383F49;
`;

const Title = styled.div `
  margin-bottom: 5px;
`;

const Wrapper = styled.div `
  width: 100%;
  row-gap: 10px;
  margin-bottom: 5px;

  height: fit-content;
`;
