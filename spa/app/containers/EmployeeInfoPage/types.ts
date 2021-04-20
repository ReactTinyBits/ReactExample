export interface EmployeeInfo {
    firstName: string;
    secondName: string;
    patronymic: string;
    gender: number;
    birthDay: Date;
    Address: string;
    CompanyName: string;
}

export type State = {
    loading: boolean;
};