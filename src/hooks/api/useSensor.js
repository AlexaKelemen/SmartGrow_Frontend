/**
 * @file useSensor.js
 * @description
 * React hook for accessing greenhouse sensor readings, both current and historical.
 * Integrates with `SensorAPI` and manages async state per request.
 *
 * Provides wrapper functions for:
 * - `getCurrentReadings()` — fetches real-time sensor data for a greenhouse
 * - `getPastReadings()` — queries historical sensor logs with optional filters
 *
 * Shared `isLoading` and `error` state is managed automatically via `useApiUtils()`.
 *
 * All DTO types are defined in `dtoTypes.js` and align with backend expectations.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback} from 'react';
import {SensorAPI} from '@/api/restApi';
import {useApiUtils} from '@/utils/apiUtils';
/**
 * @typedef {import('@/api/dtoTypes').PastSensorReadingRequestDTO}
 * @typedef {import('@/api/dtoTypes').PastSensorReadingResultDTO}
 * @typedef {import('@/api/dtoTypes').CurrentSensorReadingResultDTO}
 */

/**
 * Hook for querying environmental sensor data in a greenhouse.
 *
 * @returns {{
 *   getCurrentReadings: (greenhouseId: number) => Promise<CurrentSensorReadingResultDTO[]>,
 *   getPastReadings: (greenhouseId: number, filters?: PastSensorReadingRequestDTO) => Promise<PastSensorReadingResultDTO[]>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { getCurrentReadings, getPastReadings, isLoading, error } = useSensor();
 *
 * const current = await getCurrentReadings(1);
 * const history = await getPastReadings(1, { afterDate: '2024-01-01', readingType: 'Temperature' });
 */
export function useSensor() {
    const {handleRequest, isLoading, error} = useApiUtils();

    /**
     * Fetches current sensor readings for a greenhouse.
     *
     * @param {number} greenhouseId - The ID of the target greenhouse.
     * @returns {Promise<CurrentSensorReadingResultDTO[]>} List of real-time sensor readings.
     * @throws unknown - If the request fails or greenhouse ID is invalid.
     * @example
     * const current = await getCurrentReadings(2);
     */
    const getCurrentReadings = useCallback((greenhouseId) => handleRequest(() => SensorAPI.getCurrentReadings(greenhouseId)), [handleRequest]);

    /**
     * Fetches past/historical sensor readings using optional date/type filters.
     *
     * @param {number} greenhouseId - The ID of the target greenhouse.
     * @param {PastSensorReadingRequestDTO} [filters={}] - Filter options like after/before/timestamp/type.
     * @returns {Promise<PastSensorReadingResultDTO[]>} List of filtered historical readings.
     * @throws unknown - If the request fails or filters are invalid.
     * @example
     * const history = await getPastReadings(3, {
     *   afterDate: '2024-01-01',
     *   beforeDate: '2024-05-01',
     *   readingType: 'SoilHumidity'
     * });
     */
    const getPastReadings = useCallback((greenhouseId, filters = {}) => handleRequest(() => SensorAPI.getPastReadings(greenhouseId, filters)), [handleRequest]);

    return {getCurrentReadings, getPastReadings, isLoading, error};
}