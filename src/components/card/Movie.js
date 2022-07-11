import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { API_XTOKEN, URL } from '../../constants';
import fetchEndpoint from '../../services/utilities/fetch.service';
import { updateStreamLoading } from '../../slicers/stateSlicer';
import StreamButton from '../buttons/StreamButton';
import MovieDetails from './MovieDetails';

export default function Movie({data, type, onKeyDown}) {

  const [loadingStreams, setLoadingStreams] = useState(true); 
  const [streamsList, setStreamsList] = useState([]);
  const [posterPath, setPosterPath] = useState('');

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let title = () => type === 1 ? data?.name : data?.title;
  const dispatch = useDispatch()

  // getting image url
  const getPosterUrl = () => {
    return URL.tmdbImagesURL + `/p/w500/${movieDetails?.poster_path}`
  }

  // set the poster path to broken image
  const brokenImage = () => {
    setPosterPath('/assets/images/fallback-image.png');
  }

  const updateMovieStreams = async () => {
    dispatch(updateStreamLoading(true))
  }

  // fetch and update movie details
  const updateMovieDetails = async ({endpoint}) => {
    let result = await fetchEndpoint({
      endpoint: endpoint,
      accessKey: API_XTOKEN
    })

    if (!result.success) {
      setLoading(false); 
      setError(true);
    }

    setMovieDetails(result.data);
    setLoading(false);
  }

  useEffect(() => {
    setPosterPath(getPosterUrl())
  }, [type, movieDetails])

  useEffect(async () => {

    let contentType = type === 1 ? 'tv' : 'movie'
    let movieDetailsEndpoint = `/${contentType}/${data?.id}`

    // fetch and update movie details
    updateMovieDetails({endpoint: movieDetailsEndpoint})
    updateMovieStreams()

  }, [data, type])


  if (loading) {
    return (
      <Wrapper onKeyDown={onKeyDown}>
        <h1>loading</h1>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper onKeyDown={onKeyDown}>
        <h1>Error occured</h1>
      </Wrapper>
    )
  }


  return (
    <Wrapper onKeyDown={onKeyDown}>
      <ColOne>
        <PosterWrapper>
          <PosterImage
            src={posterPath}
            alt={title}
            onError={brokenImage}
          />
        </PosterWrapper>

        <StreamButton
          streamLoading={loadingStreams}
        />

      </ColOne>

      <MovieDetails
        data={movieDetails}
        type={type}
      />
    </Wrapper>
  )
}

const PosterImage = styled.img `
  width: 100%;
  background-size: 100% 100%;

  height: auto;
  object-fit: cover;
  background-image: url(${props => props.src });
  transition: .3s ease;
`;

const PosterWrapper = styled.div `
  min-height: 250px;
  width: 210px;
  border-radius: 6px 6px 0px 0px;

  height: fit-content;
  overflow: hidden;
`;

const ColTwo = styled.div `
  width: 100%;
  height: 100%;   
`;

const ColOne = styled.div `
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div `
  width: 100%;
  padding: 5% 5%;
  column-gap: 30px;

  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;