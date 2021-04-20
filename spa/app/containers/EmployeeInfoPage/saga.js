import { takeLatest, put } from 'redux-saga/effects';
import { SAVE_EMPLOYEE_INFO } from './constants';

import EmployeeService from '../../services/employee';
import { saveEmployeeInfoError, saveEmployeeInfoSuccess } from './actions';

export default function* defaultSaga() {
  yield takeLatest(SAVE_EMPLOYEE_INFO, saveEmployeeInfoEffect);
}

function getEmployeeService() {
  return new EmployeeService();
}

function* saveEmployeeInfoEffect({ payload: { employeeInfo } }) {
  try {
    // const response = yield call(getEmployeeService().employeeInfo);
    yield put(saveEmployeeInfoSuccess());

    alert('Форма валидна, отправляется запрос');
    /*        if (response.success) {
            yield put(saveEmployeeInfoSuccess());
        } else {
            yield put(saveEmployeeInfoError(response.errorMessage));
        } */
  } catch (error) {
    yield put(saveEmployeeInfoError(error.Message));
  }
}
