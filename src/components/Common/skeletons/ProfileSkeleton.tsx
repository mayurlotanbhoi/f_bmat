
const ProfileSkeleton = () => {
    return (
        <div className='mt-20'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="max-w-md min-h-[80vh] mt-4  animate-pulse relative rounded-xl shadow-lg bg-white dark:border-gray-700 overflow-hidden">
                    {/* Top Placeholder Image Box */}
                    <div className="min-h-[80vh] w-full bg-cover bg-center rounded-lg bg-gray-300 dark:bg-gray-700">
                        <svg
                            className="w-full h-full dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>

                    {/* Thumbnail Placeholders */}
                    <div className="flex flex-col justify-between absolute right-2 top-4 gap-2 overflow-x-auto">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <svg
                                key={index}
                                className="w-14 h-14 object-cover rounded-md cursor-pointer border-2 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 20"
                            >
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            </svg>
                        ))}
                    </div>

                    {/* Bottom Placeholder with Action Buttons */}
                    <div className="absolute bottom-0 left-0 w-full px-4 py-6 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-20">
                        {/* Text lines */}
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />

                        {/* Action Buttons */}
                        <div className="flex justify-between gap-2">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded h-10 w-24"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded h-10 w-24"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded h-10 w-24"></div>
                        </div>
                    </div>
                </div>

            ))}
        </div>

    );
};

export default ProfileSkeleton;
