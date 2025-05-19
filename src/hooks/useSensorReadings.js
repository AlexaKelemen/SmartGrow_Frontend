/**
 * @file useSensorReadings.js
 * @description Custom React hook for fetching sensor reading data from the backend.
 * Provides latest sensor readings with loading and error state management.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import { useState, useEffect } from 'react';
import { SensorAPI } from '@/api/restApi';

/**
 * Hook for fetching current sensor readings by greenhouse ID.
 *
 * @param {number|string} greenhouseId - The greenhouse to fetch data for.
 * @returns {{
*   latestReading: Object|null,
*   isLoading: boolean,
*   isError: boolean
* }}
*/
export function useSensorReadings(greenhouseId) {
    const [latestReading, setLatestReading] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!greenhouseId) return;

        async function fetchData() {
            setIsLoading(true);
            setIsError(false);
            try {
                const data = await SensorAPI.getCurrentReadingsByGreenhouseId(greenhouseId);
                setLatestReading(data);
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [greenhouseId]);
    return { latestReading, isLoading, isError };
}