import React, { useState } from "react";
import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
import { FaBell, FaRegEdit } from "react-icons/fa";
import ProfileStatus from "./ProfileStatus";
import { IoMdMenu } from "react-icons/io";
import { CgMenuMotion } from "react-icons/cg";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [switchLang, setSwitchLang] = useState(false);
    const { user } = useAuth();
    console.log(user?.profilePicture);

    return (
        <>
            <header className="header bg_primary w-100 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className=" mx-auto text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    {/* Logo / Title */}
                    <div className="text-xl font-bold ">
                        MySite
                    </div>
                    <div className=" flex justify-center items-center gap-2">
                        <ProfileStatus percentage={75} imageUrl={user?.profilePicture} />
                        <FaBell onClick={() => setSwitchLang(!switchLang)} size={25} className=" cursor-pointer" />
                        {/* Menu button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            className="inline-flex btn items-center justify-center p-2 rounded-md"
                        >
                            {/* Hamburger icon */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {menuOpen ? (
                                    // X icon when menu is open
                                    <CgMenuMotion size={25} />
                                    // <path
                                    //     strokeLinecap="round"
                                    //     strokeLinejoin="round"
                                    //     d="M6 18L18 6M6 6l12 12"
                                    // />
                                ) : (
                                    <IoMdMenu size={25} />
                                    // Hamburger icon when menu is closed
                                    // <path
                                    //     strokeLinecap="round"
                                    //     strokeLinejoin="round"
                                    //     d="M4 6h16M4 12h16M4 18h16"
                                    // />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <Drawer isOpen={menuOpen} position='left' onClose={() => setMenuOpen(false)}>
                    <Sidebar />
                </Drawer>

                <Drawer className="bg-gradient-to-tr w-screen from-pink-500 via-pink-500 to-pink-500" isOpen={switchLang} position='left' onClose={() => setSwitchLang(false)}>
                    <LanguageSwitcher />
                </Drawer>

            </header>


        </>
    );
};

const languages = [
    { code: 'en', label: 'English', icon: 'E' },
    { code: 'hi', label: 'हिन्दी', icon: 'हि' },
    { code: 'mr', label: 'Marathi', icon: 'म' },
];

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';



const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
};

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const setLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <div className="language-switcher ">
            <motion.div
                key="language-drawer"
                variants={variants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="text-center w-full h-full px-4 py-8 flex flex-col items-center justify-center space-y-6"
            >
                <FaRegEdit className="text-5xl text-white mx-auto" />
                <h2 className="text-2xl font-bold text-white">Language Preference</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                ${currentLang === lang.code
                                    ? 'bg-white text-pink-600 border-white font-semibold'
                                    : 'bg-transparent text-white border-white hover:bg-white hover:text-pink-600'}
              `}
                        >
                            <span className="bg-white text-pink-600 font-bold w-6 h-6 flex items-center justify-center rounded">
                                {lang.icon}
                            </span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// export default LanguageSwitcher;


export default Header;
