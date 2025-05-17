/* global clients */

/**
 * @file serviceWorker.js
 * @description Service worker for handling push notifications.
 *
 * This service worker listens for push events, displays notifications to the user,
 * and manages user interactions with those notifications (e.g., opening the app window).
 *
 * It does not handle caching or offline functionality.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Push_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification
 * @version 1.0.0
 * @since 0.6.5
 * @author Taggerkov
 */

// Push event to handle push notifications.
self.addEventListener('push', function(event) {
    console.log('Push received:', event);
    const data = event.data ? event.data.json() : {
        title: 'Push Notification',
        body: 'You have a new notification!'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/smartgrow.ico',
            tag: 'push-notification',
        })
    );
});

// Notification clicks event to handle user interaction with the notification.
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});