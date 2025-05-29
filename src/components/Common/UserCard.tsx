import type React from "react";
import { MdVerified } from "react-icons/md";

interface UserCardProps {
    bios: {
        [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
    };
}

interface Bio {
    [key: string]: any;
}

const UserCard: React.FC<UserCardProps> = ({ bios }) => {
    return (
        <>
            {bios?.map((match: Bio, index: number) =>

            (<div key={index} className="flex my-2 flex-col p-2 bg-[#3C552D] shadow-2xl border-gray-800  hover:shadow-lg rounded-2xl cursor-pointer transition ease-in duration-500 transform hover:scale-105">
                <div className="flex items-center justify-between">
                    {/* Left Side: Avatar & Info */}
                    <div className="flex items-center mr-auto">
                        <div className="inline-flex w-32 h-32 relative">
                            <img
                                src={match?.imges[0]}
                                alt={match?.name}
                                className="p-1 w-32 h-32 object-cover rounded-2xl"
                            />
                            <span className="absolute w-32 h-32 inline-flex border-2 rounded-2xl border-gray-600 opacity-75" />
                        </div>


                    </div>

                    {/* Right Side: Stats */}
                    <div className="w-full flex flex-col justify-center items-center     ml-3 min-w-0">
                        <div className="flex flex-col justify-center   items-center">
                            <div className="flex flex-col  min-w-0">
                                <div className="font-medium text-xl leading-none text-gray-100 flex items-center gap-2">{match?.name} <MdVerified className='  text-green-500  ' size={20} /></div>
                                <p className="text-sm text-gray-500 leading-none mt-1 truncate">
                                    Age:  {match?.age} Cast: {match?.subCaste}
                                </p>
                            </div>
                            <h5 className="flex items-center font-medium text-gray-300 ">
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
                                {match?.income}
                            </h5>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-400 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>))}
        </>
    );

};

export default UserCard;
