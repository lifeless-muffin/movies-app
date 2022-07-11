import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import MovieDetails from './Movie';

export default function DisplayCard({selectedItem, itemType, setSelectedItem}) {

  const [type, setType] = useState(false);      
  const [content, setContent] = useState({});

  const cardCleanup = () => {
    setType(false)
    setContent(false)
  }

  const handleOverlayClick = () => {
    setSelectedItem({});
    cardCleanup();
  } 

  const handleCardKeydown = (event) => {
    console.log(event.key)
    if (event.key === 'esc') cardCleanup();
  }

  useEffect(() => {

    // clean the mess of previous selections
    cardCleanup()

    // update the data
    setType(itemType);
    setContent(selectedItem || {});

  }, [selectedItem])

  if (Object.keys(content).length < 1 || !type) {
    return (
      <PHWrapper>
        Movie or TV-show Display Card
      </PHWrapper>
    )
  }

  return (
    <Wrapper>
      <Overlay onClick={handleOverlayClick}></Overlay>
      <Card onKeyDown={handleCardKeydown}>
        {type === 'movie' ? 
          (<MovieDetails onKeyDown={handleCardKeydown} data={selectedItem} type={0} />) : 
          (<MovieDetails onKeyDown={handleCardKeydown} data={selectedItem} type={1} />)
        }
      </Card>
    </Wrapper>
  )

}

const Card = styled.div `
  min-height: 310px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  width: 800px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  transform: translate(-50%,-50%);

  position: absolute;
  background: white;
`;

const Overlay = styled.div `
  width: 100%;
  height: 100%;
  background: rgba(119, 120, 121, 0.60);

  pointer-events: auto;
`;

const Wrapper = styled.div `
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  z-index: 10;

  position: fixed;
`;

const PHWrapper = styled.div `
  display: none;
`;
