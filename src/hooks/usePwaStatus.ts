import { useEffect, useState } from 'react';

export function usePwaStatus() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [hasUpdate, setHasUpdate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Reliable mobile detection
        const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';

        const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(ua);

        const isInStandaloneMode =
            (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
            (navigator as any).standalone === true;

        if (isMobileDevice && isInStandaloneMode) {
            console.log("Running as PWA on mobile ✅");
        } else if (isMobileDevice) {
            console.log("Running in mobile browser 🌐");
        } else {
            console.log("Running on desktop 💻");
        }

        

        // if (!isMobileDevice) {
        //     return; // Skip PWA checks on non-mobile devices
        // }

        // Detect standalone mode
        const checkStandalone = () =>
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsInstalled(checkStandalone());

        // Handle app installation event
        const handleAppInstalled = () => setIsInstalled(true);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Check for service worker updates
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((reg) => {
                    // Listen for updatefound event
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && reg.waiting) {
                                    setHasUpdate(true);
                                }
                            });
                        }
                    });

                    // Check if there's a waiting worker (update available)
                    if (reg.waiting) {
                        setHasUpdate(true);
                    }
                });
            });
        }

        // Cleanup event listener
        return () => {
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    return { isInstalled, hasUpdate, isMobile };
}