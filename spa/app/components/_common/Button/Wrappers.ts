import styled from "styled-components";
import { Button } from 'semantic-ui-react';
import omitProps from '../../../HOCs/omitProps';

export const BaseButtonWrapper = styled(omitProps(Button, 'green', 'slim'))<{
    textcolor: string;
    backgroundcolor: string;
    hovercolor: string;
    shadow: string;
    border: string;
    padding: string;
    borderradius: string;
    slim: boolean;
    fontSize: string;
}>`
  &&&&&& {
    margin: 0;
    font-size: 1rem !important;
    color: white;
    display: block;
    padding: 1rem 1.5rem;
    min-width: 50%;
    min-height: 1.5rem;

    box-shadow: 0 3px 5px 0 #ccc;
    font-weight: bold;
    border-radius: 3px;
    background-color: rgba(74, 185, 105, 255);
    cursor: pointer;

    :hover {
      background-color: rgb(79, 203, 114);
    }
  }
`;