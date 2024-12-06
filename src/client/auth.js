import axios from "axios";
import { config } from "../config";
import { authClient, notesClient } from "./client";
import { verify } from "./auth/auth";

const setAuthToken = token => {
    if (token) {
        localStorage.setItem('token', token);
        notesClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // localStorage.removeItem('token');
    }
}

const getToken = () => {
    return localStorage.getItem('token');
}

export {
    setAuthToken,
    getToken,
}
