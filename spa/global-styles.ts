import { createGlobalStyle } from 'styled-components';
import { DefaultFont } from './app/theme/styles';
import globalStylesCalendar from './global-styles-calendar';

const GlobalStyle = createGlobalStyle`
      .ui.input.error > input, 
      .error.field .ui.input input, 
      .error.field .ui.input input[type], 
      .error.field textarea, 
      .ui.form .error.field textarea, 
      .ui.form .error.field input, 
      .ui.form .error.field input[type], 
      .ui.form .field.error .input, 
      .ui.form .fields.error .field .input, 
      .ui.form .fields.error .field .ui.dropdown, 
      .ui.form .fields.error .field .ui.dropdown .item, 
      .ui.form .field.error .ui.dropdown, 
      .ui.form .field.error .ui.dropdown .text, 
      .ui.form .field.error .ui.dropdown .item, 
      .ui.selection.dropdown.error, 
      .ui.form .fields.error .field .ui.dropdown .menu .selected.item, 
      .ui.form .field.error .ui.dropdown .menu .selected.item {
        border-color: #e64c66 !important;
        background-color: rgba(240,240,240,255) !important;
        color: #2B476A;
        margin-bottom: 0 !important;
        box-shadow: none;
      }

    button, input, optgroup, select, textarea {
      ${DefaultFont};
    }
    
    .ui.disabled.input,
    .ui.input:not(.disabled) input[disabled] {
      background-color: gray;
    }

    .ui.message > .close.icon {
      color: black;
    }

    .ui.form .inline.fields .field:not(.wide) .ui.input, .ui.form .inline.field:not(.wide) .ui.input {
      width: 100%;
    }

    .ui.icon.input > i.icon {
      height: 90%;
    }
   
    .ui.selection.dropdown,
    .ui.dropdown > input,
    .ui.input > input,
    .ui.input > input:focus,
    .ui.form input,
    .ui.form input:focus,
    .ui.form input[type],
    .ui.form input[type]:focus,
    .ui.form textarea,
    .ui.form textarea:focus,
    textarea {
      background-color: rgba(240,240,240,255);
      color:black;
      border-radius: 3px;
      border: 1px solid rgba(240,240,240,255);
      padding: 1rem;
      width: 100%;
      height: 4rem;
      margin-bottom: .5rem;
      font-size: 14px;
          
      &::placeholder {
        color: gray !important;
      }
          
      .menu {
        margin-top: 0.5rem;
      }
      
      .menu > .item {
        border-color: gray;
        color: black;
        &:hover {
          color: white;
          background-color: rgb(79, 203, 114);
        }
      }
    }

    .ui.selection.dropdown {
      padding-top: 1.4rem !important;
    }

    ${globalStylesCalendar};
`;

export default GlobalStyle;
