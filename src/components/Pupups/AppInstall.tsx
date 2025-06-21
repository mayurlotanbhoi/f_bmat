import { FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

type AppInstallProps = {
    installApp: () => void;
};

export default function AppInstall({ installApp }: AppInstallProps) {

    return (
        <div className="p-6  rounded-xl l w-full text-gray-800">
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <FaMobileAlt className="text-primary text-3xl" />
                    <h2 className="text-xl font-bold text-primary">Install Our App</h2>
                </div>

                {/* Subheading */}
                <p className="text-sm text-gray-600">
                    Get the best experience by installing our Progressive Web App.
                </p>

                {/* Features */}
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Lightning-fast access anytime, anywhere.
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Smooth offline usage and native app feel.
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        No app store needed—install instantly!
                    </li>
                </ul>

                {/* Install button */}
                <button
                    onClick={installApp}
                    className="mt-4 px-5 py-2.5 primary-button  font-medium rounded-lg shadow hover:bg-primary/90 transition"
                >
                    Install Now
                </button>
            </div>
        </div>
    );
}
