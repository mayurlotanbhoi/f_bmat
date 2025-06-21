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

const Sidebar: React.FC = () => {
    const [logOut] = useLogOutMutation();

    const handleLogout = async () => {
        await asyncHandlerWithSwal(async () => logOut("").unwrap(), {
            loadingHtml: "<b>Logging out...</b>",
            successHtml: "<b>Logged out successfully</b>",
            errorHtml: "<b>Logout failed. Please try again.</b>",
        });
    };

    return (
        <aside className="fixed top-0 left-0 h-full w-full sm:w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="px-6 py-4 text-2xl font-bold text-pink-600 border-b border-gray-200">
                💍 Matrimony Panel
            </div>
            <nav className="flex-1 px-6 py-4 overflow-y-auto">
                <ul className="space-y-4 text-gray-700">
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaHome className="text-lg" />
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaUserAlt className="text-lg" />
                            My Profile
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaHeart className="text-lg" />
                            Matches
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaEnvelopeOpenText className="text-lg" />
                            Requests
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaSearch className="text-lg" />
                            Search Profiles
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-pink-600 transition-colors">
                            <FaCog className="text-lg" />
                            Settings
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-base font-medium text-left w-full hover:text-pink-600 transition-colors"
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
