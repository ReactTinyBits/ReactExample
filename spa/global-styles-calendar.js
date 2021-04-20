import { css } from 'styled-components';

// Календарь это таблица в Popup.
// Стилизует календарь Online-sprinter и DocEngine.
// В версии 0.10 симантик-календаря нет специального класса suir-calendar,
// в отличии от 0.7 в DocEngine.
// Popup добавляется в body, поэтому нужны глобальные стили

const globalStylesCalendar = css`
  .ui.popup {
    .ui.table {
      border: none;
      padding-bottom: 2rem;

      td,
      th {
        font-size: 1rem;
        font-weight: 400;
        color: black;
        background-color: white;
      }

      tr:first-child th {
        font-size: 1rem;
        border-bottom: 1px solid black;
        text-transform: capitalize;
      }

      tr:nth-child(2) th {
        padding-top: 1rem;
        color: gray !important;
      }
      
      tr:last-child th {
        padding-bottom: 1rem;
      }
      
      td {
        padding-top: 0.2857rem;
        padding-bottom: 0.2857rem;
        outline: none !important;
        border: none;

        &.active {
          background-color: rgba(74, 185, 105, 255); !important;
          color: #ffffff !important;
        }

        &.disabled {
          color: rgba(125, 154, 181, 0.3) !important;
        }

        &:hover {
          background-color: rgb(79, 203, 114); !important;
          cursor: pointer;
          transition: background-color 0.5s;
          color: rgba(0, 0, 0, 0.87) !important;
        }
      }

      thead th {
        text-transform: uppercase;
      }
    }
    
    i.chevron.icon {
      font-size: 1.4rem;
      color: rgba(74, 185, 105, 255);
    }
  }
`;

export default globalStylesCalendar;
