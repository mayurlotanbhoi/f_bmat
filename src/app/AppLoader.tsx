import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserQuery } from '../features/user/userApi';
import { useLazyGetMatrimonyByUserIdQuery } from '../features/matrimony/matrimonyApi';



const AppLoader = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const [triggerGetUser] = useLazyGetUserQuery();
    const [triggerGetProfileByUserId] = useLazyGetMatrimonyByUserIdQuery();

    useEffect(() => {
        const loadApp = async () => {
            try {
                // First, get user data (must succeed)
                const userData = await triggerGetUser('').unwrap();
                if (userData?.statusCode !== 200) throw new Error('User ID missing');

                // Call profile API in parallel, but don’t crash on failure
                const [profileResult] = await Promise.allSettled([
                    triggerGetProfileByUserId(userData._id).unwrap(),
                ]);

                // if (profileResult.status === 'rejected') {
                //     if (profileResult.reason?.status === 404) {
                //         console.warn('Profile not found, continuing...');
                //     } else {
                //         console.warn('Other profile fetch error:', profileResult.reason);
                //     }
                // }

                // Continue
                // navigate('/lang');
            } catch (error) {
                console.error('App loading failed:', error);
                navigate('/auth');
            } finally {
                setLoading(false);
            }
        };

        loadApp();
    }, []);




    if (loading) {
        return (
            <div className="h-screen w-screen absolute top-0 z-[99999] sr-only  flex justify-center items-center bg-white dark:bg-gray-900">
                <span className="text-lg font-medium text-gray-700 dark:text-white">
                    Loading app...
                </span>
                {/* Add spinner here if needed */}
            </div>
        );
    }

    return null;
};

export default AppLoader;
