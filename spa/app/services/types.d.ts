import { OrderDataType } from './requests/types';

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

export interface ExchangeDirectionSuggestions {
  ExchangeDirectionSuggestion: ExchangeDirectionSuggestion[];
}

export interface ExchangeDirectionSuggestion {
  title: string;
  code: string;
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
