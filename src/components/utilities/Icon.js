// Dependencies
import styled from "styled-components";


export default function Icon({...props}) {

  const {iconSize, iconFile, iconAlt} = props

  return (
    <IconWrapper>
      <IconImage 
        iconSize={iconSize}
        src={`/assets/icons/${iconFile}`}
        alt={iconAlt || 'Image could not be loaded'}
      />
    </IconWrapper>
  )
}


const IconImage = styled.img `
  width: ${props => props?.iconSize?.iconWidth || 16}px;
  height: ${props => props?.iconSize?.iconHeight || 16}px;
`;  

const IconWrapper = styled.div `
  width: fit-content;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
`;