import { useEffect, useState } from "react";

// Returns { isInstalled, hasUpdate }
export function usePwaStatus() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [hasUpdate, setHasUpdate] = useState(false);

    useEffect(() => {
        // Detect if app is running in standalone mode
        const checkStandalone = () =>
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsInstalled(checkStandalone());

        // Listen for appinstalled event
        const handler = () => setIsInstalled(true);
        window.addEventListener('appinstalled', handler);

        // Listen for service worker update (Vite PWA)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(reg => {
                    reg.addEventListener('updatefound', () => setHasUpdate(true));
                    if (reg.waiting) setHasUpdate(true);
                });
            });
        }

        return () => {
            window.removeEventListener('appinstalled', handler);
        };
    }, []);

    return { isInstalled, hasUpdate };
}