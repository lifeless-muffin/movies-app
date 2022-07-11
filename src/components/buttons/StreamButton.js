import React from 'react';
import Icon from '../utilities/Icon';
import styled from 'styled-components';

export default function Button({streamLoading}) {

	const StreamPlayButton = () => {
		return (
			<StreamButton>
				<Icon 
					iconFile='play-fill-icon.svg'
					iconAlt='Stream Button Icon'
					iconSize={{
							iconWidth: 16, 
							iconHeight: 16
					}}
				/>

				<ButtonText>
					Watch Now
				</ButtonText>
			</StreamButton>
		)
	}

	const StreamLoadingButton = () => {
		return (
			<LoaderWrapper>
				<Loader>
					<Icon 
						iconSize={{iconWidth: 30, iconHeight: 30}}
						iconFile='loading-icon.svg'
						iconAlt='Loading results'
					/>
				</Loader>
			</LoaderWrapper>
		)
	}

	if (streamLoading) {
		return (
			<StreamWrapper>
				{StreamLoadingButton()}
			</StreamWrapper>
		)
	}

  return (
    <StreamWrapper>
			{StreamPlayButton()}
		</StreamWrapper>
  )
}

const Loader = styled.div `
	width: fit-content; 
	height: fit-content;
`;

const LoaderWrapper = styled.div `
	width: 100%; 
	height: 100%; 	

	display: flex;
	align-items: center;
	justify-content: center;
	background: #EFF1F3;
`;

const ButtonText = styled.span `
  font-weight: 600;
  font-size: 16px;

  display: flex;
  align-items: center;
  color: #FFFFFF;
`;

const PlayIcon = styled.div `
  width: fit-content;
  height: fit-content;

  display: flex;
  align-items: center; 
  justify-content: center;
`;

const StreamButton = styled.button `
  width: 100%; 
  height: 100%; 
  column-gap: 8px;

  display: flex;
  background-color: #004973;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StreamWrapper = styled.div `
  width: 100%;
  height: 48px; 
  margin-top: -5px;
  border-radius: 0px 0px 6px 6px;
  
  overflow: hidden;
`;