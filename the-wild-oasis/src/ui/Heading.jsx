import styled, { css } from "styled-components";



const Heading = styled.h1`
   line-height: 1.4;
   font-weight: 600;
   ${props => props.type === 'h1' && css`
      font-size: 50px;
   `};
   ${props => props.type === 'h2' && css`
      font-size: 40px;
   `};
   ${props => props.type === 'h3' && css`
      font-size: 30px;
   `};
`

export default Heading