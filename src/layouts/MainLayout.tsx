// src/layouts/MainLayout.jsx
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { AppDownloading, AppInstall, Footer, FullFirework, Header, ScrollToTop, SpeedDail } from '../components';
import { Suspense, use, useEffect, useLayoutEffect, useState } from 'react';
import { HomeSkeleton, ProfileSkeleton } from '../components/Common/skeletons';
import AppLoader from '../app/AppLoader';
import { useFirebaseMessaging } from '../hooks/useFirebaseMessaging';
import { useAuth } from '../hooks/useAuth';
import Drawer from '../components/Common/Drawer';
import { usePwaStatus } from '../hooks/usePwaStatus';
import { usePwaPrompt } from '../hooks';
import { couple, verified } from '../util/images.util';
import { sendWhatsAppMessage } from '../util';
import { getMatrimony } from '../features/matrimony/matrimonySlice';
import { qrScanLink } from '../constant';
import { MdOutlineVerified } from 'react-icons/md';
import { useTranslation } from 'react-i18next';



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

// const MainLayout: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showInstallDrawer, setShowInstallDrawer] = useState(false);
//   const [isClickOnInstall, setClickOnInstall] = useState<boolean>(false);
//   const profile = getMatrimony()

//   const [isProfileCreated, setIsProfileCreated] = useState<null | string>('true');




//   // 2. Derive profile states
//   const hasProfile = !!profile?._id;
//   const isVerified = profile?.isVerified ?? false;

 

//   const [open, setOpen] = useState(false);

//   const { isInstalled, hasUpdate } = usePwaStatus();
//   const { installApp, isInstallable, canInstall } = usePwaPrompt();
//   const { user } = useAuth();
//   const Padding = ['profile', 'chat', 'user', 'complet-profile', 'initial-info'];
//   const header = ['profile', 'chat', 'initial-info'];
//   const fullScrren = ['chat', 'complet-profile', 'initial-info'];
//   const speedDial = ['profile', 'initial-info', 'user'];
//   const { t } = useTranslation();

//   type Path = keyof typeof skeletons;
//   const pathname = location.pathname as Path;
//   const fallbackSkeleton = skeletons(pathname);
//   // Check if any value from removeFor is included in the pathname
//   const removePadding = Padding.some((item) => location.pathname.includes(item));
//   const fullScreeenRemove = fullScrren.some((item) => location.pathname.includes(item));
//   const removeHeader = header.some((item) => location.pathname.includes(item));
//   const hiddeSpeedDail = speedDial.some((item) => location.pathname.includes(item));

//   // useEffect(() => {
//   // console.log("user", user)
//   // console.log("user?.fcmTokens?.length", user?.fcmTokens?.length)
//   if (user?._id) {
//     useFirebaseMessaging(user?._id);
//   }

//   const handleAppInstall = async () => {
//     setClickOnInstall(true);

//     try {
//       const success = await installApp();

//       if (success) {
//         // Show downloading animation for 4 seconds
//         setTimeout(() => {
//           setClickOnInstall(false);
//           setShowInstallDrawer(false);
//           FullFirework();
//         }, 4000);
//       } else {
//         // Installation failed or was cancelled
//         setClickOnInstall(false);
//       }
//     } catch (error) {
//       console.error('Installation error:', error);
//       setClickOnInstall(false);
//     }
//   };

//   const handleUpdateApp = () => {
//     // Reload the page to activate the new service worker
//     window.location.reload();
//   };

//   const handleCloseDrawer = () => {
//     setShowInstallDrawer(false);
//   };

//   useLayoutEffect(() => {
//     if (hasUpdate || (showInstallDrawer && !isInstalled)) {
//       setOpen(true);
//     } else {
//       setOpen(false);
//     }
//   }, [hasUpdate, showInstallDrawer, isInstalled]);


//   // 3. Compute popup type
//   const getPopupType = () => {
//     if (!hasProfile) return "create";
//     if (hasProfile && !isVerified) return "verify";
//     return null; // no popup
//   };

//   const popupType = getPopupType();



//   useLayoutEffect(() => {
//     setIsProfileCreated(popupType);
//   }, [popupType]);

//   // }, [])

//   return (
//     <div className="">


//       <ScrollToTop />
//       <AppLoader />

//       {!removeHeader && <Header />}
//       <main className={`w-full  ${removePadding ? '' : 'px-0 md:px-5 mt-20'}  sm:px-6  max-w-screen-lg mx-auto `}>
//         <SuspenseWrapper fallback={fallbackSkeleton}>
//           <Outlet />
//         </SuspenseWrapper>
//       </main>
//       {!fullScreeenRemove && <Footer />}
//       {!hiddeSpeedDail && <SpeedDail />}



