/**
 * @file useHealth.js
 * @description
 * React hook for verifying backend service availability.
 * Uses `HealthAPI` to query the `HealthCheckController`, which returns a basic health status.
 *
 * This hook is typically used at app startup or periodically to confirm connectivity.
 * Includes:
 * - `getStatus()` to check backend health (returns `{ status: string }`)
 * - Shared `isLoading` and `error` state via `useApiUtils()`
 *
 * No authentication is required for this request.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback} from 'react';
import {HealthAPI} from '@/api/restApi';
import {useApiUtils} from '@/utils/apiUtils';
/**
 * @typedef {import('@/api/dtoTypes').RawHealthResponse}
 */

/**
 * Hook for checking backend service status.
 *
 * @returns {{
 *   getStatus: () => Promise<RawHealthResponse>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { getStatus, isLoading, error } = useHealth();
 *
 * const result = await getStatus();
 * console.log(result.status); // "Healthy"
 */
export function useHealth() {
    const {handleRequest, isLoading, error} = useApiUtils();

    /**
     * Retrieves the backend's operational health status.
     *
     * @returns {Promise<RawHealthResponse>} Status string in `{ status: "Healthy" }` format.
     * @throws unknown - If the health check fails due to connectivity or server issues.
     * @example
     * const status = await getStatus();
     * if (status.status !== 'Healthy') showError();
     */
    const getStatus = useCallback(() => handleRequest(() => HealthAPI.getStatus()), [handleRequest]);

    return {getStatus, isLoading, error};
}