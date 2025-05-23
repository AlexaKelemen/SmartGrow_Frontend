/**
 * @file useApiUtils.js
 * @description
 * Provides a reusable utility hook for handling API requests with built-in `isLoading` and `error` state.
 * Intended to be used across all custom data-fetching hooks (e.g., `useAuth`, `useSensor`, `useNotification`).
 *
 * This hook simplifies API interaction by wrapping asynchronous calls in a shared handler (`handleRequest`),
 * while also exposing component-safe `isLoading` and `error` bindings.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback, useState} from "react";

/**
 * Reusable API utility hook for managing request state.
 *
 * @returns {{
 *   handleRequest: <T>(fn: () => Promise<T>) => Promise<T>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 *
 * @example
 * import { useApiUtils } from '@/utils/apiUtils';
 *
 * const { handleRequest, isLoading, error } = useApiUtils();
 *
 * const data = await handleRequest(() => fetchDataFromAPI());
 */
export function useApiUtils() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Wraps an asynchronous API call with automatic loading/error handling.
     *
     * @template T
     * @param {() => Promise<T>} action - The async function to execute.
     * @returns {Promise<T>} The resolved value from the `action` callback.
     * @throws unknown - If the wrapped action throws.
     *
     * @example
     * const result = await handleRequest(() => API.getStuff());
     */
    const handleRequest = useCallback(async (action) => {
        setLoading(true);
        setError(null);
        try {
            return await action();
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { handleRequest, isLoading, error };
}