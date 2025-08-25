import React from "react";
import {
    FaHome,
    FaUserAlt,
    FaHeart,
    FaSearch,
    FaEnvelopeOpenText,
    FaCog,
    FaSignOutAlt,
    FaQrcode,
} from "react-icons/fa";
import { useLogOutMutation } from "../../features/auth/authApi";
import { asyncHandlerWithSwal } from "../../util/asyncHandler";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { store } from "../../app/store";
import { useLocalization } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { MdOutlineSupportAgent } from "react-icons/md";
import { ShareButton } from "../../view/bioData/BioDownload";
import { sendWhatsAppMessage } from "../../util";
import { appData } from "../../data/appData";
const persistor = persistStore(store);

const Sidebar: React.FC = () => {
    const [logOut] = useLogOutMutation();
    const { user } = useAuth();

    const navigate = useNavigate();
    const sidebarLang = useLocalization('sidebar');

    const handleLogout = async () => {
        const result = await asyncHandlerWithSwal(async () => logOut("").unwrap(), {
            loadingHtml: "<b>Logging out...</b>",
            successHtml: "<b>Logged out successfully</b>",
            errorHtml: "<b>Logout failed. Please try again.</b>",
        });

        if (result.statusCode === 200) {
            store.dispatch({ type: "RESET_APP" }); // clear all Redux state
            persistor.purge();
            setTimeout(() => {
                navigate("/auth");
            }, 400)
        }
    };

    // Localization example (replace with your localization hook or object)
    const menuLabels = {
        home: sidebarLang.home,
        myProfile: sidebarLang.myProfile,
        matches: sidebarLang.matches,
        requests: sidebarLang.requests,
        search: sidebarLang.search,
        language: sidebarLang.language,
        qrScanner: sidebarLang.qrScanner,
        support: sidebarLang.support
    };

    // If you have a localization hook, e.g.:
    // const labels = useLocalization('sidebar');
    // ...then use labels.home, labels.myProfile, etc.

    const navItems = [
        { to: "/", icon: <FaHome />, label: menuLabels.home },
        { to: "/profile", icon: <FaUserAlt />, label: menuLabels.myProfile },
        { to: "/matches", icon: <FaHeart />, label: menuLabels.matches },
        { to: "/likes", icon: <FaEnvelopeOpenText />, label: menuLabels.requests },
        { to: "/profile/filter", icon: <FaSearch />, label: menuLabels.search },
        { to: "/scanner", icon: <FaQrcode />, label: menuLabels.qrScanner },
        // { to: "/support", icon: <MdOutlineSupportAgent />, label: menuLabels.support },
    ];

    return (
        <aside className="fixed top-0 left-0 h-full w-full sm:w-80 bg-white  flex flex-col ">
            <div className="px-6 py-4 text-2xl font-bold text-pink-600 border-b ">
                <h1 className='logo text-4xl text-primary font-extrabold  italic text-start '>भोई जोडीदार </h1>
            </div>
            <div className="flex justify-center px-5  ">
                <img
                    className="h-32 w-32 bg-white p-2 rounded-full"
                    src={
                        user?.profilePicture
                            ? user?.profilePicture
                            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    alt="User profile"
                />
            </div>
            <h1 className="w-full text-center text-2xl font-bold">{user?.name}</h1>
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <ul className="space-y-3 text-gray-700">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 text-base font-medium transition-colors px-3 py-2 rounded-md ${isActive ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100 hover:text-pink-600"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}

                    <li>

                        {/* <ShareButton
                            buttonText={sidebarLang.support}
                            icon={<MdOutlineSupportAgent className="text-lg" />}
                            shareMessage="क्या आपको सहायता चाहिए? अभी हमसे जुड़ें!"
                            title="BMAT सहायता"
                            url="https://bmat.onrender.com/"
                            image="https://miro.medium.com/v2/1*SdXRP8f2Lhin89Tht_GRIA.jpeg"
                            className="flex items-center gap-3 text-base font-medium text-left w-full hover:text-pink-600 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                        /> */}
                        <button
                            onClick={() => sendWhatsAppMessage({
                                phoneNumber: '+917709433561', message: 'मैं आपकी कैसे मदद कर सकता हूँ? अभी हमसे जुड़ें!', biodataUrl: ``})} 
                            className="flex items-center gap-3 text-base font-medium text-left w-full hover:text-pink-600 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <MdOutlineSupportAgent className="text-lg" />
                            support
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-base font-medium text-left w-full hover:text-pink-600 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <FaSignOutAlt className="text-lg" />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="p-4 text-sm text-gray-400 text-center border-t border-gray-200">
                © {new Date().getFullYear()} {appData?.domain}
            </div>
        </aside>
    );
};

export default Sidebar;
