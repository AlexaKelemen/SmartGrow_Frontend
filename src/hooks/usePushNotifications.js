/**
 * @file usePushNotifications.js
 * @description
 * SmartGrow's push notification hook for managing client-side setup of web push services.
 * This includes service worker registration, VAPID key usage, user permission flow,
 * push subscription handling, in-memory caching, and reactive integration with React views.
 *
 * The hook ensures that browser permission is only requested after a custom confirmation
 * from the user and abstracts away raw browser API details behind a clean, composable interface.
 *
 * It is designed to support future extensibility including rotation, reset, and syncing
 * logic, while defaulting to session-cached state hydrated from browser-persistent data.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.5.5
 */

import {useEffect, useState} from 'react';
import {isPushSupported, getPermissionStatus, urlBase64ToUint8Array, getBrowserSubscription} from '@/utils/pushUtils';
import {PushAPI} from "@/api/restApi";
import {showPushPermissionPrompt} from "@/components/permissions/showPushPermissionPrompt";

/**
 * Hook that manages the full client-side logic for Web Push Notifications.
 *
 * It handles service worker registration, permission flow, push subscription,
 * user confirmation prompts, and in-memory state tracking of subscription data.
 *
 * This hook is designed to be called from views or components and exposes
 * utility methods to prepare, rotate, and retrieve subscriptions.
 *
 * React state is used to cache session-level data, while the browser's PushManager
 * serves as the persistent source of truth. The hook ensures that permission requests
 * are user-initiated via a custom confirmation UI before invoking the browser prompt.
 */
export function usePushNotifications() {
    const [registration, setRegistration] = useState(null);
    const [permission, setPermission] = useState(getPermissionStatus());
    const [promptVisible, setPromptVisible] = useState(false);
    const [resolvePrompt, setResolvePrompt] = useState(null);
    const [subscription, setSubscription] = useState(null);

    // Registers the service worker on mount if the environment supports push notifications.
    useEffect(() => {
        if (!isPushSupported()) return;
        navigator.serviceWorker.register('/sw.js').then(setRegistration).catch(err => console.error('Service worker registration failed', err));
    }, []);

    /**
     * Internally subscribes the user to push notifications using the given VAPID public key.
     * This function is reused by both prepareSubscription and rotateSubscription for DRYness.
     *
     * @param {string} vapidPublicKeyBase64 - The base64-encoded VAPID public key from the backend.
     * @returns {Promise<PushSubscription>} A new PushSubscription object.
     */
    async function subscribeToPush(vapidPublicKeyBase64) {
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKeyBase64),
        });
        setSubscription(sub);
        return sub;
    }

    /**
     * Prepares push notifications by verifying existing permissions and subscription.
     *
     * If permission is granted and a subscription already exists, hydration occurs.
     * Otherwise, it prompts the user with a custom UI, then requests browser permission
     * and subscribes them to push notifications if accepted.
     *
     * @returns {Promise<void>} Resolves once the process completes or is canceled.
     */
    async function prepareSubscription() {
        if (!registration || subscription) return;
        if (getPermissionStatus() === 'granted') {
            const existing = await getBrowserSubscription(registration);
            if (existing) {
                setSubscription(existing);
                return;
            }
        }
        const userAccepted = await showPushPermissionPrompt();
        if (!userAccepted) return;
        const permissionResult = await Notification.requestPermission();
        setPermission(permissionResult);
        if (permissionResult !== 'granted') return;
        await PushAPI.saveSubscription(await subscribeToPush(await PushAPI.getVapidKey()));
    }

    /**
     * Forces unsubscription of the current push client and creates a fresh subscription.
     * Useful when VAPID keys change or to reset backend tracking.
     *
     * @param {string} vapidPublicKeyBase64 - The base64-encoded VAPID public key.
     * @returns {Promise<void>} Resolves once re-subscription is complete.
     */
    async function rotateSubscription(vapidPublicKeyBase64) {
        if (!registration) return;
        const existing = await registration.pushManager.getSubscription();
        if (existing) await existing.unsubscribe();
        await subscribeToPush(vapidPublicKeyBase64);
    }


    /**
     * Returns the current push subscription from memory or attempts to recover it from the browser.
     * This ensures React components have access to the latest known subscription object.
     *
     * @returns {Promise<PushSubscription|null>} The push subscription, or null if unavailable.
     */
    async function getSubscription() {
        if (subscription) return subscription;
        if (!registration) return null;
        const existing = await getBrowserSubscription(registration);
        if (existing) setSubscription(existing);
        return existing;
    }

    return {
        prepareSubscription, rotateSubscription, getSubscription,
        promptVisible, permission
    };
}