import Heading from '../../Headings/Heading';
// Assuming Heading is a separate component

export default function HomeSkeleton() {
    return (
        <div className="mt-20 px-4">

            {/* Banner Skeleton */}
            <div className="h-[5rem] sm:h-[14rem] md:h-[18rem] w-full object-cover  rounded-3xl animate-pulse bg-gray-300 shadow-lg mb-6" />

            {/* Category Heading */}
            <Heading className="text-xl my-2 font-semibold" text="Category" />

            {/* Horizontal Scroll Skeleton */}
            <div className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth mb-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="min-w-[8rem] h-20 rounded-2xl bg-gray-300 animate-pulse shadow-lg"
                    />
                ))}
            </div>

            {/* Profile Cards Skeleton */}
            <div className="w-100 flex flex-wrap justify-between   ">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-3 mt-3 md:w-52 w-32 h-32 rounded-2xl bg-gray-300 animate-pulse shadow-lg relative"
                    >
                        <div className="w-10 h-10 rounded-md bg-slate-400 mb-2" />
                        <div className="h-4 bg-slate-400 w-3/4 rounded mb-1" />
                        <div className="h-3 bg-slate-400 w-1/2 rounded" />
                    </div>
                ))}
            </div>

            {/* Content List Skeleton */}
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-start space-x-4 animate-pulse mb-6 mt-7"
                >
                    {/* Image block */}
                    <div className="w-32 h-32 rounded-2xl bg-gray-300 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>

                    {/* Text block */}
                    <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-1/2" />
                        <div className="h-3 bg-gray-300 rounded w-2/3" />
                        <div className="h-3 bg-gray-300 rounded w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}
