import styled from 'styled-components';

export const Label = styled.label<{ error?: boolean }>`
  &&&&& {
    color: gray;
    font-size: 0.8rem;
    font-weight: 500;
    position: absolute;
    top: 0.3rem;
    z-index: 1;
    left: 1rem;

    opacity: 1;
    animation: fade 2s linear;

    @keyframes fade {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
  }
`;
