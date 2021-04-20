import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEmployeeInfoPageDomain = state => state.get('employeeInfoPage', initialState);

export const makeSelectEmployeeInfoPage = () =>
  createSelector(selectEmployeeInfoPageDomain, substate => substate.toJS());

export const isLoading = () => createSelector(selectEmployeeInfoPageDomain, substate => substate.get('loading'));
