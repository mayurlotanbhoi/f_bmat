// hooks/usePwaPrompt.ts
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
}

export default function usePwaPrompt(): UsePwaPromptReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      console.log('PWA install prompt captured');

      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed successfully');
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalling(false);
    };

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstallable(false);
    }

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.warn('No install prompt available');
      return false;
    }

    try {
      setIsInstalling(true);

      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`User ${outcome} the install prompt`);

      // Clean up
      setDeferredPrompt(null);
      setIsInstallable(false);

      return outcome === 'accepted';

    } catch (error) {
      console.error('Error during PWA installation:', error);
      return false;
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    installApp,
    isInstalling,
    canInstall: !!deferredPrompt
  };
}