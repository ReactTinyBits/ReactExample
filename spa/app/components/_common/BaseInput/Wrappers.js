import styled from 'styled-components';

export const ErrorSpan = styled.span`
  color: red;
  font-size: 12px;
  position: ${props => (props.noSpaceError ? 'absolute' : 'relative')};
  display: block;
  width: 100%;
`;
