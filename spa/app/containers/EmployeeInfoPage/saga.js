import { takeLatest, takeEvery, call, put, select, all } from 'redux-saga/effects';
import { format } from 'date-fns';
import { SAVE_EMPLOYEE_INFO } from './constants';

import EmployeeService from '../../services/employee/';
import {
    saveEmployeeInfoError,
    saveEmployeeInfoSuccess
} from './actions';

export default function* defaultSaga() {
    yield takeLatest(SAVE_EMPLOYEE_INFO, saveEmployeeInfoEffect);;
}

function getEmployeeService() {
    return new EmployeeService();
}

function* saveEmployeeInfoEffect({ payload: { billNumbers, abonentId } }) {
    try {
        const response = yield call(getEmployeeService().sendTariffRequest, billNumbers, abonentId);

        if (response.success) {
            yield put(saveEmployeeInfoSuccess());
        } else {
            yield put(saveEmployeeInfoError(response.errorMessage));
        }
    } catch (error) {
        yield put(saveEmployeeInfoError(error.Message));
    }
}
