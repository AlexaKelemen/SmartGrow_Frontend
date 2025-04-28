/**
 * @file useSensorReadings.js
 * @description Custom React hook for fetching sensor reading data from the backend.
 * Provides latest sensor readings with loading and error state management.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import { useState } from 'react';
import { SensorAPI } from '@/api/restApi';

/**
 * Hook for fetching sensor readings from the backend server.
 *
 * @returns {{
 *   data: Object[]|null,
 *   loading: boolean,
 *   error: string|null,
 *   fetchReadings: (limit?: number) => Promise<void>
 * }}
 * @example
 * const { data, loading, error, fetchReadings } = useSensorReadings();
 *
 * await fetchReadings(50);
 */
export function useSensorReadings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch a list of sensor readings.
     *
     * @async
     * @function fetchReadings
     * @param {number} [limit=20] - Number of readings to retrieve from the server.
     * @returns {Promise<void>}
     * @example
     * await fetchReadings(20);
     */
    async function fetchReadings(limit = 20) {
        setLoading(true);
        setError(null);
        try {
            const readings = await SensorAPI.getReadings(limit);
            setData(readings);
        } catch (err) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, fetchReadings };
}