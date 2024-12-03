import axios, { Axios, AxiosError } from "axios";

import { config } from '../config';


axios.interceptors.response.use((error) => {
    if (axios.isCancel(error)) {
        return console.log(error);
    }
});

const notesClient = axios.create({
    baseURL: config.baseURL + '/notes',
    headers: {
        "Content-Type": "application/json",
    },
});

const authClient = axios.create({
    baseURL: config.baseURL + '/auth',
    headers: {
        "Content-Type": "application/json",
    },
    // proxy: {
    //     host: 'localhost',
    //     port: 3000,
    //     protocol: 'http',
    // },
});


const mediaClient = axios.create({
    baseURL: config.baseURL + '/media',
    headers: {
        "Content-Type": "application/json",
    },
});

const reminderClient = axios.create({
    baseURL: config.baseURL + '/reminder',
    headers: {
        "Content-Type": "application/json",
    },
});


authClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

notesClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

mediaClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

reminderClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export {
    notesClient,
    authClient,
    mediaClient,
    reminderClient,
};
