/**
 * @file usePreset.js
 * @description
 * React hook for managing user-defined environmental presets used in greenhouse automation.
 * Wraps `PresetAPI` and provides CRUD access to the backend `PresetController`.
 *
 * Includes:
 * - `createPreset()` to add a new preset
 * - `getPreset()` to retrieve a preset by ID
 * - `updatePreset()` to modify an existing preset
 * - `deletePreset()` to permanently remove a preset
 *
 * Shared async state is handled via `useApiUtils()`.
 *
 * Preset data structure is assumed to match the backend `Preset` entity.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import { useCallback } from 'react';
import { PresetAPI } from '@/api/restApi';
import { useApiUtils } from '@/utils/apiUtils';
/**
 * @typedef {import('@/api/dtoTypes').Preset}
 */

/**
 * Hook for creating, updating, fetching, and deleting environmental presets.
 *
 * @returns {{
 *   createPreset: (preset: Preset) => Promise<Preset>,
 *   getPreset: (id: number) => Promise<Preset>,
 *   updatePreset: (id: number, preset: Preset) => Promise<number>,
 *   deletePreset: (id: number) => Promise<number>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * const { createPreset, getPreset, updatePreset, deletePreset, isLoading, error } = usePreset();
 *
 * const newPreset = await createPreset({ name: 'Tomatoes', temperature: 22, soilHumidity: 60, airHumidity: 55 });
 * const saved = await getPreset(newPreset.id);
 * await updatePreset(saved.id, { ...saved, name: 'Tomatoes v2' });
 * await deletePreset(saved.id);
 */
export function usePreset() {
    const { handleRequest, isLoading, error } = useApiUtils();

    /**
     * Creates a new environmental preset.
     *
     * @param {Preset} preset - Environmental values and name.
     * @returns {Promise<Preset>} The newly created preset object.
     */
    const createPreset = useCallback((preset) => handleRequest(() => PresetAPI.createPreset(preset)), [handleRequest]);

    /**
     * Retrieves a single preset by its ID.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<Preset>} The preset object if found.
     */
    const getPreset = useCallback((id) => handleRequest(() => PresetAPI.getPreset(id)), [handleRequest]);

    /**
     * Updates an existing preset.
     *
     * @param {number} id - Preset ID.
     * @param {Preset} preset - New preset data.
     * @returns {Promise<number>} HTTP status code.
     */
    const updatePreset = useCallback((id, preset) => handleRequest(() => PresetAPI.updatePreset(id, preset)), [handleRequest]);

    /**
     * Deletes a preset by its ID.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<number>} HTTP status code.
     */
    const deletePreset = useCallback((id) => handleRequest(() => PresetAPI.deletePreset(id)), [handleRequest]);

    return {createPreset, getPreset, updatePreset, deletePreset,isLoading, error};
}