import _ from 'lodash';

export interface Options extends RequestInit {
    [key: string]: any;
    params?: Record<string, any>;
    inlineParams?: string[];
    body?: any;
    abonentId?: string;
    headers?: { [key: string]: any };
}

class ResponseError extends Error {
    constructor(message: string, public response: Response) {
        super(message);
    }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) return response;
    if (!response.ok) throw new ResponseError(response.statusText, response);
    return response.json().then(res => {
        if (res) throw res;
        else throw new ResponseError(response.statusText, response);
    });
}

/**
 * @param {string} location Url to redirect to
 * @return {string} Url with protocol
 */
export function addUrlProtocol(location) {
    const hasProtocol = location.includes('http://') || location.includes('https://');
    return hasProtocol ? location : `http://${location}`;
}

/**
 * Get query param
 * @param {string} location Url with query params
 * @param {string} name     Param name
 * @returns {[string,null]} Param value
 */
export function getQueryParam(location, name) {
    const params = location.split(`${name}=`)[1];
    return params ? decodeURIComponent(params.split('&')[0]) : null;
}

/**
 * Format query params
 *
 * @param params
 * @param encode
 * @returns {string}
 */
export function formatQueryParams(params, encode = true) {
    function iter(o, path) {
        if (Array.isArray(o)) {
            o.forEach(a => {
                iter(a, `${path}`);
            });
            return;
        }
        if (o !== null && typeof o === 'object') {
            Object.keys(o).forEach(k => {
                iter(o[k], `${path}.${k}`);
            });
            return;
        }
        if (typeof o === 'boolean' || o || o === 0) {
            o = encode ? encodeURIComponent(o) : o;
            data.push(`${path}=${o}`);
        }
    }

    let data: string[] = [];
    Object.keys(params).forEach(k => {
        iter(params[k], k);
    });
    return data.join('&');
}

export function formatInlineParams(inlineParams) {
    if (!Array.isArray(inlineParams)) return null;
    return inlineParams.join('/');
}

/* eslint no-param-reassign: 0 */
export const prepareFetchParams = (
    relativeUrl: string,
    options: Options = {},
    baseUrl: string = "",
    webApiType = 'os',
): [string, Options] => {
    options.credentials = 'include';
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };

    if (webApiType === 'lk') options.headers = { ...options.headers };

    let url = baseUrl + relativeUrl;
    if (options.inlineParams) url = `${url}/${formatInlineParams(options.inlineParams)}`;
    if (options.params) url = `${url}?${formatQueryParams(options.params)}`;
    if (options.body) {
        options.body = JSON.stringify(options.body);
        options.params = undefined;
    }

    return [url, options];
};

export const baseRequest = (relativeUrl: string, options?: Options, baseUrl?: string, webApiType = 'os') => {
    const [url, preparedOptions] = prepareFetchParams(relativeUrl, options, baseUrl, webApiType);
    return fetch(url, preparedOptions);
};

export const request = (relativeUrl: string, options?: Options, baseUrl?: string, webApiType = 'os') =>
    baseRequest(relativeUrl, options, baseUrl, webApiType)
        .then(webApiType === 'os' ? checkStatus : resp => resp)
        .then(parseJSON);

export function mapToFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
        if (_.isPlainObject(object[key])) {
            formData.append(key, object[key].content, object[key].name);
        } else if (object[key] !== undefined) {
            formData.append(key, object[key]);
        }
    });
    return formData;
}
