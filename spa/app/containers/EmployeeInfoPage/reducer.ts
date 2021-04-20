import { fromJS } from 'immutable';
import { ActionType } from 'typesafe-actions';
import * as Actions from './actions';
import { SAVE_EMPLOYEE_INFO_SUCCESS, SAVE_EMPLOYEE_INFO, SAVE_EMPLOYEE_INFO_ERROR } from './constants';
import { State } from './types';
export type EmployeeInfoAction = ActionType<typeof Actions>;

export const initialState: any = fromJS({
  loading: false,
});

function employeeInfoPageReducer(state: any = initialState, action: EmployeeInfoAction): State {
  switch (action.type) {
    case SAVE_EMPLOYEE_INFO:
      return state.set('loading', true);
    case SAVE_EMPLOYEE_INFO_SUCCESS:
    case SAVE_EMPLOYEE_INFO_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default employeeInfoPageReducer;
