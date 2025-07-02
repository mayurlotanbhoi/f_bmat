import { useState } from 'react';
import {
    FaUser,
    FaTachometerAlt,
    FaCog,

} from 'react-icons/fa';


const tabs = [
    { name: 'Biodata', icon: FaUser, },
    // { name: 'Dashboard', icon: FaTachometerAlt },
    { name: 'Settings', icon: FaCog },
    // { name: 'Contacts', icon: FaAddressBook },
    // { name: 'Disabled', icon: null, disabled: true },
];

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className="border-b bg-white mt-10 dark:border-gray-700">
            {/* <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {tabs.map(({ name, icon: Icon, }) => (
                    <li key={name} className="me-2">

                        <button
                            onClick={() => setActiveTab(name)}
                            className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${activeTab === name
                                ? ' text-primary border-pink-600 '
                                : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                        >
                            {Icon && (
                                <Icon
                                    className={`me-2 text-base ${activeTab === name
                                        ? 'text-primary dark:text-blue-500'
                                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                                        }`}
                                />
                            )}
                            {name}
                        </button>
  
                    </li>
                ))}
            </ul> */}

        </div>
    );
};

export default Tabs;
