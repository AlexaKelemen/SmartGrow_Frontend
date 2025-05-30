/**
 * @file useGreenhouse.js
 * @description
 * React hook for managing greenhouse device operations linked to the authenticated user.
 * Integrates with `GreenhouseAPI` and wraps core functionality such as pairing,
 * unpairing, and renaming greenhouses.
 *
 * This hook standardizes API access and error/loading management across:
 * - `GreenhouseAPI.pair()` for associating a new greenhouse by MAC address
 * - `GreenhouseAPI.unpair()` for removing greenhouse ownership
 * - `GreenhouseAPI.rename()` to change the greenhouse's display name
 *
 * Shared async state is managed via `useApiUtils()` and updates per request.
 *
 * All data structures used are defined in `dtoTypes.js`.
 *
 * @author Taggerkov, Alexa Kelemen
 * @version 1.0.0
 * @since 0.7.0
 */

import { useCallback } from 'react';
import { GreenhouseAPI } from '@/api/restApi';
import { useApiUtils } from '@/utils/apiUtils';

/**
 * @typedef {import('@/api/dtoTypes').GreenhousePairDTO}
 * @typedef {import('@/api/dtoTypes').GreenhouseRenameDTO}
 * @typedef {import('@/api/dtoTypes').GreenhouseDTO}
 */

/**
 * Hook for pairing, unpairing, and renaming user-owned greenhouses.
 *
 * Provides API-bound methods and shared async state:
 * - `pair()` to associate a new greenhouse with the logged-in user
 * - `unpair()` to detach an existing greenhouse by ID
 * - `rename()` to update greenhouse name
 * - `getAll()` to fetch all greenhouses for the current user
 *
 * @returns {{
 *   pair: (payload: GreenhousePairDTO) => Promise<string>,
 *   unpair: (id: number) => Promise<string>,
 *   rename: (payload: GreenhouseRenameDTO) => Promise<string>,
 *   getAll: () => Promise<GreenhouseDTO[]>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { pair, unpair, rename, isLoading, error } = useGreenhouse();
 *
 * await pair({ macAddress: '00:A0:C9:14:C8:29', name: 'Backyard Greenhouse' });
 * await rename({ id: 4, name: 'Tomato Heaven' });
 * await unpair(4);
 */
export function useGreenhouse() {
    const { handleRequest, isLoading, error } = useApiUtils();

    /**
     * Pairs a new greenhouse with the authenticated user.
     *
     * @param {GreenhousePairDTO} payload - MAC address and name of the greenhouse.
     * @returns {Promise<string>} Confirmation message from backend.
     * @throws unknown - If pairing fails or validation errors occur.
     * @example
     * await pair({ macAddress: '00:A0:C9:14:C8:29', name: 'Greenhouse #3' });
     */
    const pair = useCallback((payload) => handleRequest(() => GreenhouseAPI.pair(payload)), [handleRequest]);

    /**
     * Unpairs an existing greenhouse from the authenticated user.
     *
     * @param {number} id - ID of the greenhouse to unpair.
     * @returns {Promise<string>} Confirmation message from backend.
     * @throws unknown - If the greenhouse cannot be found or unpairing fails.
     * @example
     * await unpair(3);
     */
    const unpair = useCallback((id) => handleRequest(() => GreenhouseAPI.unpair(id)), [handleRequest]);

    /**
     * Renames a greenhouse associated with the current user.
     *
     * @param {GreenhouseRenameDTO} payload - New name and corresponding greenhouse ID.
     * @returns {Promise<string>} Confirmation message from backend.
     * @throws unknown - If the rename fails due to authorization or invalid ID.
     * @example
     * await rename({ id: 2, name: 'Basement Unit' });
     */
    const rename = useCallback((payload) => handleRequest(() => GreenhouseAPI.rename(payload)), [handleRequest]);

    /**
   * Fetches all greenhouses for the authenticated user.
   * @returns {Promise<GreenhouseDTO[]>}
   */
  const getAll = useCallback(
    () => handleRequest(() => GreenhouseAPI.getAll()),
    [handleRequest]
  );
  /**
 * Assigns a preset to a greenhouse by its ID.
 *
 * @param {number} id - The ID of the greenhouse.
 * @param {number} presetId - The ID of the preset to assign.
 * @returns {Promise<string>} A confirmation message from the backend.
 */
const assignPreset = useCallback((id, presetId) =>
    handleRequest(() => GreenhouseAPI.assignPreset(id, presetId)), [handleRequest]);
  
/**
 * Triggers a configuration for a greenhouse.
 *
 * @param {number} greenhouseId - ID of the greenhouse (used in query param).
 * @param {number|string} id - Configuration ID (used in path).
 * @param {{ type: string, method: string }} payload
 * @returns {Promise<string>}
 */
const configure = useCallback(
    (greenhouseId, id, payload) =>
      handleRequest(() => GreenhouseAPI.configure(greenhouseId, id, payload)),
    [handleRequest]
  );
  

  /**
   * Triggers a prediction for the specified greenhouse.
   *
   * @param {number} greenhouseId - The ID of the greenhouse to predict for.
   * @returns {Promise<string>} A prediction result or confirmation from the backend.
   */
  const predict = useCallback((greenhouseId) =>
    handleRequest(() => GreenhouseAPI.predict(greenhouseId)), [handleRequest]);

    return { pair, unpair, rename,getAll, assignPreset,configure,predict, isLoading, error };
}