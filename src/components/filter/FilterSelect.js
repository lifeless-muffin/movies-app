// Dependencies
import styled from 'styled-components'
import React, {useState, useRef, useEffect} from 'react'
import { COLORS, FILTERS } from '../../constants'
import Icon from '../utilities/Icon'

export default function FilterSelect({title, options, option, filterIndex, setOption, filterKey}) {
  
  // Reference to Filter Select Wrapper
  const nodeRef = useRef();

	// Component States
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(option)

  // toggle state of dropdown
  const handleDropdownToggle = () => setIsDropdownActive(!isDropdownActive);

  // updating selected option
  const updateSelectedOption = (index) => {
    setSelectedOption(index);
    setIsDropdownActive(false)
  }

  // handle mousedown
  const handleClick = e => {
    if (nodeRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setIsDropdownActive(false)
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  useEffect(() => {
    setOption({filterIndex, selectedOption, filterKey})
  }, [selectedOption])

  return (

    <MainWrapper>  
      <TitleWrapper>
        <Title>
          {title}
        </Title>
      </TitleWrapper>
      <ButtonWrapper>
        <Button onClick={handleDropdownToggle} isDropdownActive={isDropdownActive}>
          <ButtonText>
            {options[selectedOption]}
          </ButtonText>
          <ButtonIcon>
            <Icon 
              iconFile='arrow-down-icon.svg'
              iconAlt='Selector Button Icon'
              iconSize={{
                iconWidth: 10,
                iconHeight: 10,
              }}
            />
          </ButtonIcon>
        </Button>
        <Selecter ref={nodeRef} backgroundColor={COLORS.backgroundColorTypeB} dropshadow={FILTERS.primaryBoxshadow} isDropdownActive={isDropdownActive}>
          {options.map((item, index) => (
            <SelectorOption key={index} onClick={() => {updateSelectedOption(index)}}>
              <SelectorOptionText>{item}</SelectorOptionText>
            </SelectorOption>	
          ))}
        </Selecter>
      </ButtonWrapper>
    </MainWrapper>

  )
}

const SelectorOptionText = styled.span `
	font-size: 14px;

	text-align: center;
	color: #5A5E62;
`;

const SelectorOption = styled.button `
	width: 100%;
	height: 32px;
	padding: 0px 8px;
	
	display: flex;
	align-items: center;
	cursor: pointer;
	background: transparent;
	outline: none;
	border:none;

	&:hover {
		background: #dfe3e7;
	}

`;

const Selecter = styled.div `
	background: ${props => props.backgroundColor};
	border: none;
	position: absolute;
	height: fit-content;
	list-style: none;
	display: ${props => props.isDropdownActive ? 'initial' : 'none'};
  
  right: 0px;
  box-shadow: 0px 0px 2px 0px #bacbd3;
  min-width: 115px;
  width: calc(100% - 2px);
  top: calc(100% + 4px);
	padding: 8px;
	z-index: 999;
`;

const ButtonIcon = styled.div `
	display: inherit;
	align-items: inherit;
	justify-content: inherit;
`;

const ButtonText = styled.span `
	font-family: ${props => props.fontFamily};
	font-size: 14px;

	text-align: center;
	color: #5A5E62;
`;

const Button = styled.button `
	background: ${props => props.isDropdownActive ? '#EFF1F3' : 'transparent'};
  display: flex;
	justify-content: center;
	align-items: center;
	outline: none;
	border: none;
	cursor: pointer;
	width: fit-content;

  border-radius: 2px;
  padding: 15px;
	column-gap: 9px;
	height: 32px; 
`;

const ButtonWrapper = styled.div `
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const Title = styled.div `
  font-weight: 300;
  font-size: 14px;

  display: flex;
  align-items: center;
  color: #5A5E62;
`;

const TitleWrapper = styled.div `
  width: fit-content;
  height: fit-content;
`;

const MainWrapper = styled.div `
  display: flex;
  height: auto; 
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
