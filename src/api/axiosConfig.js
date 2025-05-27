/**
 * @file axiosConfig.js
 * @description Axios configuration for SmartGrow frontend.
 *
 * This file provides a shared Axios instance (`API`) preconfigured with:
 * - Base URL (depending on environment)
 * - Automatic `Authorization` header injection
 * - Transparent access token refreshing using refresh token
 * - Safe retry of original request upon 401
 * - Queued request handling during refresh
 *
 * Any service making authenticated HTTP requests should import and use `API`.
 * @author Taggerkov
 * @version 1.2.0
 * @since 0.7.0
 * @see axios
 */

import axios from 'axios';

/**
 * API subroute path used for composing REST endpoints.
 *
 * Kept in sync with backend controller route attributes.
 * @type {string}
 */
const authPath = 'Auth', userPath='User', greenhousePath='Greenhouse', sensorPath = 'SensorReading', actionPath = 'Action', presetPath = 'Preset', notificationPath='Notification', healthPath = 'Health';

/**
 * Axios instance preconfigured with baseURL and JSON content headers.
 * @type {import('axios').AxiosInstance}
 */
const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://myapp.com/api/' : 'http://localhost:5050/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Flag indicating whether the token is currently being refreshed.
 * @type {boolean}
 */
let isRefreshing = false;

/**
 * Queue of pending requests while the token is refreshing.
 * Each entry is an object with resolve and reject callbacks.
 * @type {{ resolve: (token: string) => void, reject: (err: any) => void }[]}
 */
let failedQueue = [];

/**
 * Resolves or rejects all queued requests depending on a refresh outcome.
 * @param {any} error - If present, all queued requests will reject with this error.
 * @param {string|null} token - If provided, queued requests will retry using this token.
 */
const processQueue = (error, token = null) => {
    failedQueue.forEach(({resolve, reject}) => error ? reject(error) : resolve(token));
    failedQueue = [];
};

// Request interceptor: Automatically attaches the access token (if present) to outgoing requests.
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/*
 * Response interceptor:
 * - Handles 401 Unauthorized responses by attempting a token refresh.
 * - Retries the original request after a successful refresh.
 * - Skip refresh for any /auth/* route to avoid recursion.
 */
API.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes(`${authPath}/login`) && !originalRequest.url.includes(`${authPath}/register`) && !originalRequest.url.includes(`${authPath}/refresh`)) {
            originalRequest._retry = true;
            if (isRefreshing) return new Promise((resolve, reject) => failedQueue.push({resolve, reject})).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return API(originalRequest);
            }).catch(err => Promise.reject(err));
            isRefreshing = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const res = await API.post(`${authPath}/refresh`, refreshToken);
                const {token: newAccessToken, refreshToken: newRefreshToken} = res.data;
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                API.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default API;
export {authPath, userPath, greenhousePath, sensorPath, actionPath, presetPath, notificationPath,healthPath};