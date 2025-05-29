
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
import { bioHeader1 } from "../../util/images.util";
// import { usePwaPrompt } from "../../hooks";

export default function Home() {
    const [isAppInstall, setAppInstall] = useState(false)
    const { installApp } = usePwaPrompt();
    const [isClikOnInstall, setClikOnInstall] = useState(false)
    const { mainMenu } = appConfig;
    const bios = profilesData;
    const Cartclores = ['#89A6F0', '#FFC969', '#FC72AA', '#47E76F',]

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
        <>
            <div className="px-4 w-100 ">

                <img src={bioHeader1} />
                <BannerCarouselWrapper />
                <Category />
                <CompletProfile />
                <div className="mt-3">
                    <div className="w-full text-right my-2"><Link className="text-blue-600 hover:underline" to='bio'>All Profiles</Link></div>
                    <div className="w-100 flex flex-wrap justify-between   gap-4 ">
                        {mainMenu.map((item, index) => (
                            <Link
                                key={index}
                                to={item?.url}
                                style={{ backgroundColor: Cartclores[index] }}
                                className={`  flex-col   relative md:w-52 w-32 h-32 rounded-2xl shadow-xl border-2 border-rose-100 flex justify-center items-center font-bold text-white text-xl`}
                            >
                                <p className=" absolute top-2 text-4xl right-0">{item.icon}</p>
                                {/* <img /> */}
                                <span>{item.text}</span>
                                <small className="text-sm font-extralight">{item.text}</small>
                            </Link>
                        ))}
                    </div>
                </div>
            </div >
            <div className=" flex justify-between mt-3">
                <Heading className="text-xl  font-semibold" text="Matches" />
                <div className="w-full text-right my-2"><Link className="text-blue-600 hover:underline" to='bio'>See all match</Link></div>
            </div>

            <Matches bios={bios} />

            <Modal
                isOpen={isAppInstall}
                onClose={() => setAppInstall(false)}
                title={""}
                size="lg"
            > <>
                    {isClikOnInstall ? <AppDownloading /> : <AppInstall installApp={onAppInstall} />}
                </></Modal>
        </>
    );
}
