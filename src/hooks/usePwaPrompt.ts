import { useEffect, useState, useCallback } from 'react';

// Type definition for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface UsePwaPromptReturn {
  isInstallable: boolean;
  installApp: () => Promise<boolean>;
  isInstalling: boolean;
  canInstall: boolean;
  isIOS: boolean;
  iosInstallInstructions?: string;
}

export default function usePwaPrompt(): UsePwaPromptReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const checkStandalone = useCallback(() => {
    return window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
  }, []);

  useEffect(() => {
    const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(false);

    console.log("isIOSDevice", isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('PWA install prompt captured', (e as BeforeInstallPromptEvent).platforms);
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      setIsInstallable(!checkStandalone());
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed successfully');
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalling(false);
    };

  
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    

    const intervalId = setInterval(() => {
      if (!isIOSDevice && !checkStandalone()) {
        setIsInstallable(true);
      }
    }, 3000);

    // Initial check
    if (checkStandalone()) {
      setIsInstallable(false);
    }

    return () => {
      if (!isIOSDevice) {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      }
      clearInterval(intervalId);
    };
  }, [checkStandalone]);

  const installApp = useCallback(async (): Promise<boolean> => {
    if (isIOS) {
      console.log('Install prompt not supported on iOS. Use "Add to Home Screen".');
      return false;
    }

    if (!deferredPrompt) {
      console.warn('No install prompt available');
      return false;
    }

    try {
      setIsInstalling(true);
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the install prompt`);
      setDeferredPrompt(null);
      setIsInstallable(false);
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error during PWA installation:', error);
      return false;
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt, isIOS]);

  return {
    isInstallable,
    installApp,
    isInstalling,
    canInstall: !!deferredPrompt && !isIOS,
    isIOS,
    iosInstallInstructions: isIOS
      ? 'To install this app on iOS, tap the Share button and select "Add to Home Screen".'
      : undefined,
  };
}



// import { useEffect, useState, useCallback } from 'react';

// // Type definition for the beforeinstallprompt event
// interface BeforeInstallPromptEvent extends Event {
//   readonly platforms: string[];
//   readonly userChoice: Promise<{
//     outcome: 'accepted' | 'dismissed';
//     platform: string;
//   }>;
//   prompt(): Promise<void>;
// }

// interface UsePwaPromptReturn {
//   isInstallable: boolean;
//   installApp: () => Promise<boolean>;
//   isInstalling: boolean;
//   canInstall: boolean;
//   isIOS: boolean;
//   iosInstallInstructions?: string;
// }

// export default function usePwaPrompt(): UsePwaPromptReturn {
//   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
//   const [isInstallable, setIsInstallable] = useState(false);
//   const [isInstalling, setIsInstalling] = useState(false);
//   const [isIOS, setIsIOS] = useState(false);

//   const checkStandalone = useCallback(() => {
//     return window.matchMedia('(display-mode: standalone)').matches ||
//       (window.navigator as any).standalone === true;
//   }, []);

//   useEffect(() => {
//     const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;
//     setIsIOS(isIOSDevice);

//     const handleBeforeInstallPrompt = (e: Event) => {
//       e.preventDefault();
//       console.log('PWA install prompt captured', (e as BeforeInstallPromptEvent).platforms);
//       const event = e as BeforeInstallPromptEvent;
//       setDeferredPrompt(event);
//       setIsInstallable(!checkStandalone());
//     };

//     const handleAppInstalled = () => {
//       console.log('PWA was installed successfully');
//       setDeferredPrompt(null);
//       setIsInstallable(false);
//       setIsInstalling(false);
//     };

//     if (!isIOSDevice) {
//       window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       window.addEventListener('appinstalled', handleAppInstalled);
//     }

//     const intervalId = setInterval(() => {
//       if (!isIOSDevice && !checkStandalone()) {
//         setIsInstallable(true);
//       }
//     }, 3000);

//     // Initial check
//     if (checkStandalone()) {
//       setIsInstallable(false);
//     }

//     return () => {
//       if (!isIOSDevice) {
//         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//         window.removeEventListener('appinstalled', handleAppInstalled);
//       }
//       clearInterval(intervalId);
//     };
//   }, [checkStandalone]);

//   const installApp = useCallback(async (): Promise<boolean> => {
//     if (isIOS) {
//       console.log('Install prompt not supported on iOS. Use "Add to Home Screen".');
//       return false;
//     }

//     if (!deferredPrompt) {
//       console.warn('No install prompt available');
//       return false;
//     }

//     try {
//       setIsInstalling(true);
//       await deferredPrompt.prompt();
//       const { outcome } = await deferredPrompt.userChoice;
//       console.log(`User ${outcome} the install prompt`);
//       setDeferredPrompt(null);
//       setIsInstallable(false);
//       return outcome === 'accepted';
//     } catch (error) {
//       console.error('Error during PWA installation:', error);
//       return false;
//     } finally {
//       setIsInstalling(false);
//     }
//   }, [deferredPrompt, isIOS]);

//   return {
//     isInstallable,
//     installApp,
//     isInstalling,
//     canInstall: !!deferredPrompt && !isIOS,
//     isIOS,
//     iosInstallInstructions: isIOS
//       ? 'To install this app on iOS, tap the Share button and select "Add to Home Screen".'
//       : undefined,
//   };
// }
