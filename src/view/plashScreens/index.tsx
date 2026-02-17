import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaRegEdit, FaArrowRight } from 'react-icons/fa';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Location, welcome } from '../../util/images.util';
import { useGetLocationQuery, useUpdateInitialdetailsMutation } from '../../features/locationb/locationApi';
import { appName } from '../../constant';
import { t } from 'i18next';

const steps = ['location', 'relation', 'details'];
const languages = [
    { code: 'en', label: 'English', icon: 'E' },
    { code: 'hi', label: 'हिन्दी', icon: 'हि' },
    { code: 'mr', label: 'मराठी', icon: 'म' },
];
const relationOptions = ['Myself', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative', 'Friend'];

export default function InitialInfo() {
    const [stepIndex, setStepIndex] = useState(0);
    const [relation, setRelation] = useState('');
    const [location, setLocation] = useState('');
    const [locationObject, setLocationObject] = useState<any>(null);
    const [language, setLanguages] = useState('');
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    const navigate = useNavigate();
    const [updateInitialdetails, { isLoading }] = useUpdateInitialdetailsMutation();

    // Request location permission (but don't block)
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                (err) => console.warn('Geolocation permission denied or error:', err)
            );
        }
    }, []);

    const { data: locationData } = useGetLocationQuery(coords!, { skip: !coords });

    useEffect(() => {
        if (locationData?.data?.locationData?.address) {
            const address = locationData.data.locationData.address;
            const loc = address.city || address.town || address.village || address.city_district || '';
            const fullLocation = `${loc}, ${address.state || ''}`;
            setLocation(fullLocation);
            setLocationObject(locationData.data.locationData);
        }
    }, [locationData]);

    const next = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const prev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    const handleFinish = async () => {
        const payload = {
            location,
            locationObject,
            relation,
            language,
        };
        try {
            await updateInitialdetails(payload).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Error submitting initial details:', err);
        }
    };

    const variants = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 },
    };

    return (
        <div className="h-[100vh] w-screen   bg_primary shadow  flex flex-col-reverse sm:flex-row justify-center flex-1">
            <div className=" m-0 sm:m-10  bg-white shadow sm:rounded-lg flex flex-col-reverse sm:flex-row justify-center flex-1">
                <div className=" rounded-t-2xl  p-6 sm:p-12">
                    {/* <div> */}
                    <h1 className='logo text-4xl text-primary font-extrabold text-center italic'>{appName} </h1>
                    <div className="md:mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <button onClick={prev} className="fixed top-2 left-2 text-white">
                                    <FaAnglesLeft size={20} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {stepIndex === 0 && (
                                        <motion.div
                                            key="location"
                                            {...variants}
                                            transition={{ duration: 0.5 }}
                                            className="text-center  flex flex-col items-center justify-center space-y-6"
                                        >
                                            <img className="w-32 h-32 object-contain" src={Location} />
                                            <h2 className="text-2xl font-bold text-white">Share Your Location</h2>
                                            <p className="">We'll use your location to suggest nearby matches.</p>
                                            <div className="font-medium">
                                                {location || 'Location not available (you can continue)'}
                                            </div>
                                            <button
                                                onClick={next}
                                                className="mt-5 tracking-wide font-semibold primary-button text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
                                                <span>Next</span>
                                                <FaArrowRight className="mx-2" size={20} />

                                            </button>
                                        </motion.div>
                                    )}

                                    {stepIndex === 1 && (
                                        <motion.div
                                            key="relation"
                                            {...variants}
                                            transition={{ duration: 0.5 }}
                                            className="text-center  flex flex-col items-center justify-center space-y-6"
                                        >
                                            <h2 className="text-2xl font-bold text-white">Who are you searching for?</h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
                                                {relationOptions.map((rel) => (
                                                    <button
                                                        key={rel}
                                                        onClick={() => setRelation(rel)}
                                                        className={`py-2 px-4 rounded-md border text-sm transition-all w-full ${relation === rel
                                                            ? '  text-white bg_primary font-semibold'
                                                            : '  border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white'
                                                            }`}
                                                    >
                                                        {rel}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={next}
                                                disabled={!relation}
                                                className="mt-5 tracking-wide font-semibold primary-button text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
                                                <span>Next</span>
                                                <FaArrowRight className="mx-2" size={20} />
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
                                            <h2 className="text-2xl font-bold text-primary">{t("languageSelection")}</h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
                                                {languages.map((lang) => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => setLanguages(lang.code)}
                                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 
                      ${language === lang.code
                                                                ? ' text-white bg_primary font-semibold'
                                                                : '  border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white'
                                                            }`}
                                                    >
                                                        <span className="bg-white text-pink-600 font-bold w-6 h-6 flex items-center justify-center rounded">
                                                            {lang.icon}
                                                        </span>
                                                        {lang.label}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={!language || isLoading}
                                                onClick={handleFinish}
                                                className={`mt-5 tracking-wide font-semibold primary-button text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${isLoading || !language ? 'opacity-60 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                {isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg_primary md:bg-green-100 text-center content-end lg:flex">
                <div
                    className="md:m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat min-h-[260px] md:min-h-[300px]"
                    style={{ backgroundImage: `url(${welcome})` }}
                />
            </div>
        </div>

    );
}

{/* <div className="h-[100vh] bg_primary text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col-reverse sm:flex-row justify-center flex-1">
                <div className="lg:w-1/2 rounded-t-2xl xl:w-5/12 p-6 sm:p-12">
                   
                    <h1 className='logo text-4xl text-primary font-extrabold text-center italic'>{appName} </h1>
                    <div className="md:mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">


                            <div className="mx-auto max-w-xs">
                                <LoginForm onSubmit={onSubmit} isSingUp={singUp} isLoading={isLoading} />



                                {!singUp ? (
                                    <p
                                        onClick={() => setSingUp(true)}
                                        className="text-center mt-3 text-sm text-gray-500 cursor-pointer"
                                    >
                                        Don&#x27;t have an account yet?
                                        <span className="font-semibold text-gray-600 hover:underline hover:text-pink-700">
                                            {' '}
                                            Sign up
                                        </span>
                                        .
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => setSingUp(false)}
                                        className="text-center mt-3 text-sm text-gray-500 cursor-pointer"
                                    >
                                        Have an account?
                                        <span className="font-semibold text-gray-600 hover:underline hover:text-pink-700">
                                            {' '}
                                            Sign in
                                        </span>
                                        .
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg_primary md:bg-green-100 text-center content-end lg:flex">
                    <div
                        className="md:m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat min-h-[260px] md:min-h-[300px]"
                        style={{ backgroundImage: `url(${welcome})` }}
                    />
                </div>
            </div>
        </div> */}
