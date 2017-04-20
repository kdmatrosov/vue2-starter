import axios from 'axios';
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
        console.log('PUT SOME ATTENTION TO THIS AND TELL KIRILL YOU SAW IT!!!');
        return;
    }
    http.pendingRequests.splice(index, 1);
}

function RestCreator (settings) {
    let service = axios.create();
    //global interceptors
    service.interceptors.request.use(function (req) {
        http.pendingRequests.push(req);
        return req;
    });
    service.interceptors.response.use(function (response) {
        popRequest(response.config);
        return response.data;
    }, function (error) {
        let urls_to_exit = [''];
        let rejection = error.response;
        popRequest(error.config);
        if (rejection &&
            (ERROR_STATUSES.some(function (err) {
                return rejection.status === err
            })
            || (rejection.status === -1 && urls_to_exit.includes(rejection.config.url)))) {
            // router.push('');
        }
        return Promise.reject(error);
    });

    //global custom functions
    service.upload = function (url, data, config) {
        config.headers['Content-Type'] = undefined;
        return service.post(url, data, config);
    };

    //applying settings
    service.defaults.baseURL = settings.baseURL || '';
    service.interceptors.request.use(settings.request);
    service.interceptors.response.use(settings.response, settings.error);

    this[settings.name] = service;
    return this;
}

export default http;