// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header, ScrollToTop, SpeedDail } from '../components';
import { Suspense, useEffect } from 'react';
import { HomeSkeleton, ProfileSkeleton } from '../components/Common/skeletons';
import AppLoader from '../app/AppLoader';
import { useFirebaseMessaging } from '../hooks/useFirebaseMessaging';
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuth();
  const Padding = ['profile', 'chat', 'user', 'complet-profile'];
  const header = ['profile', 'chat',];
  const fullScrren = ['chat', 'complet-profile'];
  const speedDial = ['profile',];

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
  //   console.log("user", user)
  if (user?.fcmTokens?.length === 0) {
    useFirebaseMessaging(user?._id);
  }

  // }, [])

  return (
    <div className="app">
      <ScrollToTop />
      <AppLoader />

      {!removeHeader && <Header />}
      <main className={`w-full ${removePadding ? '' : 'px-0 md:px-5 mt-20'}  sm:px-6  max-w-screen-lg mx-auto `}>
        <SuspenseWrapper fallback={fallbackSkeleton}>
          <Outlet />
        </SuspenseWrapper>
      </main>
      {!fullScreeenRemove && <Footer />}
      {!hiddeSpeedDail && <SpeedDail />}



      {/* AppInstall  */}
    </div>
  );
}

export default MainLayout