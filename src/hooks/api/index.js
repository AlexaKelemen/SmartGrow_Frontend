/**
 * @file hooks/api/index.js
 * @description
 * Domain-specific export aggregator for all API-related React hooks.
 * This file organizes and exposes grouped hook modules by functionality (auth, user, sensors, etc.).
 *
 * It is imported by the global `hooks/index.js`, which provides a single unified import point for all hooks across the application.
 * Keeping this modular separation helps enforce domain boundaries and supports long-term scalability.
 *
 * @example
 * // Internal usage in hooks/index.js:
 * export { * } from './api';
 *
 * @see hooks/index.js for application-wide usage
 * @see hooks/api/useAuth.js for specific hook implementations
 *
 * @module hooks/api
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

export {useAction} from './useAction';
export {useAuth} from './useAuth';
export {useGreenhouse} from './useGreenhouse';
export {useHealth} from './useHealth';
export {useNotification} from './useNotification';
export {usePreset} from './usePreset';
export {useSensor} from './useSensor';
export {useUser} from './useUser';