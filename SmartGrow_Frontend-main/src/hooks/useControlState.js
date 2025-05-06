/**
 * @file useControlState.js
 * @description Custom React hook for managing and fetching control system state data from the backend.
 * Provides current control state and history, along with loading and error management.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import { useState } from 'react';
import { ControlAPI } from '@/api/restApi';

/**
 * Hook for fetching the current control system state and control state history.
 *
 * @returns {{
 *   current: Object|null,
 *   history: Object[]|null,
 *   loading: boolean,
 *   error: string|null,
 *   fetchCurrentState: () => Promise<void>,
 *   fetchHistory: (limit?: number) => Promise<void>
 * }}
 * @example
 * const { current, history, loading, error, fetchCurrentState, fetchHistory } = useControlState();
 *
 * fetchCurrentState();
 * fetchHistory(50);
 */
export function useControlState() {
    const [current, setCurrent] = useState(null);
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch the latest control system state from the backend.
     *
     * @async
     * @function fetchCurrentState
     * @returns {Promise<void>}
     * @example
     * await fetchCurrentState();
     */
    async function fetchCurrentState() {
        setLoading(true);
        setError(null);
        try {
            const state = await ControlAPI.getCurrentState();
            setCurrent(state);
        } catch (err) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetch the history of control system states from the backend.
     *
     * @async
     * @function fetchHistory
     * @param {number} [limit=20] - Number of historical entries to retrieve.
     * @returns {Promise<void>}
     * @example
     * await fetchHistory(100);
     */
    async function fetchHistory(limit = 20) {
        setLoading(true);
        setError(null);
        try {
            const historyData = await ControlAPI.getHistory(limit);
            setHistory(historyData);
        } catch (err) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    return { current, history, loading, error, fetchCurrentState, fetchHistory };
}