import { LiaEdit } from "react-icons/lia";
import { HiOutlineDownload } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import UpdateUserForm from "./UpdateUserForm";
import Drawer from "../../components/Common/Drawer";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserHeader() {
    const { user } = useAuth();
    const [isShowProfileForm, setShowProfileForm] = useState(false);
    const [isShowBiodataForm, setShowBiodataForm] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Cover Image */}
                <div className="relative">
                    <img
                        className="h-40 w-full object-cover"
                        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=2000&q=80"
                        alt="Cover"
                    />
                    {/* Profile Image */}
                    <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
                        <img
                            className="h-28 w-28 bg-white p-1 rounded-full shadow-md object-fill"
                            src={
                                user?.profilePicture
                                    ? user.profilePicture
                                    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=2000&q=80"
                            }
                            alt="User profile"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-16 text-center px-5">
                    <h2 className="text-gray-800 text-xl font-semibold">
                        {user?.name || "User Name"}
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        {user?.language?.toUpperCase()} speaker from {user?.location || "Unknown"}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">📞 {user?.mobile || "No mobile"}</p>
                    <p className="mt-1 text-sm text-gray-500">
                        📍 {user?.address?.city}, {user?.address?.state}, {user?.address?.country} -{" "}
                        {user?.address?.postcode}
                    </p>
                    <p className="mt-2 text-gray-500 text-xs italic">
                        Passionate user of our platform. Always seeking new connections.
                    </p>
                </div>

                {/* Actions - Colorful Chips */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap px-4">
                    <button
                        onClick={() => setShowProfileForm(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition shadow-sm"
                    >
                        <LiaEdit size={18} /> Edit Profile
                    </button>

                    <Link
                        to='/complet-profile'
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-purple-500 hover:bg-purple-600 transition shadow-sm"
                    >
                        <LiaEdit size={18} /> Edit Biodata
                    </Link>

                    <Link
                        to={`/bio-download`}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition shadow-sm"
                    >
                        <HiOutlineDownload size={18} /> Download Biodata
                    </Link>
                </div>

                {/* Divider */}
                <hr className="my-5 border-gray-200" />
            </div>

            {/* Profile Edit Drawer */}
            <Drawer
                isOpen={isShowProfileForm}
                position="left"
                padding="p-0"
                widthClass="w-100"
                className="rounded-t-lg"
                showCloseBtn={false}
                onClose={() => setShowProfileForm(false)}
            >
                <UpdateUserForm user={user} onCancel={() => setShowProfileForm(false)} />
            </Drawer>

           
        </>
    );
}
