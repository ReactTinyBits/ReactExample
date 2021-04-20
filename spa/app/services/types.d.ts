import { OrderInfoType } from '../../containers/LkRequestPage/types';
import { OrderDataType } from './requests/types';
import { DateFilterType } from '../../components/DocumentsList/Filters/SendDateFilter/types';

export interface DateFilter {
    filterType: DateFilterType;
    days?: number;
    from?: string;
    to?: string;
}

export interface Paging {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

export interface Sorting {
    isDescOrder: boolean;
    orderField: string;
}

export interface TRequestResult {
    isSucceed: boolean;
    requestId: string;
    orderInfoType: OrderInfoType;
    requestNumber: string;
}

export interface TValidationResult {
    isSucceed: boolean;
    certificateBase64: string;
    givenName: string;
    snils: string;
    surName: string;
    inn: string;
}

export interface ExchangeDirectionSuggestions {
    ExchangeDirectionSuggestion: ExchangeDirectionSuggestion[];
}

export interface ExchangeDirectionSuggestion {
    title: string;
    code: string;
}

export interface ApiResponse<T> {
    success: boolean;
    errorMessage?: string;
    data: T;
}

export interface DataPage<T> {
    items: T[];
    paging: Paging;
}

export interface LkCertificate {
    owner: string;
    thumbprint: string;
    serialNumber: string;
    issuedByOrganization: string;
    issueDate: Date;
    expireDate: Date;
}

export interface RequestForCertificate extends LkCertificate {
    orderDataType: OrderDataType;
}
