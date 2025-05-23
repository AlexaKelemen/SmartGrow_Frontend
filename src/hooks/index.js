/**
 * @file hooks/index.js
 * @description Centralized export file for all custom React hooks in the application.
 * Provides a single point of access for importing hooks, improving code maintainability and scalability.
 *
 * Future hooks should be added here to maintain a clean and consistent import structure across the project.
 *
 * @example
 * // Instead of:
 * import { useAuth } from '@/hooks/api/useAuth';
 * import { useSensor } from '@/hooks/api/useSensor';
 *
 * // You can do:
 * import { useAuth, useSensor } from '@/hooks';
 *
 * @example
 * // Usage inside a React component:
 * import { useUser } from '@/hooks';
 *
 * function Authentification() {
 *   const { login, register, refresh } = useAuth();
 *   // ...
 * }
 *
 * @see useSensorReadings
 * @see useModelPrediction
 * @see useControlState
 *
 * @author Taggerkov
 * @version 2.0.0
 * @since 0.0.1
 */

export * from './api';
export * from './push';