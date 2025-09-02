import { FaMobileAlt, FaCheckCircle } from 'react-icons/fa';
import { MdSystemUpdateAlt } from 'react-icons/md';
import { usePwaStatus } from '../../hooks/usePwaStatus';
import { useEffect, useRef } from 'react';

type AppInstallProps = {
  installApp: () => void;
  title: string;
  description: string;
};

export default function AppInstall({ installApp, title, description }: AppInstallProps) {
  const { isInstalled, hasUpdate } = usePwaStatus();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap for accessibility


  // Hide if already installed and no update
  if (isInstalled && !hasUpdate) return null;

  return (
    <div
    
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl animate-slideUp   z-50 p-0  border-t border-gray-200"
      style={{ boxShadow: '0 -8px 32px 0 rgba(0,0,0,0.18)' }}
    >
      
      <div className="flex flex-col gap-4 p-6">
        {/* Drag handle */}
        <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-2" />

        {/* Update available UI */}
        {hasUpdate ? (
          <>
            <div className="flex items-center gap-3 h-100 ">
                          <MdSystemUpdateAlt className="text-primary0 text-3xl animate-bounce" />
                          <h2 className="text-xl font-bold text-primary">Update Available</h2>
            </div>
            <p className="text-sm text-gray-600">
              A new version of the app is ready! Update now for the latest features and improvements.
            </p>
            <button
              onClick={() => window.location.reload()}
                          className="mt-4 px-5 py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
              aria-label="Update app"
            >
              Update Now
            </button>
          </>
        ) : (
          <>
            {/* Install UI */}
            <div className="flex items-center gap-3">
              <FaMobileAlt className="text-primary text-3xl animate-pulse" />
              <h2 className="text-xl font-bold text-primary">Install Our App</h2>
            </div>
            <p className="text-sm text-gray-600">
              Get the best experience by installing our Progressive Web App.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Lightning-fast access anytime, anywhere.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Smooth offline usage and native app feel.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                No app store needed—install instantly!
              </li>
            </ul>
            <button
              onClick={installApp}
              className="mt-4 px-5 py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
              aria-label="Install app"
            >
              Install Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
