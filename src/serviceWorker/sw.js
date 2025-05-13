self.addEventListener('push', event => {
    const data = event.data?.json() || { title: 'SmartGrow Alert', body: 'New update from your plants!' };

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icon.png',
            tag: 'smartgrow-alert',
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});