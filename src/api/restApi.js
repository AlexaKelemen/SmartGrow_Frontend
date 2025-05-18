/**
 * @file restApi.js
 * @description Centralized REST API client module for SmartGrowFrontend.
 * <br>Handles all HTTP/HTTPS communications between the frontend and the backend
 * services, organized into modular namespaces: SensorAPI, ModelAPI, and ControlAPI.
 * <br>Uses Axios for network requests with JSON handling.
 *
 * @author Taggerkov
 * @version 2.0.0
 * @since 0.0.1
 */

import API, {authPath, sensorPath, actionPath, presetPath, healthPath} from 'axiosConfig'

const AuthAPI = {
    login: creds => API.post(`${authPath}/login`, creds).then(res => res.data),
    register: creds => API.post(`${authPath}/register`, creds).then(res => res.data)
};

/**
 * API functions related to push notification setup.
 * @namespace PushAPI
 * @since 1.1.0
 */
const PushAPI = {
    /**
     * Retrieves the VAPID public key used for client-side push subscription.
     * @returns {Promise<string>} Base64-encoded VAPID public key.
     */
    async getVapidKey() {
        const response = await API.get('/vapidPublicKey');
        return response.data;
    },

    /**
     * Sends the client-side push subscription to the backend to store it.
     * @param {PushSubscription} subscription - The push subscription object.
     * @returns {Promise<void>}
     */
    async saveSubscription(subscription) {
        await API.post('/subscribe', subscription);
    }
};

export {AuthAPI, PushAPI}