/**
 * @file useNotification.js
 * @description
 * React hook for retrieving historical notification logs for a specific greenhouse.
 * Integrates with the backend `NotificationController` via `NotificationAPI`,
 * and supports date-filtered queries based on `NotificationQueryDTO`.
 *
 * This hook provides:
 * - `getPastNotifications()` to fetch a greenhouse’s message history
 * - Shared `isLoading` and `error` state via `useApiUtils()`
 *
 * DTOs are defined in `dtoTypes.js` and reflect the backend shape precisely.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import { useCallback } from 'react';
import { NotificationAPI } from '@/api/restApi';
import { useApiUtils } from '@/utils/apiUtils';
/**
 * @typedef {import('@/api/dtoTypes').NotificationQueryDTO}
 * @typedef {import('@/api/dtoTypes').NotificationResultDTO}
 */

/**
 * Hook for accessing greenhouse notifications over a time period.
 *
 * @returns {{
 *   getPastNotifications: (greenhouseId: number, query: NotificationQueryDTO) => Promise<NotificationResultDTO[]>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { getPastNotifications, isLoading, error } = useNotification();
 *
 * const result = await getPastNotifications(1, {
 *   startDate: '2024-01-01T00:00:00Z',
 *   endDate: '2024-02-01T00:00:00Z'
 * });
 * console.log(result); // [{ id, timestamp, content }, ...]
 */
export function useNotification() {
    const { handleRequest, isLoading, error } = useApiUtils();

    /**
     * Fetches notification logs for a greenhouse using a date range.
     *
     * @param {number} greenhouseId - Target greenhouse ID.
     * @param {NotificationQueryDTO} query - Object with `startDate` and `endDate`.
     * @returns {Promise<NotificationResultDTO[]>} List of notification entries.
     * @throws unknown - If query fails or parameters are invalid.
     * @example
     * const notifications = await getPastNotifications(5, {
     *   startDate: '2024-01-01',
     *   endDate: '2024-05-01'
     * });
     */
    const getPastNotifications = useCallback((greenhouseId, query) => handleRequest(() => NotificationAPI.getPastNotifications(greenhouseId, query)), [handleRequest]);

    return { getPastNotifications, isLoading, error };
}