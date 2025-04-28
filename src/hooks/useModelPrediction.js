/**
 * @file useModelPrediction.js
 * @description Custom React hook for interacting with the machine learning prediction service.
 * Provides functions to make predictions and check service health status, along with loading and error management.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import { useState } from 'react';
import { ModelAPI } from '@/api/restApi';

/**
 * Hook for sending data to the ML model and fetching prediction results.
 *
 * @returns {{
 *   result: Object|null,
 *   loading: boolean,
 *   error: string|null,
 *   predict: (input: Object) => Promise<void>,
 *   healthCheck: () => Promise<void>
 * }}
 * @example
 * const { result, loading, error, predict, healthCheck } = useModelPrediction();
 *
 * await predict({ feature1: 1.0, feature2: 2.5 });
 * await healthCheck();
 */
export function useModelPrediction() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Send input data to the prediction model and receive the prediction result.
     *
     * @async
     * @function predict
     * @param {Object} inputData - The data object to be sent for prediction.
     * @returns {Promise<void>}
     * @example
     * await predict({ temperature: 22, humidity: 60 });
     */
    async function predict(inputData) {
        setLoading(true);
        setError(null);
        try {
            const prediction = await ModelAPI.predict(inputData);
            setResult(prediction);
        } catch (err) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Perform a health check on the upstream machine learning prediction service.
     *
     * @async
     * @function healthCheck
     * @returns {Promise<void>}
     * @example
     * await healthCheck();
     */
    async function healthCheck() {
        try {
            await ModelAPI.health();
        } catch (err) {
            console.warn('Prediction service might be unhealthy.');
        }
    }

    return { result, loading, error, predict, healthCheck };
}