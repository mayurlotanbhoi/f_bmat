import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaRegEdit, FaArrowLeft } from 'react-icons/fa';

import { Location } from '../../util/images.util';
import { useGetLocationQuery } from '../../features/locationb/locationApi';
import { FaAnglesLeft } from 'react-icons/fa6';

const steps = ['location', 'relation', 'details'];

const relationOptions = ['Myself', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend'];

export default function InitialInfo() {
    const [stepIndex, setStepIndex] = useState(0);
    const [relation, setRelation] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState({ age: '', caste: '' });
    const navigate = useNavigate();
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    // Get coordinates once on mount
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                },
                (err) => {
                    console.error('Geolocation error:', err);
                }
            );
        }
    }, []);




    // Query location using Nominatim API
    const { data: locationData, error, isLoading } = useGetLocationQuery(coords!, {
        skip: !coords,
    });

    console.log("locationData", locationData)

    // Debug log when location data is fetched
    useEffect(() => {
        if (locationData?.data?.locationData?.address) {
            const address = locationData?.data?.locationData?.address;

            const location =
                address.city ||
                address.town ||
                address.village ||
                address.city_district || '';

            const fullLocation = `${location}, ${address.state || ''}`;

            console.log("Fetched location:", locationData);
            console.log("Resolved location:", fullLocation);

            // You can also set state here if needed
            setLocation(fullLocation);
        }
    }, [locationData]);



    const next = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const prev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    const handleFinish = () => {
        console.log({ location, relation, details });
        navigate('/search-results');
    };

    const variants = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-pink-500 to-pink-500 flex flex-col items-center justify-center ">
            <div className="relative w-screen h-screen  rounded-xl shadow-xl overflow-hidden  flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {stepIndex === 0 && (
                        <motion.div
                            key="location"
                            {...variants}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full space-y-6"
                        >
                            {/* <IoLocationSharp size={200} className="text-5xl text-pink-600 mx-auto" /> */}
                            <img src={Location} />
                            <h2 className="text-2xl font-bold">Share Your Location</h2>
                            <p className=" text-white">We'll use your location to suggest nearby matches.</p>
                            <div>
                                {location ? (
                                    <div className="text-white font-medium">{location}</div>
                                ) : (
                                    <div className="text-gray-400">Waiting for permission...</div>
                                )}
                            </div>
                            <button
                                onClick={next}
                                disabled={!location}
                                className={`fixed bottom-2 left-2 right-2 bg-white  text-primary px-6 py-2 rounded-lg transition flex items-center justify-center 
                                }`}
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
                            className="text-center w-full space-y-6"
                        >
                            <FaUserFriends className="text-5xl text-indigo-600 mx-auto" />
                            <h2 className="text-2xl font-bold">Who are you searching for?</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {relationOptions.map((rel) => (
                                    <button
                                        key={rel}
                                        onClick={() => setRelation(rel)}
                                        className={`py-2 px-4 rounded-full border text-sm transition-all ${relation === rel ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                                    >
                                        {rel}
                                    </button>
                                ))}
                            </div>
                            <button onClick={prev} className="fixed top-0 left-2  "><FaAnglesLeft size={20} className=' text-white' /></button>



                            <button
                                onClick={next}
                                disabled={!location}
                                className={`fixed bottom-2 left-2 right-2 bg-white  text-primary px-6 py-2 rounded-lg transition flex items-center justify-center 
                                }`}
                            >
                                Next
                            </button>
                            {/* <div className="flex justify-between items-center mt-6">
                                <button onClick={prev} className="text-gray-500">Back</button>
                                <button
                                    onClick={next}
                                    disabled={!relation}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full shadow"
                                >
                                    Next
                                </button>
                            </div> */}
                        </motion.div>
                    )}

                    {stepIndex === 2 && (
                        <motion.div
                            key="details"
                            {...variants}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full space-y-6"
                        >
                            <FaRegEdit className="text-5xl text-green-600 mx-auto" />
                            <h2 className="text-2xl font-bold">Basic Preferences</h2>
                            <div className="space-y-4">
                                <input
                                    type="number"
                                    placeholder="Preferred Age"
                                    value={details.age}
                                    onChange={(e) => setDetails({ ...details, age: e.target.value })}
                                    className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Preferred Caste"
                                    value={details.caste}
                                    onChange={(e) => setDetails({ ...details, caste: e.target.value })}
                                    className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <button onClick={prev} className="text-gray-500">Back</button>
                                <button
                                    onClick={handleFinish}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow"
                                >
                                    Finish
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
