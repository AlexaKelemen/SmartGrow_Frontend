/**
 * @file usePush.js
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
 * @version 1.5.0
 * @since 0.5.5
 */

import {useEffect, useState} from 'react';
import {getPermissionStatus, urlBase64ToUint8Array, getBrowserSubscription, isPushSupported} from '@/utils/pushUtils';
import {NotificationAPI} from "@/api/restApi";
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
export function usePush() {
    const [registration, setRegistration] = useState(null);
    const [permission, setPermission] = useState(getPermissionStatus());
    const [promptVisible] = useState(false);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const registerServiceWorker = async () => {
            if (isPushSupported() && 'serviceWorker' in navigator) await navigator.serviceWorker.register('/pushWorker.js').then(reg => setRegistration(reg)).catch(error => console.error('Service Worker registration failed', error))
        };
        registerServiceWorker();
    }, []);

    useEffect(() => {
        if (registration) {
            registration.pushManager.getSubscription().then((existingSubscription) => {
                if (existingSubscription) setSubscription(existingSubscription);
            });
            prepareSubscription()
        }
    }, [registration]);

    /**
     * Internally subscribes the user to push notifications using the given VAPID public key.
     * This function is reused by both prepareSubscription and rotateSubscription for DRYness.
     *
     * @param {string} vapidPublicKeyBase64 - The base64-encoded VAPID public key from the backend.
     * @returns {Promise<PushSubscription>} A new PushSubscription object.
     */
    async function subscribeToPush(vapidPublicKeyBase64) {
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapidPublicKeyBase64),
        });
        setSubscription(sub);
        return sub;
    }

    /**
     * Prepares the push subscription for the user.
     *
     * This function checks if the service worker registration exists and if the user
     * already has a push subscription.
     * If no subscription exists, it proceeds to check if the browser's notification permission is granted.
     *
     * If the permission is granted, it checks for an existing subscription.
     * If there is no subscription, it proceeds to request the user to subscribe, using
     * a custom UI for requesting permission and then saving the subscription if granted.
     *
     * The function does not ask for permission again if the user has already granted it.
     * If permission is denied, the subscription process will not proceed.
     *
     * @async
     * @returns {void} This function does not return any value.
     * It updates the state
     * (`subscription`, `permission`) and handles subscription logic internally.
     */
    async function prepareSubscription() {
        if (!registration || subscription) return;
        if (getPermissionStatus() === 'granted') {
            const existing = await getBrowserSubscription(registration);
            if (existing) {
                setSubscription(existing);
                return;
            }
        } else {
            const userAccepted = await showPushPermissionPrompt();
            if (!userAccepted) {
                console.log('User accepted permission?', userAccepted);
                return;
            }
            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);
            if (permissionResult !== 'granted') {
                console.log('User denied permission, maybe on Always Block?');
                return;
            }
            console.log('User accepted permission?', userAccepted);
        }
        await NotificationAPI.saveSubscription(await subscribeToPush(await NotificationAPI.getVapidKey()));
    }

    /**
     * A helper function to trigger `useState` updates in the component.
     * This function serves as a hack to force React's state updates synchronously.
     * It does not perform any actions on its own and is used to activate state transitions.
     *
     * This approach is necessary due to React's asynchronous state updates,
     * where certain actions need to be triggered immediately after state changes.
     *
     * @returns {void} This function does not return any value. Its only purpose is to force
     * state transitions by activating `useState` updates in the component.
     */
    async function runPush() {
        // This function intentionally left empty. It triggers the state updates.
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

    return {rotateSubscription, getSubscription, promptVisible, permission, runPush};
}