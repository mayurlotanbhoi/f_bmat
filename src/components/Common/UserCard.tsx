import React from "react";
import { MdVerified } from "react-icons/md";
import { useGetMatchQuery } from "../../features/matrimony/matrimonyApi";
import { verified } from "../../util/images.util";

const Matchs = () => {
    const { data, isLoading, isError, error } = useGetMatchQuery('');

    if (isLoading) return <p className="text-white">Loading matches...</p>;
    // if (isError) return <p className="text-red-400">Error: {error?.message || "Something went wrong"}</p>;

    return (
        <>
            {data?.data?.map((match: any, index: number) => {
                const name = match?.personalDetails?.fullName || "Unknown";
                const age = match?.personalDetails?.dateOfBirth
                    ? new Date().getFullYear() - new Date(match.personalDetails.dateOfBirth).getFullYear()
                    : "N/A";
                const subCaste = match?.religiousDetails?.subCaste || "N/A";
                const income = match?.professionalDetails?.income || "N/A";
                const photo = match?.profilePhotos?.[0] || "/placeholder.jpg";

                return (
                    <div
                        key={index}
                        className="flex m-2 flex-col p-2 bg-white shadow-2xl border-gray-800 hover:shadow-lg rounded-2xl cursor-pointer transition ease-in duration-500 transform hover:scale-105"
                    >
                        <div className="flex  justify-between">
                            {/* Left Side: Avatar */}
                            <div className="flex items-center mr-auto">
                                <div className="inline-flex w-32 h-32 relative">
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="p-1 w-32 h-32 object-cover rounded-2xl"
                                    />
                                    <span className="absolute w-32 h-32 inline-flex border-2 rounded-2xl border-gray-600 opacity-75" />
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full ">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col min-w-0">
                                        {match?.isVerified && (
                                            <div className="font-medium text-xl leading-none text-black flex items-center gap-2">
                                                {name} <img className="w-20 h-auto" src={verified} alt="Verified" />
                                            </div>
                                        )}
                                        <p className="text-sm text-black leading-none mt-1 truncate">
                                            Age: {age} | Caste: {subCaste}
                                        </p>
                                    </div>
                                    <h5 className="flex items-center font-medium text-black">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        ₹{income}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Matchs;
