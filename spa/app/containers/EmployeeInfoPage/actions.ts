import {EmployeeInfo} from "./types";
import {SAVE_EMPLOYEE_INFO, SAVE_EMPLOYEE_INFO_ERROR, SAVE_EMPLOYEE_INFO_SUCCESS} from "./constants";
import {action} from "typesafe-actions";

export const saveEmployeeInfo = (employeeInfo: EmployeeInfo) =>
    action(SAVE_EMPLOYEE_INFO, { employeeInfo });
export const saveEmployeeInfoSuccess = () => action(SAVE_EMPLOYEE_INFO_SUCCESS);
export const saveEmployeeInfoError = (error: string) => action(SAVE_EMPLOYEE_INFO_ERROR, { error });