// Dependencies
import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router';

// Constants
import { BORDERS, COLORS, FONTS, DROPDOWNS, FILTERS } from '../../constants';
import Icon from '../utilities/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SEARCHBAR_DROPDOWN_STATE, SET_SEARCHBAR_FOCUS_STATE, SET_SEARCHBAR_QUERY } from '../../reducers/searchBarReducer';
import { SET_FILTER_TYPE } from '../../reducers/filtersReducer';

export default function SearchBar ({...props}) {
  
	// component variables and states 
	const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    query, 
    isDropdownActive, 
    isInputOnFocus
  } = useSelector(states => states.searchBar);
  const {type} = useSelector(states => states.filters)

	// Component Functions 
	const handleOptionClick = (index) => {
    dispatch(SET_FILTER_TYPE(index));
    dispatch(SET_SEARCHBAR_DROPDOWN_STATE(false));
  }
	const handleInput = (event) => {
    dispatch(SET_SEARCHBAR_QUERY(event.target.value));
  }
	
	const handleSearchButton = () => {
		if (query.length > 0) {
			navigate(`/search?query=${encodeURI(query)}&type=${DROPDOWNS.searchBarDropdown[type].toLowerCase()}`)
		}
	}

	const onBlur = (event) => {
    event.target.value === '' && dispatch(SET_SEARCHBAR_FOCUS_STATE(false));
  }

	const onFocus = () => {
    dispatch(SET_SEARCHBAR_FOCUS_STATE(true));
    dispatch(SET_SEARCHBAR_DROPDOWN_STATE(false));
  } 

  const typeSelectorOptions = () => {
    return DROPDOWNS.searchBarDropdown.map((option, index) => (
      <TypeOption key={index} onClick={() => {handleOptionClick(index)}}>
        <TypeOptionText fontFamily={FONTS.primaryFontFamily}>{option}</TypeOptionText>
      </TypeOption>	
    ))
  }

	return (
		<MainWrapper border={BORDERS.searchBarBorder} isInputOnFocus={isInputOnFocus}>
			<InputWrapper background={COLORS.backgroundColorTypeB} isInputOnFocus={isInputOnFocus}>
				<Input
					value={query}
					fontFamily={FONTS.primaryFontFamily}
					textColorTypeC={COLORS.textColorTypeC}
					textColorTypeB={COLORS.textColorTypeB}

					onFocus={onFocus}
					onBlur={onBlur}
					onChange={handleInput}
					
					placeholder='Search Avengers, Dune, Cruella...'
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

			<TypeSelectorWrapper isInputOnFocus={isInputOnFocus}>

				<TypeSelectorButton onClick={() => {dispatch(SET_SEARCHBAR_DROPDOWN_STATE(!isDropdownActive))}}>
						<TypeSelectorButtonText fontFamily={FONTS.primaryFontFamily}>
							{DROPDOWNS.searchBarDropdown[type]}
						</TypeSelectorButtonText>
						<TypeSelectorButtonIcon>
							<Icon 
								iconFile='arrow-down-icon.svg'
								iconAlt='Selector Button Icon'
								iconSize={{
									iconWidth: 12,
									iconHeight: 12,
								}}
							/>
						</TypeSelectorButtonIcon>
				</TypeSelectorButton>

				<TypeSelector backgroundColor={COLORS.backgroundColorTypeB} dropshadow={FILTERS.primaryBoxshadow} isDropdownActive={isDropdownActive}>
          {typeSelectorOptions()}
				</TypeSelector>

			</TypeSelectorWrapper>

		</MainWrapper>
  )
}



const TypeOptionText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 16px;

	text-align: center;
	color: #5A5E62;
`;

const TypeOption = styled.button `
	width: 100%;
	height: 35px;
	padding: 0px 10px;
	
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 3px;
	background: transparent;
	outline: none;
	border:none;

	&:hover {
		background: #dfe3e7;
	}

`;

const TypeSelector = styled.div `
	background: ${props => props.backgroundColor};
	filter: ${props => props.dropshadow};
	border: none;
	position: absolute;
	height: fit-content;
	list-style: none;
	display: ${props => props.isDropdownActive ? 'initial' : 'none'};

	top: calc(100% + 10px);
	width: 150px;
	padding: 12px 10px;
	right: -25%;
	border-radius: 3px;
	z-index: 999;
`;

const TypeSelectorButtonIcon = styled.div `
	display: inherit;
	align-items: inherit;
	justify-content: inherit;
`;

const TypeSelectorButtonText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 16px;

	text-align: center;
	color: #5A5E62;
`;

const TypeSelectorButton = styled.button `
	height: 100%;
	width: 100%;
	column-gap: 9px;

	display: inherit;
	align-items: inherit;
	justify-content: inherit;
	border: none;
	cursor: pointer;
`;

const TypeSelectorWrapper = styled.div `
	height: 100%;
	padding: 10px 0px;
	right: 70px; 

	display: ${props => props.isInputOnFocus ? 'none' : 'flex'};
	position: absolute;
	align-items: center;
	justify-content: center;
`;

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
	background: ${props => props.isInputOnFocus ? 'transparent' : props.background};
	
	width: calc(100% - 55px);
	height: 100%;
`;

const MainWrapper = styled.div `
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: ${props => props.isInputOnFocus ? props.border : 'none'};
	
	width: 100%;
	max-width: 650px;
	height: 50px;
	border-radius: 5px;
`;