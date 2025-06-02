// src/hooks/useFirebaseMessaging.ts
import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
    authDomain: "push-notification-ea1fa.firebaseapp.com",
    projectId: "push-notification-ea1fa",
    storageBucket: "push-notification-ea1fa.firebasestorage.app",
    messagingSenderId: "545562261821",
    appId: "1:545562261821:web:26691e6028aad5e4dbed54",
    measurementId: "G-B02Q5ZDQV4",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const useFirebaseMessaging = (userId: string) => {
    useEffect(() => {
        async function requestPermissionAndToken() {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    console.warn('Notification permission denied');
                    return;
                }

                console.log('Notification permission granted.');

                const token = await getToken(messaging, {
                    vapidKey: "BKu5onkuM7rkxFBTo1jEJ_PTno0D_IDPK-_t3Bnr05egp-oZ_ixE1_yTSRQ6TSJhbBp97NrbdzC6WrZ3MgHyIY8",
                });

                if (token) {
                    console.log("FCM Token:", token);
                    await fetch("http://localhost:5000/api/v1/notifications/save-subscription", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: userId, fcmToken: token }),
                    });
                } else {
                    console.warn("No FCM token available.");
                }
            } catch (err) {
                console.error("Error during FCM setup:", err);
            }
        }

        requestPermissionAndToken();

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Foreground message received:", payload);
            const { title = "Notification", body = "App message", imageUrl = "Image", url = '/' } = payload.data || {};

            // Check if browser supports notifications
            if (Notification.permission === "granted") {
                new Notification(title, {
                    body: body,
                    // @ts-ignore
                    imageUrl: imageUrl,
                    url: url,
                    icon: "/logo192.png", // Optional: your app icon
                });
            } else {
                // If notifications aren't granted, you could fallback to a toast or alert
                alert(`Message: ${title}\n${body}`);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                }).catch((err) => {
                    console.error('Service Worker registration failed:', err);
                });
        }
    }, []);
};
