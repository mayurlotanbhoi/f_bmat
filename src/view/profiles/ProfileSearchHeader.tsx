import { useEffect, useState } from 'react';
import BackButtn from '../../components/Buttons/BackButtn';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { GiBackwardTime } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import { PiCalendarPlusLight } from "react-icons/pi";
import { searchbanner } from '../../util/images.util';
import { useLazyGlobalSearchProfilesQuery } from '../../features/matrimony/matrimonyApi';
import { calculateAge } from '../../util/dateFormat';
export default function ProfileSearchHeader() {
    const placeholders = ['Search by ID...', 'Search by name...', 'Search by mobile number...'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isLoading, setIsloading] = useState(false)
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [triggerSearch, { data, error }] = useLazyGlobalSearchProfilesQuery();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        const history = localStorage.getItem('profileSearchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            const handleSearch = async () => {
                if (query.trim() !== '') {
                    setIsloading(true)
                    try {
                        await triggerSearch(query.trim());
                    } catch (err) {
                        console.error('Search API failed:', err);
                    } finally {
                        setIsloading(false)
                    }
                }
            };
            handleSearch();
        }, 500); // 500ms debounce delay

        return () => clearTimeout(debounceTimeout); // cleanup on each change
    }, [query]);

    console.log("isLoading", isLoading)


    const handleSearch = () => {
        if (!query.trim()) return;
        const updatedHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
        localStorage.setItem('profileSearchHistory', JSON.stringify(updatedHistory));
        setSearchHistory(updatedHistory);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <>
            {/* Top App Header */}
            <header className="header bg_primary w-full shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="mx-auto text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="text-xl font-bold">
                        <BackButtn />
                    </div>
                    <div className="flex-1 mx-4 max-w-md">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                readOnly
                                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 bg-white cursor-pointer"
                                placeholder={placeholders[placeholderIndex]}
                                onFocus={() => setIsOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Fullscreen Search Modal */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed inset-0 z-[999] bg-gray-100 flex flex-col"
                >
                    {/* Sticky Search Bar */}
                    <div className="bg-white sticky top-0 z-10 shadow-md px-4 py-3 flex items-center gap-3">
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by ID, Name or Mobile..."
                            className="flex-1 p-2.5 border border-gray-300 rounded-lg text-base bg-white"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={() => setIsOpen(false)} className="text-gray-600">
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Search Content */}
                    <div className="flex-1 overflow-y-auto    space-y-1 mt-1 ">
                        {/* Recent Searches */}
                        {searchHistory.length > 0 && (
                            <div className='bg-white  '>
                                <h3 className="text-lg font-semibold mx-2 ">Recent Searches</h3>
                                <ul className="space-y-2">
                                    {searchHistory.map((item, idx) => (
                                        <div className='flex  items-center gap-2 mx-4  py-2'>
                                            <GiBackwardTime className="w-5 h-5 " />
                                            <li
                                                key={idx}
                                                className="bg-white   hover:bg-gray-50 cursor-pointer"
                                                onClick={() => {
                                                    setQuery(item);
                                                    handleSearch();
                                                }}
                                            >
                                                {item}
                                            </li>

                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Suggested Profiles */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Suggested Profiles</h3>
                            <div className="">
                                {data?.data.map((profiles, index) => (
                                    <div className="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 object-cover  rounded-full" src={profiles?.profilePhotos[0]} loading='lazy' alt="Jese image" />
                                        <div className="ps-3">
                                            <div className="text-gray-600 font-semibold break-words whitespace-normal">
                                                {profiles?.personalDetails?.fullName}
                                            </div>
                                            <div className="font-normal flex flex-wrap items-center gap-1 text-gray-500 break-words whitespace-normal">
                                                <>{profiles?.religiousDetails?.subCaste} {profiles?.religiousDetails?.caste}</>,

                                                <>
                                                    <TfiLocationPin /> {profiles?.contactDetails?.presentAddress?.city}
                                                </>
                                                <>
                                                    <PiCalendarPlusLight /> {calculateAge(profiles?.personalDetails?.dateOfBirth)}
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                    // <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                                    //     <div className="h-24 w-full bg-gray-200 rounded-md mb-2" />
                                    //     <p className="text-sm text-center">Profile #{i}</p>
                                    // </div>
                                ))}

                                {data?.data.length === 0 && !isLoading && <h1 className=' text-center text-gray-500 font-bold'>No Match Found</h1>}
                                {isLoading && (
                                    <div className="w-6 h-6 mx-auto border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                )}

                            </div>
                        </div>

                        {/* Banner */}
                        <div className=" mb-20 bg-white">
                            <img
                                src={searchbanner}
                                alt="Search Banner"
                                className="rounded-lg w-full object-cover max-h-[180px] shadow-md"
                            />
                        </div>
                    </div>
                </motion.div >
            )
            }

        </>
    );
}
