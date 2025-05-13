/**
 * @file pushUtils.js
 * @description
 * Utility functions related to push notification logic.
 * Includes helpers for permission checking, VAPID key decoding,
 * subscription formatting, and timing control.
 *
 * This module is used by SmartGrow's frontend to abstract push notification logic
 * away from core hooks and components, ensuring consistency and testability.
 *
 * No external dependencies. All utilities are browser-based.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.5.5
 */


/**
 * Checks if the current browser supports push notifications.
 *
 * @returns {boolean} True if service workers, push manager, and notifications are supported.
 */
export function isPushSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

/**
 * Returns the current notification permission status from the browser.
 *
 * @returns {"default" | "granted" | "denied"} The current permission status.
 */
export function getPermissionStatus() {
    return Notification.permission;
}

/**
 * Converts a base64 VAPID public key string to a Uint8Array for use in PushManager.subscribe().
 *
 * @param {string} base64String - The base64-encoded VAPID public key.
 * @returns {Uint8Array} The decoded key as a Uint8Array.
 */
export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
}

/**
 * Retrieves the current push subscription stored in the browser (if any).
 *
 * @param {ServiceWorkerRegistration|null} registration - The service worker registration to query.
 * @returns {Promise<PushSubscription|null>} The existing PushSubscription or null.
 */
export async function getBrowserSubscription(registration) {
    if (!registration) return null;
    return await registration.pushManager.getSubscription();
}

/**
 * Extracts a simplified, backend-friendly version of a PushSubscription object.
 *
 * @param {PushSubscription|null} subscription - The push subscription to normalize.
 * @returns {{
 *   endpoint: string,
 *   keys: {
 *     p256dh: string,
 *     auth: string
 *   }
 * } | null} A flat object for sending to a backend, or null if input is invalid.
 */
export function normalizeSubscription(subscription) {
    if (!subscription) return null;
    const json = subscription.toJSON();
    return {
        endpoint: subscription.endpoint,
        keys: {
            p256dh: json.keys.p256dh,
            auth: json.keys.auth
        }
    };
}

/**
 * Delays execution for a given number of milliseconds. Useful for testing or staged UX.
 *
 * @param {number} ms - Duration in milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms) => new Promise(res => setTimeout(res, ms));