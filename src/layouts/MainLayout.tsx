// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { AppDownloading, AppInstall, Footer, FullFirework, Header, ScrollToTop, SpeedDail } from '../components';
import { Suspense, useEffect, useState } from 'react';
import { HomeSkeleton, ProfileSkeleton } from '../components/Common/skeletons';
import AppLoader from '../app/AppLoader';
import { useFirebaseMessaging } from '../hooks/useFirebaseMessaging';
import { useAuth } from '../hooks/useAuth';
import Drawer from '../components/Common/Drawer';
import { usePwaStatus } from '../hooks/usePwaStatus';
import { usePwaPrompt } from '../hooks';


// const skeletons = {
//   : <HomeSkeleton />,
//   "/profile": <ProfileSkeleton />,
// };
const skeletons = (path: string) => {

  switch (path) {
    case "/": return <HomeSkeleton />;
    case "/profile": return <ProfileSkeleton />;


    default:
      return <ProfileSkeleton />;
  }

}


const SuspenseWrapper = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [showInstallDrawer, setShowInstallDrawer] = useState(false);
      const [isClickOnInstall, setClickOnInstall] = useState<boolean>(false);
  
      const [open, setOpen] = useState(false);
  
      const { isInstalled, hasUpdate } = usePwaStatus();
      const { installApp, isInstallable, canInstall } = usePwaPrompt();
  const { user } = useAuth();
  const Padding = ['profile', 'chat', 'user', 'complet-profile', 'initial-info'];
  const header = ['profile', 'chat', 'initial-info'];
  const fullScrren = ['chat', 'complet-profile', 'initial-info'];
  const speedDial = ['profile', 'initial-info', 'user'];

  console.log("location", location.pathname)
  type Path = keyof typeof skeletons;
  const pathname = location.pathname as Path;
  const fallbackSkeleton = skeletons(pathname);
  // Check if any value from removeFor is included in the pathname
  const removePadding = Padding.some((item) => location.pathname.includes(item));
  const fullScreeenRemove = fullScrren.some((item) => location.pathname.includes(item));
  const removeHeader = header.some((item) => location.pathname.includes(item));
  const hiddeSpeedDail = speedDial.some((item) => location.pathname.includes(item));

  // useEffect(() => {
  // console.log("user", user)
  // console.log("user?.fcmTokens?.length", user?.fcmTokens?.length)
  if (user?._id) {
    useFirebaseMessaging(user?._id);
  }

   const handleAppInstall = async () => {
          setClickOnInstall(true);
  
          try {
              const success = await installApp();
  
              if (success) {
                  // Show downloading animation for 4 seconds
                  setTimeout(() => {
                      setClickOnInstall(false);
                      setShowInstallDrawer(false);
                      FullFirework();
                  }, 4000);
              } else {
                  // Installation failed or was cancelled
                  setClickOnInstall(false);
              }
          } catch (error) {
              console.error('Installation error:', error);
              setClickOnInstall(false);
          }
      };
  
      const handleUpdateApp = () => {
          // Reload the page to activate the new service worker
          window.location.reload();
      };
  
      const handleCloseDrawer = () => {
          setShowInstallDrawer(false);
      };

   useEffect(() => {
          console.log('hasUpdate', hasUpdate, 'showInstallDrawer', showInstallDrawer, 'isInstalled', isInstalled);
          if (hasUpdate || (showInstallDrawer && !isInstalled)) {
              setOpen(true);
          }
      }, [hasUpdate, showInstallDrawer, isInstalled]);

  // }, [])

  return (
    <div className="">


      <ScrollToTop />
      <AppLoader />

      {!removeHeader && <Header />}
      <main className={`w-full  ${removePadding ? '' : 'px-0 md:px-5 mt-20'}  sm:px-6  max-w-screen-lg mx-auto `}>
        <SuspenseWrapper fallback={fallbackSkeleton}>
          <Outlet />
        </SuspenseWrapper>
      </main>
      {!fullScreeenRemove && <Footer />}
      {!hiddeSpeedDail && <SpeedDail />}



      {/* AppInstall  */}
      <Drawer
        isOpen={open}
        position="bottom"
        padding="p-0"
        widthClass="w-100"
        className="rounded-t-lg"
        showCloseBtn={!hasUpdate} // Don't show close button for updates
        onClose={handleCloseDrawer}
      >
        {hasUpdate ? (
          <AppInstall
            installApp={handleUpdateApp}
            title="Update Available"
            description="A new version of the app is available. Update now for the latest features!"
          />
        ) : isClickOnInstall ? (
          <AppDownloading />
        ) : (
          <AppInstall
            installApp={handleAppInstall}
            title="Install App"
            description="Install our app for a better experience!"
          />
        )}
      </Drawer>
    </div>
  );
}

export default MainLayout