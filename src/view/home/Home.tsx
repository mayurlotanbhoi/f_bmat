import { Link } from "react-router-dom";
import BannerCarouselWrapper from "../../components/Swiper/ImageSwiper";
import { appConfig } from "../../config/appCinfig";
import Category from "./Category";
import { AppDownloading, AppInstall, FullFirework } from "../../components";
import { profilesData } from "../../data/profiles";
import CompletProfile from "./CompletProfile";
import { useEffect, useMemo, useState } from "react";
import { useLocalization, usePwaPrompt } from "../../hooks";
import { motion } from "framer-motion";


import { getMatrimony } from "../../features/matrimony/matrimonySlice";
import Matche from "../matches";
import { couple, divorcee, vadhuIcon, varIcon } from "../../util/images.util";
import Drawer from "../../components/Common/Drawer";
import { usePwaStatus } from "../../hooks/usePwaStatus";
import { useLazyGetLikesQuery } from "../../features/biodata/biodataApi";

// import { usePwaPrompt } from "../../hooks";

export default function Home() {
    const [isClikOnInstall, setClikOnInstall] = useState<boolean>(false)
    const [getLikes, { data, isLoading }] = useLazyGetLikesQuery()
    const [isAppInstall, setAppInstall] = useState(false)
    const { isInstalled, hasUpdate } = usePwaStatus();
    const [menuIcons, setMenuIcons] = useState([vadhuIcon, varIcon, couple, divorcee])
    const { installApp } = usePwaPrompt();
    const profile = getMatrimony();
    const menu = useLocalization("menu")
    const { mainMenu } = appConfig;
    const bios = profilesData;
    const Cartclores = ['#89A6F0', '#FFC969', '#FC72AA', '#47E76F',]
   useEffect(() => {
    getLikes('')
  }, [])

  const isUpdateOrInstall = useMemo(() => {
    return isInstalled || hasUpdate;
  }, []);

    const onAppInstall = () => {
        setClikOnInstall(true);
        installApp();
        setTimeout(() => {
            setClikOnInstall(false);
            setAppInstall(false);
            FullFirework();
        }, 4000);
    }


    return (
        <div className=" pb-20 md:pb-10">

            <div className="px-2 w-100  ">
                <BannerCarouselWrapper />
                <Category />
                <motion.div
                   
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay:  0.05, duration: 0.3 }}
                >
                <CompletProfile profile={{
                    complition: profile?.profileCompletion ?? 0,
                    avatar: profile?.profilePhotos?.[0] ?? '/default-avatar.png',
                    name: profile?.personalDetails?.fullName ?? 'Guest User',
                }} />
                </motion.div>
                <motion.div

                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                >
                <div className="mt-3">
                    <div className="w-full text-right my-2"><Link to={'/profile'} className="text-blue-600 hover:underline" >All Profiles</Link></div>
                    <div className="w-100 flex flex-wrap justify-between   gap-4 ">
                        {mainMenu.map((item, index) => (

                            <Link
                                key={index}
                                to={`${item?.url}/${item?.key}`}
                                style={{ backgroundColor: Cartclores[index] }}
                                className="flex flex-col items-center justify-between  w-36 h-44 rounded-2xl shadow-lg border border-rose-100 text-white transition-all duration-200 hover:scale-105"
                            >
                                <img
                                    src={menuIcons[index]}
                                    alt={`${item?.text} icon`}
                                    loading="lazy"
                                    className=" w-36 h-44 rounded-2xl bg-white  drop-shadow-md"
                                />
                                <div className="mb-4 text-center">
                                    <h3 className="text-lg font-semibold capitalize">{menu[index]}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                </motion.div>
            </div >
            <Matche />
            
            

            <Drawer
                isOpen={false || isUpdateOrInstall }
                position="bottom"
                padding="p-0"
                widthClass="w-100"
                className="rounded-t-lg"
                showCloseBtn={false}
                onClose={() => setAppInstall(false)}
            >
                {hasUpdate ? (
                  <AppInstall installApp={() => window.location.reload()} />
                ) : isClikOnInstall ? (
                  <AppDownloading />
                ) : (
                  <AppInstall installApp={onAppInstall} />
                )}
            </Drawer>
            {/* <Modal
                isOpen={isAppInstall}
                onClose={() => setAppInstall(false)}
                title={""}
                size="lg"
            > <>
                    {isClikOnInstall ? <AppDownloading /> : <AppInstall installApp={onAppInstall} />}
                </></Modal> */}
        </div>
    );
}
