// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// Firebase config
firebase.initializeApp({
    apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
    authDomain: "push-notification-ea1fa.firebaseapp.com",
    projectId: "push-notification-ea1fa",
    storageBucket: "push-notification-ea1fa.appspot.com",
    messagingSenderId: "545562261821",
    appId: "1:545562261821:web:26691e6028aad5e4dbed54",
    measurementId: "G-B02Q5ZDQV4",
});

const messaging = firebase.messaging();

/**
 * Helper to extract notification data with safe defaults
 */
function parseNotificationData(data = {}) {
    console.log('data', data);
    return {
        title: data.title || '🔔 New Notification',
        body: data.body || 'You have a new message.',
        icon: data.icon || '/icons/icon-192x192.png',
        badge: data.badge || '/icons/badge-icon.png',
        image: data.image || "",
        url: data.url || '/',
    };
}

/**
 * Show notification
 */
function showNotification(data) {

    const { title, body, icon, badge, image, url } = parseNotificationData(data);
    console.log('title, body, icon, badge, image, url', title, body, icon, badge, image, url)
    const options = {
        body,
        icon: image,
        badge,
        image,
        url: url,
        data: { click_action_url: url },
        actions: [
            {
                action: 'open',
                title: 'Open',
                icon: '/icons/open-icon.png',
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/icons/close-icon.png',
            },
        ],
    };

    return self.registration.showNotification(title, options);
}

// Firebase background messages
messaging.onBackgroundMessage(payload => {
    console.log('[Service Worker] Firebase onBackgroundMessage:', payload);
    showNotification(payload.data);
});

// Raw Push API (fallback or custom push formats)
self.addEventListener('push', event => {
    if (!event.data) return;
    const payload = event.data.json();
    console.log('[Service Worker] Push event:', payload);

    event.waitUntil(showNotification(payload.data));
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            return clients.openWindow(targetUrl);
        })
    );
});
