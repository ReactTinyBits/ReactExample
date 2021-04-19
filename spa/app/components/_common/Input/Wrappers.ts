import styled from 'styled-components';

export const Label = styled.label<{error?: boolean}>`
  &&&&& {
    color: gray;
    border: 4px double black;
    font-size: 0.9375rem;
    font-weight: 500;
  }
`;
