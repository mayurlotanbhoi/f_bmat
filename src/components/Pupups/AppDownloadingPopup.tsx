import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';


interface AppDownloadingPopupProps {
    progressText?: string;
}

const AppDownloadingPopup: React.FC<AppDownloadingPopupProps> = ({ progressText = 'Downloading app...' }) => {
    return (
        <div className=" inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-sm p-6 text-center space-y-4">

                {/* Loading Icon */}
                <div className="flex justify-center text-primary dark:text-primary-light">
                    <BiLoaderCircle className="w-10 h-10 animate-spin" />

                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {progressText}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your app is being prepared. Please wait while we finish setting things up.
                </p>
            </div>
        </div>
    );
};

export default AppDownloadingPopup;
