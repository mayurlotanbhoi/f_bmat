import React from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';




const Sidebar: React.FC = () => {


    return (
        <>



            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-full w-full bg-white shadow-lg border-r border-gray-200 flex flex-col">
                <div className="px-6 py-4 text-2xl font-bold text-amber-500 border-b border-gray-200">
                    🚚 Ayush Panel
                </div>

                <nav className="flex-1 px-6 py-4">
                    <ul className="space-y-4 text-gray-700">
                        <li>
                            <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-amber-500 transition-colors">
                                <FaHome className="text-lg" />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-amber-500 transition-colors">
                                <FaUserAlt className="text-lg" />
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-amber-500 transition-colors">
                                <FaCog className="text-lg" />
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 text-base font-medium hover:text-amber-500 transition-colors">
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 text-sm text-gray-400 text-center border-t border-gray-200">
                    © 2025 AyushApp
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
