import axios from 'axios';
import router from '@/router/index'
import { ERROR_STATUSES } from './config';

//Basic global ultimate object
let http = {
    pendingRequests: [],
    rest: RestCreator
};

function popRequest (req) {
    let index = http.pendingRequests.findIndex(function (elem) {
        return req === elem;
    });
    if (index === -1) {
        console.log('Write to kdmatrosov@yandex.ru');
        return;
    }
    http.pendingRequests.splice(index, 1);
}

const cancelCreator = axios.CancelToken;
let flushFunc,
    cancelToken = new cancelCreator((c) => flushFunc = c);

const default_interceptors = [{
    request: function (req) {
        req.cancelToken = cancelToken;
        http.pendingRequests.push(req);
        return req;
    },
    response: function (response) {
        popRequest(response.config);
        return response.data;
    },
    error: function (error) {
        popRequest(error.config);
        console.log('http error', error, {error}, error.response, error.request, error.message, error.config);
        if (axios.isCancel(error)) {
            console.log('isCancel');
            error.isCancel = true;
        }
        return Promise.reject(error);
    }
}];
function RestCreator (settings) {
    let service = axios.create({
        responseType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    });
    service.flush = function () {
        flushFunc();
        http.pendingRequests = [];
        cancelToken = new cancelCreator((c) => flushFunc = c);
    };
    service.upload = function (url, data, config) {
        config.headers['Content-Type'] = undefined;
        return service.post(url, data, config);
    };

    //applying settings
    service.defaults.baseURL = settings.baseURL || '';
    settings.interceptors || (settings.interceptors = []);
    default_interceptors.concat(settings.interceptors).forEach(inter => {
        service.interceptors.request.use(inter.request);
        service.interceptors.response.use(inter.response, inter.error);
    });

    this[settings.name] = service;
    return this;
}

export default http;