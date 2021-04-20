export interface EmployeeInfo {
    firstName: string;
    secondName: string;
    patronymic: string;
    gender: number;
    birthDay: Date;
    Address: string;
    CompanyName: string;
    email: string;
    phone: string;
}

export type State = {
    loading: boolean;
};