//       {/* AppInstall  */}
//       {/* <Drawer
//         isOpen={open && pathname !== '/initial-info'}
//         position="bottom"
//         padding="p-0"
//         widthClass="w-100"
//         className="rounded-t-lg"
//         showCloseBtn={!hasUpdate} // Don't show close button for updates
//         onClose={handleCloseDrawer}
//       >
//         {hasUpdate ? (
//           <AppInstall
//             installApp={handleUpdateApp}
//             title="Update Available"
//             description="A new version of the app is available. Update now for the latest features!"
//           />
//         ) : isClickOnInstall ? (
//           <AppDownloading />
//         ) : (
//           <AppInstall
//             installApp={handleAppInstall}
//             title="Install App"
//             description="Install our app for a better experience!"
//           />
//         )}
//       </Drawer>


//       <Drawer
//         isOpen={(popupType !== null && isProfileCreated !== null) && pathname !== "/initial-info"}
//         position="bottom"
//         padding="p-0"
//         widthClass="w-100"
//         className="rounded-t-lg h-70"
//         showCloseBtn={true}
//         onClose={() => setIsProfileCreated(null)} // optional
//       >
//         {popupType === "verify" ? (
//           // Verify popup
//           <div className="p-6 w-full max-w-sm text-center">
//             <div className="flex justify-center w-full">
//               <img className="w-32 h-auto" src={verified} alt={t("verifyProfile.alt")} />
//             </div>
//             <h2 className="text-xl font-bold mb-3 mt-4">{t("verifyProfile.title")}</h2>
//             <p className="text-gray-600 mb-6">{t("verifyProfile.description")}</p>

//             <div className="space-y-3 text-left">
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("verifyProfile.verifysteps.createAccount")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("verifyProfile.verifysteps.uploadDocs")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("verifyProfile.verifysteps.contactSupport")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("verifyProfile.verifysteps.done")}</span>
//               </p>
//             </div>

//             <button
//               onClick={() =>
//                 sendWhatsAppMessage({
//                   phoneNumber: "+917709433561",
//                   message: `Hi, I would like to verify my profile. ${profile?.personalDetails?.fullName}`,
//                   biodataUrl: `${qrScanLink}/${profile?._id}`,
//                 })
//               }
//               className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
//             >
//               {t("verifyProfile.button")}
//             </button>
//           </div>
//         ) : popupType === "create" ? (
//           // Create profile popup
//           <div className="p-6 w-full max-w-sm text-center">
//             <div className="flex justify-center w-full">
//               <img className="w-32 h-auto" src={couple} alt={t("createProfile.alt")} />
//             </div>
//             <h2 className="text-xl font-bold mb-3 mt-4">{t("createProfile.title")}</h2>
//             <p className="text-gray-600 mb-6">{t("createProfile.description")}</p>

//             <div className="space-y-3 text-left">
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("createProfile.steps.basicDetails")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("createProfile.steps.familyDetails")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("createProfile.steps.educationCareer")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("createProfile.steps.photos")}</span>
//               </p>
//               <p className="flex items-center gap-2 text-gray-600 text-base">
//                 <MdOutlineVerified className="text-green-600 text-xl" />
//                 <span>{t("createProfile.steps.previewSubmit")}</span>
//               </p>
//             </div>

//             <button
//               onClick={() => navigate("/create-profile")}
//               className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
//             >
//               {t("createProfile.button")}
//             </button>
//           </div>
//         ) : null}
//       </Drawer> */}

//       <Drawer
//         isOpen={
//           (open && pathname !== "/initial-info") ||
//           (popupType !== null && isProfileCreated !== null && pathname !== "/initial-info")
//         }
//         position="bottom"
//         padding="p-0"
//         widthClass="w-100"
//         className="rounded-t-lg"
//         showCloseBtn={!hasUpdate} // allow closing except for forced update
//         onClose={() => {
//           // handle close properly
//           if (popupType) {
//             setIsProfileCreated(null);
//           } else {
//             handleCloseDrawer();
//           }
//         }}
//       >
//         {/* Decide priority of popup content */}
//         {hasUpdate ? (
//           <AppInstall
//             installApp={handleUpdateApp}
//             title="Update Available"
//             description="A new version of the app is available. Update now for the latest features!"
//           />
//         ) : isClickOnInstall ? (
//           <AppDownloading />
//         ) : popupType === "verify" ? (
//           // ✅ Verify Profile
//           <div className="p-6 w-full max-w-sm text-center">
//             <div className="flex justify-center w-full">
//               <img className="w-32 h-auto" src={verified} alt={t("verifyProfile.alt")} />
//             </div>
//             <h2 className="text-xl font-bold mb-3 mt-4">{t("verifyProfile.title")}</h2>
//             <p className="text-gray-600 mb-6">{t("verifyProfile.description")}</p>

