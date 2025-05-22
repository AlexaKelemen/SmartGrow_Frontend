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

// src/hooks/useSensor.js

import { useCallback } from 'react';
import { SensorAPI } from '@/api/restApi';
import { useApiUtils } from '@/utils/apiUtils';

export function useSensor() {
  const { handleRequest, isLoading, error } = useApiUtils();

  const getCurrentReadings = useCallback(
    (greenhouseId) => handleRequest(() => SensorAPI.getCurrentReadings(greenhouseId)),
    [handleRequest]
  );

  const getPastReadings = useCallback(
    (greenhouseId, filters = {}) => handleRequest(() => SensorAPI.getPastReadings(greenhouseId, filters)),
    [handleRequest]
  );

  return { getCurrentReadings, getPastReadings, isLoading, error };
}
