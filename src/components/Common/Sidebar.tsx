import React from "react";
import {
    FaHome,
    FaUserAlt,
    FaHeart,
    FaSearch,
    FaEnvelopeOpenText,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import { useLogOutMutation } from "../../features/auth/authApi";
import { asyncHandlerWithSwal } from "../../util/asyncHandler";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { store } from "../../app/store";
import { useLocalization } from "../../hooks";
const persistor = persistStore(store);

const Sidebar: React.FC = () => {
    const [logOut] = useLogOutMutation();
    const dispatch = useDispatch();
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
        { to: "/lang", icon: <FaCog />, label: menuLabels.language },
    ];

    return (
        <aside className="fixed top-0 left-0 h-full w-full sm:w-80 bg-white  flex flex-col ">
            <div className="px-6 py-4 text-2xl font-bold text-pink-600 border-b ">
                💍 Vaishya Parinay
            </div>
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
                © 2025 Vaishya Parinay
            </div>
        </aside>
    );
};

export default Sidebar;
