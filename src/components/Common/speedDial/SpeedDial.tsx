import { useState } from 'react';
import { ImProfile } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export default function SpeedDial() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed end-6 bottom-20 group z-50">
            {/* Speed Dial Menu */}
            <div
                id="speed-dial-menu-text-outside-button"
                className={`flex flex-col items-center mb-4 space-y-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {[
                    {
                        label: 'Share',
                        path: '/share',
                        icon: (
                            <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z" />
                        )
                    },
                    {
                        label: 'Biodata',
                        path: '/complet-profile',
                        icon: (
                            <>

                                <ImProfile size={20} />

                                {/* <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
                                <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" /> */}
                            </>
                        )
                    },
                    {
                        label: 'Save',
                        path: '/save',
                        icon: (
                            <>
                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                            </>
                        )
                    },
                    {
                        label: 'Copy',
                        path: '/Copy',
                        icon: (
                            <>
                                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z" />
                                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z" />
                            </>
                        )
                    }
                ].map((item, i) => (
                    <button key={i} type="button" className="relative w-[52px] h-[52px] text-primary bg-white rounded-lg border border-gray-200  shadow-xs  hover:bg-gray-50 ">
                        <Link to={item?.path}> <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">{item.icon}</svg>
                            {/* <div className=' w-full flex justify-center items-center'>{item.icon}</div> */}
                            <span className="absolute text-black block text-sm font-medium -translate-y-1/2 -start-14 top-1/2">{item.label}</span></Link>
                    </button>
                ))}
            </div>

            {/* Main FAB button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center bg_primary text-white  rounded-lg w-14 h-14   focus:outline-none "
            >
                <RxCross2 className={`w-10 h-10 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
}
