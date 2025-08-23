import { useEffect, useState } from 'react';

export function usePwaStatus() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [hasUpdate, setHasUpdate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Reliable mobile detection
        const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) &&
            !/Macintosh|Windows|Linux/i.test(ua); // Exclude desktop OS
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        setIsMobile(isMobileDevice && isTouchDevice);

        if (!isMobileDevice) {
            return; // Skip PWA checks on non-mobile devices
        }

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