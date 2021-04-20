import _ from 'lodash';
import { request, Options } from '../../utils/request';

export default class BaseApiService {
    constructor(protected readonly baseUrl = '', protected readonly options: Options = {}) {
        this.baseUrl = baseUrl;
        this.options = options;
    }

    protected request = (path, options: Options = {}, method = 'GET') => {
        const optionsCopy = { ..._.cloneDeep(this.options), method };
        return request(`/api/${this.baseUrl}/${path}`, _.merge(optionsCopy, options));
    };

    protected post = (path, options?: Options) => this.request(path, options, 'POST');
}
