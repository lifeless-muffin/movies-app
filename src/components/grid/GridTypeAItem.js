// dependencies 
import React, { createRef, useEffect, useState } from 'react'
import { URL, MLIST, DROPDOWNS } from '../../constants'
import styled from 'styled-components'
import Icon from '../utilities/Icon';

export default function GridTypeAItem({data, type, query, setSelectedItem}) {

  type = DROPDOWNS.searchBarDropdown[type].toLowerCase()

  // if type is show then change the data a bit
  let title = type === 'movie' ? data.title : data.name;
  let release_date = type === 'movie' ? data.release_date : data.first_air_date;

  // use states
  const [posterHovered, setPosterHovered] = useState('');
  const [posterPath, setPosterPath] = useState('');

  const posterWrapperRef = createRef();
  // formatting the date, not that important
  const formatReleaseDate = () => {
    let rDate = release_date.split('-');
    let month = MLIST[parseInt(rDate[1] - 1)].slice(0, 3)
    return month + ' ' + rDate[2] + ' , ' + rDate[0]
  }

  // we'll return the formatted title
  const formatTitle = () => {
    if (title?.length > 19) return title?.slice(0, 20) + '...';
    return title
  }

  // getting image url
  const getPosterUrl = () => {
    return URL.tmdbImagesURL + `/p/w300/${data.poster_path}`
  }

  // set the poster path to broken image
  const brokenImage = () => {
    setPosterPath('/assets/images/fallback-image.png');
  }

  // update the selected movie or tv show
  const handleClick = () => {
    let updatedData = {title, release_date, ...data};
    setSelectedItem(updatedData);
  }

  useEffect(() => {
    // updating the poster path
    setPosterPath(getPosterUrl());

    const onMouseOver = () => setPosterHovered('hovered');
    const onMouseOut = () => setPosterHovered('not_hovered');

    posterWrapperRef.current?.addEventListener('mouseover', onMouseOver);
    posterWrapperRef.current?.addEventListener('mouseout', onMouseOut);

    return () => {
      posterWrapperRef.current?.removeEventListener('mouseover', onMouseOver);
      posterWrapperRef.current?.removeEventListener('mouseout', onMouseOut);
    }
  }, [])

  useEffect(() => setPosterPath(getPosterUrl), [data.poster_path])

  if (!release_date || !title) {
    return null;
  }

  if (!data) {
    return null;
  }
  
  return (
    <MainWrapper ref={posterWrapperRef}>
      <Button onClick={handleClick}>
        <PosterWrapper>
          <PosterOverlay hovered={posterHovered} className={posterHovered}>
            <PlayBtn className={posterHovered} />
          </PosterOverlay>
          <PosterImage>
            <Image
                className={posterHovered === 'hovered' && 'zoom_in' }
                src={posterPath}
                alt={formatTitle}
                onError={brokenImage}
            />
          </PosterImage>
          <RatingWrapper hovered={posterHovered} className={posterHovered}>
            <RatingIconWrapper>
              <Icon 
                iconFile='star-icon.svg'
                iconAlt='Star Icon'
                iconSize={{iconWidth: 15, iconHeight: 15}}
              />
            </RatingIconWrapper>
            <RatingText>
              {data.vote_average}
            </RatingText>
          </RatingWrapper>
        </PosterWrapper>
      </Button>
      <DescriptionWrapper>
        <Title>{formatTitle()}</Title>
        <Release>{formatReleaseDate()}</Release>
      </DescriptionWrapper>
    </MainWrapper>
  )
}

const Button = styled.div `
  width: auto;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingIconWrapper = styled.div `
  height: 100%;
  width: 20px;
  margin-right: 3px;

  display: flex;
  align-items: center;
  justify-content: center;  
`;

const RatingText = styled.span `
  color: white;
  font-size: 14px;
`;

const RatingWrapper = styled.div `
  bottom: 0px;
  right: 0px;
  width: 60px;
  height: 30px;
  z-index: 2;
  opacity: 0;
  background: rgba(255, 255, 255, 0.25);

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hovered {
    animation: fadeIn .8s forwards;
  }

  &.not_hovered {
    animation: fadeOut .8s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    };

    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    };

    to {
      opacity: 0;
    }
  }

`;

const PlayBtn = styled.div `
  width: 100%;
  height: 100%;
  background: url('/assets/icons/play-icon.svg') 50% 50% no-repeat;
  background-size: 40% 40%;
  opacity: 0;
`;

const Release = styled.span `
  font-size: 14px;
  width: 100%;

  display: flex;
  align-items: center;
  color: #71818A;
`;

const Title = styled.span `
  font-weight: 500;
  font-size: 14px;
  width: 100%;

  display: flex;
  align-items: center;
  color: #222D34;
`;

const DescriptionWrapper = styled.div `
  width: 100%;
  row-gap: 5px;

  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Image = styled.img `
  width: 100%;
  background-size: 100% 100%;
  min-height: 270px;
  max-height: 270px;

  height: auto;
  object-fit: cover;
  background-image: url(${props => props.src });
  transition: .3s ease;
`;

const PosterImage = styled.div `
  width: 100%;
  border-radius: 4px;
  min-height: 270px;
  max-height: 270px;
  overflow: hidden;

  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .zoom_in {
    transform: scale(1.08);
  }

`;

const PosterOverlay = styled.div `
  width: 100%;
  height: 100%;
  background: rgba(47, 49, 65, 0);
  z-index: 5;
  top: 0px;
  bottom: 0px;
  opacity: 0;

  backdrop-filter: none;
  position: absolute;

  ${PlayBtn}.hovered {
    animation: btnIn .3s forwards;
  }

  ${PlayBtn}.not_hovered {
    animation: btnOut .3s forwards;
  }

  @keyframes btnIn {
    from {
      opacity: 0;
      background-size: 60% 60%;
    };

    to {
      opacity: 1;
      background-size: 30% 30%;
    }
  }

  @keyframes btnOut {
    from {
      opacity: 1;
      background-size: 30% 30%;
    };

    to {
      opacity: 0;
      background-size: 60% 60%;
    }
  }

`;

const PosterWrapper = styled.div `
  width: 100%;

  cursor: pointer;
  height: fit-content;

  ${PosterOverlay}.hovered {
    animation: overlayIn .3s forwards;
    z-index: 2;
  }

  ${PosterOverlay}.not_hovered {
    animation: overlayOut .3s forwards;
    z-index: -1;
  }

  @keyframes overlayIn {
    from {
      backdrop-filter: blur(0px);
      opacity: 0;
      background: rgba(47, 49, 65, 0);
    };

    to {
      backdrop-filter: blur(4px);
      opacity: 1;
      background: rgba(47, 49, 65, 0.5);
    }
  }

  @keyframes overlayOut {
    from {
      backdrop-filter: blur(4px);
      opacity: 1;
      background: rgba(47, 49, 65, 0.5);
    };

    to {
      backdrop-filter: blur(0px);
      opacity: 0;
      background: rgba(47, 49, 65, 0);
    }
  }

`;

const MainWrapper = styled.div `
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  row-gap: 10px;
`;
