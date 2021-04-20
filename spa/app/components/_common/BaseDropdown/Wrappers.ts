import styled from 'styled-components';
import { Dropdown, Loader } from 'semantic-ui-react';
import omitProps from '../../../HOCs/omitProps';

export const BaseDropdownWrapper = styled(omitProps(Dropdown, 'singleLine'))<{ singleLine?: boolean }>`
  > .text {
    font-weight: 400 !important;
    width: 100%;
  }
`;

export const IconWrapperColored = styled.span`
  position: absolute;
  top: calc(50% - 9px);
  right: 0.75em;
  color: gray;
`;

export const BaseDropdownLoader = styled(Loader)`
  &&&& {
    right: 0.2em;
    left: auto;
  }
`;
