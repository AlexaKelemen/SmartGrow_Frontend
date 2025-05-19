/**
 * SmartGrow REST API layer.
 *
 * This module defines an interface to all HTTP endpoints exposed by the SmartGrow backend.
 * It uses a configured Axios instance to ensure consistent headers, authentication, and refresh handling.
 *
 * This layer is grouped by logical backend services:
 * - AuthAPI: Authentication and token issuance
 * - ActionAPI: Historical user-triggered actions
 * - SensorAPI: Environmental sensor data
 * - PresetAPI: CRUD operations for plant growth presets
 * - HealthAPI: System status diagnostics
 *
 * All requests are authenticated unless otherwise noted.
 * @author Taggerkov
 * @version 2.0.0
 * @since 0.0.1
 */

import API, {authPath, sensorPath, actionPath, presetPath, healthPath} from 'axiosConfig'

/**
 * Provides authentication services including login and registration.
 */
const AuthAPI = {
    /**
     * Logs in an existing user using email and password credentials.
     *
     * @param {Object} credentials
     * @param {string} credentials.email - User's email address.
     * @param {string} credentials.password - User's plaintext password.
     * @returns {Promise<{ accessToken: string, refreshToken: string, email: string }>}
     */
    login: credentials => API.post(`${authPath}/login`, credentials).then(res => res.data),
    /**
     * Registers a new user and returns issued tokens on success.
     *
     * @param {Object} credentials
     * @param {string} credentials.email - User's email address.
     * @param {string} credentials.password - Chosen password.
     * @param {string} credentials.confirmPassword - Confirmation of password (must match).
     * @returns {Promise<{ accessToken: string, refreshToken: string, email: string }>}
     */
    register: credentials => API.post(`${authPath}/register`, credentials).then(res => res.data)
};

/**
 * Provides access to both current and historical sensor readings.
 */
const SensorAPI = {
    /**
     * Retrieves the latest readings from all sensors in a greenhouse.
     *
     * @param {number} greenhouseId - Greenhouse identifier.
     * @returns {Promise<Array>} An array of sensor readings (latest values only).
     */
    getCurrentReadings: (greenhouseId) => API.get(`${sensorPath}/${greenhouseId}/current-sensor-readings/`).then(res => res.data),

    /**
     * Retrieves historical sensor readings in a date range.
     *
     * @param {number} greenhouseId - Greenhouse identifier.
     * @param {{ startDate?: string, endDate?: string }} [query={}] - Optional ISO date range.
     * @returns {Promise<Array>} An array of sensor readings over time.
     */
    getPastReadings: (greenhouseId, query = {}) => API.get(`${sensorPath}/${greenhouseId}/past-sensor-readings/`, {params: query}).then(res => res.data)
};

/**
 * Provides access to past actions executed in a given greenhouse.
 */
const ActionAPI = {
    /**
     * Fetches user-triggered actions within a given date range.
     *
     * @param {number} greenhouseId - Target greenhouse identifier.
     * @param {{ startDate: string, endDate: string }} dateRange - ISO-formatted date range.
     * @returns {Promise<Array>} An array of action records.
     */
    getPastActions: (greenhouseId, dateRange) => API.post(`${actionPath}/${greenhouseId}/past-actions`, dateRange).then(res => res.data)
};

/**
 * Manages user-defined plant growth presets.
 */
const PresetAPI = {
    /**
     * Creates a new preset with specified parameters.
     *
     * @param {Object} preset - Preset object with user-defined environmental preferences.
     * @returns {Promise<Object>} The newly created preset.
     */
    createPreset: (preset) => API.post(`${presetPath}`, preset).then(res => res.data),

    /**
     * Fetches a preset by unique identifier.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<Object>} The preset, if found.
     */
    getPreset: (id) => API.get(`${presetPath}/${id}`).then(res => res.data),

    /**
     * Updates a preset by ID with new parameters.
     *
     * @param {number} id - Preset ID.
     * @param {Object} preset - Full preset object to replace existing.
     * @returns {Promise<number>} HTTP status code from server.
     */
    updatePreset: (id, preset) => API.put(`${presetPath}/${id}`, preset).then(res => res.status),

    /**
     * Permanently deletes a preset by ID.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<number>} HTTP status code from server.
     */
    deletePreset: (id) => API.delete(`${presetPath}/${id}`).then(res => res.status)
};

/**
 * Provides basic backend availability checks.
 */
const HealthAPI = {
    /**
     * Verifies whether the backend service is online.
     *
     * @returns {Promise<{ status: string }>} A status object, e.g. { status: "Healthy" }.
     */
    getStatus: () =>
        API.get(`${healthPath}`).then(res => res.data)
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

export {AuthAPI, SensorAPI, ActionAPI, PresetAPI, HealthAPI, PushAPI}