//             <div className="space-y-3 text-left">
//               {[
//                 "verifysteps.createAccount",
//                 "verifysteps.uploadDocs",
//                 "verifysteps.contactSupport",
//                 "verifysteps.done",
//               ].map((step, idx) => (
//                 <p key={idx} className="flex items-center gap-2 text-gray-600 text-base">
//                   <MdOutlineVerified className="text-green-600 text-xl" />
//                   <span>{t(`verifyProfile.${step}`)}</span>
//                 </p>
//               ))}
//             </div>

//             <button
//               onClick={() =>
//                 sendWhatsAppMessage({
//                   phoneNumber: "+917709433561",
//                   message: `Hi, I would like to verify my profile. ${profile?.personalDetails?.fullName}`,
//                   biodataUrl: `${qrScanLink}/${profile?._id}`,
//                 })
//               }
//               className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
//             >
//               {t("verifyProfile.button")}
//             </button>
//           </div>
//         ) : popupType === "create" ? (
//           // ✅ Create Profile
//           <div className="p-6 w-full max-w-sm text-center">
//             <div className="flex justify-center w-full">
//               <img className="w-32 h-auto" src={couple} alt={t("createProfile.alt")} />
//             </div>
//             <h2 className="text-xl font-bold mb-3 mt-4">{t("createProfile.title")}</h2>
//             <p className="text-gray-600 mb-6">{t("createProfile.description")}</p>

//             <div className="space-y-3 text-left">
//               {[
//                 "steps.basicDetails",
//                 "steps.familyDetails",
//                 "steps.educationCareer",
//                 "steps.photos",
//                 "steps.previewSubmit",
//               ].map((step, idx) => (
//                 <p key={idx} className="flex items-center gap-2 text-gray-600 text-base">
//                   <MdOutlineVerified className="text-green-600 text-xl" />
//                   <span>{t(`createProfile.${step}`)}</span>
//                 </p>
//               ))}
//             </div>

//             <button
//               onClick={() => navigate("/create-profile")}
//               className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
//             >
//               {t("createProfile.button")}
//             </button>
//           </div>
//         ) : (
//           // Default Install Popup
//           <AppInstall
//             installApp={handleAppInstall}
//             title="Install App"
//             description="Install our app for a better experience!"
//           />
//         )}
//       </Drawer>

