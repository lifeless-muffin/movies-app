// Dependencies
import React, {useEffect} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router';

// Constants Variables
import {BORDERS, COLORS, FONTS, DROPDOWNS} from '../../constants';
import Icon from '../utilities/Icon';

export default function NavSearchBar ({...props}) {
  
  // Component Variables 
  const navigate = useNavigate();

  // Component States
  const [query, setQuery] = React.useState(props.query);
  const [type, setType] = React.useState(props.type);

  // Component Functions 
  const handleInput = (event) => {setQuery(event.target.value)}

  const handleSearchButton = () => {
    if (query.length > 0) {
      navigate(`/search?query=${encodeURI(query)}&type=${DROPDOWNS.searchBarDropdown[type].toLowerCase()}`)
      window.location.reload()
    }
  }

  useEffect(() => {
    setType(props.type)
    setQuery(props.query)
  }, [props.type, props.query]);

  useEffect(() => {
    props.setQuery(query)
  }, [query])

	return (
		<MainWrapper border={BORDERS.searchBarBorder}>

			<InputWrapper background={COLORS.backgroundColorTypeB}>
				<Input
					value={query}
					fontFamily={FONTS.primaryFontFamily}
					textColorTypeC={COLORS.textColorTypeC}
					textColorTypeB={COLORS.textColorTypeB}

					onChange={handleInput}
					placeholder={props.placeholder}
				/>
			</InputWrapper>

			<ButtonWrapper backgroundColor={COLORS.backgroundColorTypeB}>
				<Button onClick={handleSearchButton}>
					<Icon 
						iconFile='search-icon.svg'
						iconAlt='Click here to search'
						iconSize={{
							iconWidth: 24,
							iconHeight: 24,
						}}
					/>
				</Button>
			</ButtonWrapper>

		</MainWrapper>
  )
}

const Button = styled.button `
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;

	width: 100%;
	height: 100%; 
`;	

const ButtonWrapper = styled.div `
	display: inherit;
	justify-content: center;
	align-items: inherit;
	background: ${props => props.backgroundColor};
	
	width: 60px;
	height: 100%;
`;

const Input = styled.input `
	height: 100%;
	width: 100%;
	padding: 0px 20px;

	background: inherit;
	outline: none;
	border: none;
	color: ${props => props.textColorTypeC};

	&::placeholder {
		font-weight: 400;
		font-size: 16px;
		
		display: flex;
		align-items: center;
		font-family: ${props => props.fontFamily};
		color: ${props => props.textColorTypeB};
	}

`;

const InputWrapper = styled.div `
	display: inherit;
	justify-content: flex-start;
	align-items: inherit;
	background: transparent;
	
	width: calc(100% - 55px);
	height: 100%;
`;

const MainWrapper = styled.div `
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: ${props => props.border};
	
	width: 100%;
	max-width: 650px;
	height: 50px;
	border-radius: 5px;
`;