import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaRegEdit } from 'react-icons/fa';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Location } from '../../util/images.util';
import { useGetLocationQuery, useUpdateInitialdetailsMutation } from '../../features/locationb/locationApi';

const steps = ['location', 'relation', 'details'];
const languages = [
    { code: 'en', label: 'English', icon: 'E' },
    { code: 'hi', label: 'हिन्दी', icon: 'हि' },
    { code: 'mr', label: 'Marathi', icon: 'म' },
];

const relationOptions = ['Myself', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend'];

export default function InitialInfo() {
    const [stepIndex, setStepIndex] = useState(0);
    const [relation, setRelation] = useState('');
    const [location, setLocation] = useState('');
    const [locationObject, setLocationObject] = useState<any>(null); // changed from string to object
    const [language, setLanguages] = useState('');

    const navigate = useNavigate();
    const [updateInitialdetails, { isLoading, error, data }] = useUpdateInitialdetailsMutation();
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    // Get user's geolocation once
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                (err) => console.error('Geolocation error:', err)
            );
        }
    }, []);

    // Fetch location data based on coordinates
    const { data: locationData } = useGetLocationQuery(coords!, { skip: !coords });

    // Extract location info from fetched data
    useEffect(() => {
        if (locationData?.data?.locationData?.address) {
            const address = locationData.data.locationData.address;
            const loc = address.city || address.town || address.village || address.city_district || '';
            const fullLocation = `${loc}, ${address.state || ''}`;
            setLocation(fullLocation);
            setLocationObject(locationData.data.locationData); // Save full object
        }
    }, [locationData]);

    // Step control
    const next = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const prev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    // Final submit
    const handleFinish = async () => {
        const payload = {
            location,
            locationObject,
            relation,
            language
        };

        console.log("Submitting initial info:", payload);

        try {
            await updateInitialdetails(payload).unwrap(); // unwrap() to catch errors directly
            navigate('/');
        } catch (err) {
            console.error("Error submitting initial details:", err);
            // Optional: show toast or error UI
        }
    };

    // Framer motion variants
    const variants = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-pink-500 to-pink-500 flex items-center justify-center">
            <div className="relative w-screen h-screen flex items-center justify-center">
                <button onClick={prev} className="fixed top-2 left-2 text-white">
                    <FaAnglesLeft size={20} />
                </button>
                <AnimatePresence mode="wait">
                    {stepIndex === 0 && (
                        <motion.div
                            key="location"
                            {...variants}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full h-full px-4 py-8 flex flex-col items-center justify-center space-y-6"
                        >
                            <div className="flex justify-center">
                                <img className="md:w-[30%] h-auto" src={Location} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Share Your Location</h2>
                            <p className="text-white">We'll use your location to suggest nearby matches.</p>
                            <div className="text-white font-medium">
                                {location || 'Waiting for permission...'}
                            </div>
                            <button
                                onClick={next}
                                disabled={!location}
                                className="fixed bottom-2 left-2 right-2 bg-white text-pink-600 font-semibold py-2 rounded-lg shadow"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}

                    {stepIndex === 1 && (
                        <motion.div
                            key="relation"
                            {...variants}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full h-full px-4 py-8 flex flex-col items-center justify-center space-y-6"
                        >
                            <FaUserFriends className="text-5xl text-white mx-auto" />
                            <h2 className="text-2xl font-bold text-white">Who are you searching for?</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
                                {relationOptions.map((rel) => (
                                    <button
                                        key={rel}
                                        onClick={() => setRelation(rel)}
                                        className={`py-2 px-4 rounded-full border text-sm transition-all w-full ${relation === rel
                                            ? 'bg-white text-pink-600 border-white font-semibold'
                                            : 'bg-transparent text-white border-white'
                                            }`}
                                    >
                                        {rel}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={next}
                                disabled={!relation}
                                className="fixed bottom-2 left-2 right-2 bg-white text-pink-600 font-semibold py-2 rounded-lg shadow"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}

                    {stepIndex === 2 && (
                        <motion.div
                            key="details"
                            {...variants}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full h-full px-4 py-8 flex flex-col items-center justify-center space-y-6"
                        >
                            <FaRegEdit className="text-5xl text-white mx-auto" />
                            <h2 className="text-2xl font-bold text-white">Language Preference</h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setLanguages(lang.code)}
                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 
                       ${language === lang.code
                                                ? 'bg-white text-pink-600 border-white font-semibold'
                                                : 'bg-transparent text-white border-white hover:bg-white hover:text-pink-600'
                                            }`}
                                    >
                                        <span className="bg-white text-pink-600 font-bold w-6 h-6 flex items-center justify-center rounded">
                                            {lang.icon}
                                        </span>
                                        {lang.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center w-full max-w-md mt-6">
                                {/* <button onClick={prev} className="text-white">
                                    Back
                                </button> */}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleFinish}
                                    className={`fixed bottom-2 left-2 right-2 bg-white text-primary py-2 rounded-lg transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                                                />
                                            </svg>
                                            <span>Saving Details...</span>
                                        </>
                                    ) : (
                                        <span>Save</span>
                                    )}
                                </button>

                                /
                                {/* <button
                                    onClick={handleFinish}
                                    disabled={!details.language}
                                    className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold shadow disabled:opacity-50"
                                >
                                    Finish
                                </button> */}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
