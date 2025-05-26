/**
 * @file useAction.js
 * @description
 * React hook for retrieving historical actions performed on a greenhouse.
 * Integrates with `ActionAPI` and wraps backend access to the `ActionController`.
 *
 * Provides a single method:
 * - `getPastActions()` — fetches logged greenhouse actions within a specified date range
 *
 * Shared async state (`isLoading`, `error`) is managed via `useApiUtils()`.
 *
 * DTOs for request and response are defined in `dtoTypes.js`.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback} from 'react';
import {ActionAPI} from '@/api/restApi';
import {useApiUtils} from '@/utils/apiUtils';
/**
 * @typedef {import('@/api/dtoTypes').ActionQueryDTO}
 * @typedef {import('@/api/dtoTypes').ActionResultDTO}
 */

/**
 * Hook for querying historical greenhouse actions by date range.
 *
 * @returns {{
 *   getPastActions: (greenhouseId: number, filters: ActionQueryDTO) => Promise<ActionResultDTO[]>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { getPastActions, isLoading, error } = useAction();
 *
 * const actions = await getPastActions(1, {
 *   startDate: '2024-01-01T00:00:00Z',
 *   endDate: '2024-02-01T00:00:00Z'
 * });
 */

  
export function useAction() {
    const {handleRequest, isLoading, error} = useApiUtils();

    /**
     * Fetches past greenhouse actions based on a time range.
     *
     * @param {number} greenhouseId - ID of the greenhouse.
     * @param {ActionQueryDTO} filters - Start and end timestamps.
     * @returns {Promise<ActionResultDTO[]>} List of actions performed during the specified time.
     * @throws unknown - If request fails or input is invalid.
     * @example
     * const actions = await getPastActions(3, {
     *   startDate: '2024-01-01',
     *   endDate: '2024-05-01'
     * });
     */
    const getPastActions = useCallback((greenhouseId, filters) => handleRequest(() => ActionAPI.getPastActions(greenhouseId, filters)), [handleRequest]);
   
    /**
   * Triggers a new action on a greenhouse.
   *
   * @param {number} greenhouseId - ID of the greenhouse.
   * @param {string} actionType - Type of the action to trigger (e.g., "Irrigation").
   * @returns {Promise<string>} Server response confirming the action.
   */
  const triggerAction = useCallback(
    (greenhouseId, actionType) =>
      handleRequest(() => ActionAPI.triggerAction(greenhouseId, actionType)),
    [handleRequest]
  );

    return {getPastActions,triggerAction, isLoading, error};
}