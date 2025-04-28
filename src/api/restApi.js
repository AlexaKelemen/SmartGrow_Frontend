/**
 * @file restApi.js
 * @description Centralized REST API client module for SmartGrowFrontend.
 * <br>Handles all HTTP/HTTPS communications between the frontend and the backend
 * services, organized into modular namespaces: SensorAPI, ModelAPI, and ControlAPI.
 * <br>Uses Axios for network requests with JSON handling.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import axios from 'axios';

/**
 * Axios instance configured for API calls.
 * @author Taggerkov
 * @version 1.0.0
 * @since 1.0.0
 */
const API = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * API functions related to sensor readings.
 * @namespace SensorAPI
 * @author Taggerkov
 * @since 1.0.0
 */
export const SensorAPI = {
    /**
     * Fetch a list of sensor readings.
     * @param {number} [limit=20] - Number of readings to retrieve.
     * @returns {Promise<Object[]>} List of sensor readings.
     * @example
     * const readings = await SensorAPI.getReadings(10);
     * @see SensorAPI.getLatestReading
     */
    async getReadings(limit = 20) {
        const response = await API.get('/SensorReadings', {params: {limit}});
        return response.data;
    },

    /**
     * Fetch the latest sensor reading.
     * @returns {Promise<Object>} Latest sensor reading.
     * @example
     * const latest = await SensorAPI.getLatestReading();
     * @see SensorAPI.getReadings
     */
    async getLatestReading() {
        const response = await API.get('/SensorReadings/latest');
        return response.data;
    }
};

/**
 * API functions related to the machine learning prediction model.
 * @namespace ModelAPI
 * @author Taggerkov
 * @since 1.0.0
 */
export const ModelAPI = {
    /**
     * Send data to the prediction model and get the prediction result.
     * @param {Object} mushroomData - Data for prediction.
     * @returns {Promise<Object>} Prediction result.
     * @example
     * const prediction = await ModelAPI.predict({ feature1: 1.0, feature2: 5.2 });
     */
    async predict(mushroomData) {
        const response = await API.post('/Model/predict', mushroomData);
        return response.data;
    },

    /**
     * Check the health status of the upstream prediction service.
     * @returns {Promise<Object>} Health status.
     * @example
     * const status = await ModelAPI.health();
     */
    async health() {
        const response = await API.get('/Model/health');
        return response.data;
    }
};

/**
 * API functions related to the greenhouse control state.
 * @namespace ControlAPI
 * @author Taggerkov
 * @since 1.0.0
 */
export const ControlAPI = {
    /**
     * Fetch the current control system state.
     * @returns {Promise<Object>} Current control state.
     * @example
     * const state = await ControlAPI.getCurrentState();
     */
    async getCurrentState() {
        const response = await API.get('/Control/state');
        return response.data;
    },

    /**
     * Fetch the history of control system states.
     * @param {number} [limit=20] - Number of history entries to retrieve.
     * @returns {Promise<Object[]>} List of historical control states.
     * @example
     * const history = await ControlAPI.getHistory(30);
     */
    async getHistory(limit = 20) {
        const response = await API.get('/Control/history', {params: {limit}});
        return response.data;
    }
};