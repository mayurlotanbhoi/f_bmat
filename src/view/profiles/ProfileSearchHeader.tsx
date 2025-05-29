import { useEffect, useState } from 'react';
import BackButtn from '../../components/Buttons/BackButtn';

export default function ProfileSearchHeader() {
    const placeholders = ['Search by ID...', 'Search by name...', 'Search by mobile number...'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    return (
        <header className="header bg_primary w-full shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

                {/* Logo / Title */}
                <div className="text-xl font-bold">
                    <BackButtn />
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4 max-w-md">
                    <form className="flex items-center max-w-sm mx-auto">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5"
                                placeholder={placeholders[placeholderIndex]}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}
