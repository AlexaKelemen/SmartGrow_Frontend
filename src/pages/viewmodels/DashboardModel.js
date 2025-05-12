import { useState } from 'react';
import { SensorAPI } from '@/api/restApi';

/**
 * Custom hook for managing sensor readings state and API communication.
 * @returns {{
 *   readings: Object[]|null,
 *   loading: boolean,
 *   error: string|null,
 *   loadReadings: (limit?: number) => Promise<void>
 *   @author AlexaKelemen
 *   @since 1.0.0
 * }}
 */
export function useSensorReadingsModel() {
    const [readings, setReadings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadReadings(limit = 20) {
        setLoading(true);
        setError(null);
        try {
            const data = await SensorAPI.getReadings(limit);
            setReadings(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch sensor readings.');
        } finally {
            setLoading(false);
        }
    }

    return { readings, loading, error, loadReadings };
}
