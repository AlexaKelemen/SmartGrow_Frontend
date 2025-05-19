/**
 * @file hooks/push/index.js
 * @description
 * Export hub for push-notification related custom React hooks.
 *
 * This module is intended to group logic related to browser/device push subscriptions,
 * permission requests, and service worker interactions — separate from typical REST-bound APIs.
 *
 * Keeps notification delivery and subscription handling modular and clearly scoped.
 *
 * @example
 * import { usePush } from '@/hooks/push';
 *
 * const { requestPermission, subscribe, unsubscribe } = usePush();
 *
 * @see hooks/push/usePush.js for full hook implementation and logic
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

export {usePush} from './usePush';