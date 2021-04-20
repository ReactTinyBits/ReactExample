import styled from 'styled-components';

export const ErrorSpan = styled.span`
  color: rgba(232,109,68,255);
  font-size: 12px;
  position: ${props => (props.noSpaceError ? 'absolute' : 'relative')};
  left: 0;
  top: 3.8rem;
  width: 100%;
`;
