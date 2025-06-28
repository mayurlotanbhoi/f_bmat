import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
    return (
        <div className="mt-20 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="max-w-[350px] min-h-[80vh] relative rounded-2xl shadow-lg   overflow-hidden  "
                >
                    {/* Verified Badge Placeholder */}
                    <div className="flex items-center gap-2 absolute top-3 left-3 px-3 py-1  rounded-full z-10">
                        <Skeleton circle height={24} width={24} highlightColor="#e2e8f0"
                            baseColor="#f1f5f9" className=" rounded" />
                        <Skeleton height={16} width={70} highlightColor="#e2e8f0"
                            baseColor="#f1f5f9" className=" rounded" />
                    </div>

                    {/* Main Image Skeleton */}
                    <Skeleton
                        height="80vh"
                        width="100%"
                        baseColor="#cbd5e1"
                        highlightColor="#e2e8f0"
                    />

                    {/* Thumbnails */}
                    <div className="flex flex-col justify-between absolute top-4 right-2 gap-2 z-10">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton
                                key={idx}
                                height={56}
                                width={56}
                                borderRadius={8}
                                baseColor="#f1f5f9"
                                highlightColor="#e2e8f0"
                            />
                        ))}
                    </div>

                    {/* Bottom Text + Button Section */}
                    <div className="absolute bottom-0 left-0 w-full px-4 pb-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20">
                        <Skeleton
                            height={20}
                            width="70%"
                            baseColor="#f8fafc"
                            highlightColor="#e2e8f0"
                            className="mb-2 rounded"
                        />
                        <Skeleton
                            height={16}
                            width="50%"
                            baseColor="#f1f5f9"
                            highlightColor="#e2e8f0"
                            className="mb-1 rounded"
                        />
                        <Skeleton
                            height={16}
                            width="40%"
                            baseColor="#f1f5f9"
                            highlightColor="#e2e8f0"
                            className="mb-1 rounded"
                        />
                        <Skeleton
                            height={16}
                            width="60%"
                            baseColor="#f1f5f9"
                            highlightColor="#e2e8f0"
                            className="mb-4 rounded"
                        />

                        <Skeleton
                            height={40}
                            width="100%"
                            // baseColor="#f1f5f9"
                            highlightColor="#e2e8f0"
                            className=" rounded"
                        />

                        {/* <div className="w-full flex justify-center">
                            <Skeleton
                                height={40}
                                width="100%"
                                borderRadius={999}
                                baseColor="#94a3b8"
                                highlightColor="#cbd5e1"
                            />
                        </div> */}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProfileSkeleton;
