
import { Link } from "react-router-dom";
import BannerCarouselWrapper from "../../components/Swiper/ImageSwiper";
import { appConfig } from "../../config/appCinfig";
import Category from "./Category";
import { AppDownloading, AppInstall, FullFirework, Matches } from "../../components";
import { profilesData } from "../../data/profiles";
import Heading from "../../components/Headings/Heading";
import CompletProfile from "./CompletProfile";
import { useEffect, useState } from "react";
import Modal from "../../components/Common/Modal";
import { usePwaPrompt } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { getMatrimony } from "../../features/matrimony/matrimonySlice";
import Matche from "../matches";
import { vadhuIcon, varIcon } from "../../util/images.util";

// import { usePwaPrompt } from "../../hooks";

export default function Home() {
    const [isAppInstall, setAppInstall] = useState(false)
    const { installApp } = usePwaPrompt();
    const [isClikOnInstall, setClikOnInstall] = useState<boolean>(false)
    const profile = getMatrimony();
    const { mainMenu } = appConfig;
    const [menuIcons, setMenuIcons] = useState([vadhuIcon, varIcon])
    const bios = profilesData;
    const Cartclores = ['#89A6F0', '#FFC969', '#FC72AA', '#47E76F',]
    const { user } = useAuth();





    useEffect(() => {
        // if (isInstallable) {
        setAppInstall(true)
        // }
    }, [])


    const onAppInstall = () => {
        setClikOnInstall(true)
        installApp()
        setTimeout(() => {
            setAppInstall(false)
            FullFirework()
        }, 4000)
    }


    return (
        <div className=" pb-20 md:pb-10">

            <div className="px-2 w-100  ">

                {/* <img src={bioHeader1} /> */}
                <BannerCarouselWrapper />
                <Category />
                <CompletProfile
                    profile={{
                        complition: profile?.profileCompletion ?? 0,
                        avatar: profile?.profilePhotos?.[0] ?? '/default-avatar.png',
                        name: profile?.personalDetails?.fullName ?? 'Guest User',
                    }} />
                <div className="mt-3">
                    <div className="w-full text-right my-2"><Link to={'/profile'} className="text-blue-600 hover:underline" >All Profiles</Link></div>
                    <div className="w-100 flex flex-wrap justify-between   gap-4 ">

                        {mainMenu.map((item, index) => (
                            <Link
                                key={index}
                                to={`${item?.url}/${item?.key}`}
                                style={{ backgroundColor: Cartclores[index] }}
                                className="flex flex-col items-center justify-between md:w-52 w-36 h-44 rounded-2xl shadow-lg border border-rose-100 text-white transition-all duration-200 hover:scale-105"
                            >
                                <img
                                    src={menuIcons[Math.floor(index / 2)]}
                                    alt={`${item?.text} icon`}
                                    className="w-20 h-20 rounded-full mt-4 drop-shadow-md"
                                />
                                <div className="mb-4 text-center">
                                    <h3 className="text-lg font-semibold capitalize">{item?.text}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div >


            <Matche />

            <Modal
                isOpen={isAppInstall}
                onClose={() => setAppInstall(false)}
                title={""}
                size="lg"
            > <>
                    {isClikOnInstall ? <AppDownloading /> : <AppInstall installApp={onAppInstall} />}
                </></Modal>
        </div>
    );
}