//     </div>
//   );
// }

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showInstallDrawer, setShowInstallDrawer] = useState(false);
  const [isClickOnInstall, setClickOnInstall] = useState<boolean>(false);
  const profile = getMatrimony();

  const [isProfileCreated, setIsProfileCreated] = useState<null | string>("true");

  // Profile states
  const hasProfile = !!profile?._id;
  const isVerified = profile?.isVerified ?? false;

  const [open, setOpen] = useState(true);

  const { isInstalled, hasUpdate, isMobile } = usePwaStatus();
  const { installApp, isInstallable, canInstall } = usePwaPrompt();
  const { user } = useAuth();
  const Padding = ["profile", "chat", "user", "complet-profile", "initial-info"];
  const header = ["profile", "chat", "initial-info"];
  const fullScrren = ["chat", "complet-profile", "initial-info"];
  const speedDial = ["profile", "initial-info", "user"];
  const { t } = useTranslation();

  type Path = keyof typeof skeletons;
  const pathname = location.pathname as Path;
  const fallbackSkeleton = skeletons(pathname);
  const removePadding = Padding.some((item) => location.pathname.includes(item));
  const fullScreeenRemove = fullScrren.some((item) => location.pathname.includes(item));
  const removeHeader = header.some((item) => location.pathname.includes(item));
  const hiddeSpeedDail = speedDial.some((item) => location.pathname.includes(item));

  if (user?._id) {
    useFirebaseMessaging(user?._id);
  }


  const handleAppInstall = async () => {
    setClickOnInstall(true);
    try {
      const success = await installApp();
      if (success) {
        setTimeout(() => {
          setClickOnInstall(false);
          setShowInstallDrawer(false);
          FullFirework();
        }, 4000);
      } else {
        setClickOnInstall(false);
      }
    } catch (error) {
      console.error("Installation error:", error);
      setClickOnInstall(false);
    }
  };

  const handleUpdateApp = () => {
    window.location.reload();
  };

  const handleCloseDrawer = () => {
    setShowInstallDrawer(false);
  };


  // Popup type
  const getPopupType = () => {
    if (!hasProfile) return "create";
    if (hasProfile && !isVerified) return "verify";
    return null;
  };

  const popupType = getPopupType();

  useEffect(() => {
    setIsProfileCreated(popupType);
  }, [popupType]);
  let drawerContent: React.ReactNode = null;

  const createProfile = () => {
    setIsProfileCreated(null);
    handleCloseDrawer();
    // drawerContent = null
    navigate("/complet-profile");
  }

  // ✅ Drawer content priority logic

  if ( pathname !== "/initial-info") {
    if (popupType === "create" && isProfileCreated !== null) {
      // ✅ Highest priority: Create Profile
      drawerContent = (
        <div className="p-6 w-full max-w-sm text-center">
          <div className="flex justify-center w-full">
            <img className="w-32 h-auto" src={couple} alt={t("createProfile.alt")} />
          </div>
          <h2 className="text-xl font-bold mb-3 mt-4">{t("createProfile.title")}</h2>
          <p className="text-gray-600 mb-6">{t("createProfile.description")}</p>

          <div className="space-y-3 text-left">
            {[
              "steps.basicDetails",
              "steps.familyDetails",
              "steps.educationCareer",
              "steps.photos",
              "steps.previewSubmit",
            ].map((step, idx) => (
              <p key={idx} className="flex items-center gap-2 text-gray-600 text-base">
                <MdOutlineVerified className="text-green-600 text-xl" />
                <span>{t(`createProfile.${step}`)}</span>
              </p>
            ))}
          </div>

          <button
            onClick={() => createProfile()}
            className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
          >
            {t("createProfile.button")}
          </button>
        </div>
      );
    } else if (popupType === "verify" && isProfileCreated !== null) {
      // ✅ Second priority: Verify Profile
      drawerContent = (
        <div className="p-6 w-full max-w-sm text-center">
          <div className="flex justify-center w-full">
            <img className="w-32 h-auto" src={verified} alt={t("verifyProfile.alt")} />
          </div>
          <h2 className="text-xl font-bold mb-3 mt-4">{t("verifyProfile.title")}</h2>
          <p className="text-gray-600 mb-6">{t("verifyProfile.description")}</p>

          <div className="space-y-3 text-left">
            {[
              "verifysteps.createAccount",
              "verifysteps.uploadDocs",
              "verifysteps.contactSupport",
              "verifysteps.done",
            ].map((step, idx) => (
              <p key={idx} className="flex items-center gap-2 text-gray-600 text-base">
                <MdOutlineVerified className="text-green-600 text-xl" />
                <span>{t(`verifyProfile.${step}`)}</span>
              </p>
            ))}
          </div>

          <button
            onClick={() =>
              sendWhatsAppMessage({
                phoneNumber: "+917709433561",
                message: `Hi, I would like to verify my profile. ${profile?.personalDetails?.fullName}`,
                biodataUrl: `${qrScanLink}/${profile?._id}`,
              })
            }
            className="mt-4 px-5 w-full py-2.5 primary-button font-medium rounded-lg shadow hover:bg-primary/90 transition text-base"
          >
            {t("verifyProfile.button")}
          </button>
        </div>
      );
    } else if (isMobile) {  if (hasUpdate ) {
      //  Third priority: Update available
      drawerContent = (
        <AppInstall
          installApp={handleUpdateApp}
          title="Update Available"
          description="A new version of the app is available. Update now for the latest features!"
        />
      );
    } else if (isClickOnInstall) {
      //  Fourth priority: App is downloading
      drawerContent = <AppDownloading />;
    } else {
      // ✅ Last fallback: Install prompt
      drawerContent = (
        <AppInstall
          installApp={handleAppInstall}
          title="Install App"
          description="Install our app for a better experience!"
        />
      );
    }}
     else {
      drawerContent = null; // No drawer content on non-mobile if no profile actions are needed
    }
  }

  return (
    <div className="">
      <ScrollToTop />
      <AppLoader />

      {!removeHeader && <Header />}
      <main
        className={`w-full  ${removePadding ? "" : "px-0 md:px-5 mt-20"}  sm:px-6  max-w-screen-lg mx-auto `}
      >
        <SuspenseWrapper fallback={fallbackSkeleton}>
          <Outlet />
        </SuspenseWrapper>
      </main>
      {!fullScreeenRemove && <Footer />}
      {!hiddeSpeedDail && <SpeedDail />}

      {/* ✅ Single Drawer only */}
      <Drawer
        isOpen={(drawerContent && open)}
        position="bottom"
        padding="p-0"
        widthClass="w-100"
        className="rounded-t-lg"
        showCloseBtn={true}
        onClose={() => {
          setOpen(false)
          if (getPopupType()) {
            setIsProfileCreated(null);
          } else {
            handleCloseDrawer();
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};


export default MainLayout