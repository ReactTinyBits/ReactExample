import { Options } from '../../utils/request';
import urls from './urls';
import BaseApiService from '../base';

export default class EmployeeService extends BaseApiService {
  constructor(options?: Options) {
    super('/employee', options);
  }

  saveInventory = ({ inventory }) => {
    const options = {
      body: inventory,
    };

    return this.post(urls.SAVE_EMPLOYEE, options);
  };
}
