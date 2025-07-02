import React, { useState } from "react";
import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";
import ProfileStatus from "./ProfileStatus";
import { IoMdMenu } from "react-icons/io";
import { CgMenuMotion } from "react-icons/cg";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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
                        {/* <FaBell size={25} className=" cursor-pointer" /> */}
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
            </header>


        </>
    );
};

export default Header;
