/**
 * @file index.js
 * @description Centralized export file for all custom React hooks in the application.
 * Provides a single point of access for importing hooks, improving code maintainability and scalability.
 *
 * This index groups and re-exports hooks related to:
 * - Sensor Readings (useSensorReadings)
 * - Machine Learning Predictions (useModelPrediction)
 * - Greenhouse Control State (useControlState)
 *
 * Future hooks should be added here to maintain a clean and consistent import structure across the project.
 *
 * @example
 * // Instead of:
 * import { useSensorReadings } from '@/hooks/useSensorReadings';
 * import { useModelPrediction } from '@/hooks/useModelPrediction';
 *
 * // You can do:
 * import { useSensorReadings, useModelPrediction } from '@/hooks';
 *
 * @example
 * // Usage inside a React component:
 * import { useControlState } from '@/hooks';
 *
 * function ControlPage() {
 *   const { current, fetchCurrentState } = useControlState();
 *   // ...
 * }
 *
 * @see useSensorReadings
 * @see useModelPrediction
 * @see useControlState
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

export { useSensorReadings } from './useSensorReadings';
export { useModelPrediction } from './useModelPrediction';
export { useControlState } from './useControlState';