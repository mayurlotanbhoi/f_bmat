import { profilesData } from '../../data/profiles';
import { MdVerified } from 'react-icons/md';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ConfettiButton } from '../../components';

// interface UserCardProps {
//     bios: {
//         [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
//     };
// }

interface Bio {
    [key: string]: any;
}

const Matche = () => {
    const bios = profilesData;
    return (
        <>
            {bios?.map((match: Bio, index: number) =>

            (<div key={index} className="flex my-2 flex-col p-2 bg-white relative  shadow-3xl border-gray-800  hover:shadow-lg rounded-2xl cursor-pointer transition ease-in duration-500 transform hover:scale-105">
                <small className="text-sm absolute right-2 top-1  text-gray-300 leading-none  truncate">
                    MAT00001
                </small>
                <div className="flex  justify-between items-center">
                    {/* Left Side: Avatar & Info */}
                    <div className="flex  text-start mr-auto">
                        <div className="inline-flex  w-28 h-28 relative">
                            <img
                                src={match?.imges[0]}
                                alt={match?.name}
                                className="p-1 w-full h-full object-cover rounded-2xl"
                            />
                            <span className="absolute w-full h-full inline-flex border-2 rounded-2xl border-gray-600 opacity-75" />

                        </div>


                    </div>

                    {/* Right Side: Stats */}
                    <div className="w-full flex flex-col py-3       ml-3 min-w-0">
                        <div className="flex flex-col    ">
                            <div className="flex flex-col text-start gap-2  min-w-0">
                                <div className="font-medium text-xl  leading-none text-primary flex  gap-2">
                                    {match?.name} <MdVerified className='  text-green-500  ' size={20} />
                                </div>
                                <div className=" text-sm font-bold   leading-none  flex  ">
                                    {match?.profession}, {match?.education}
                                </div>
                                <p className="text-sm text-gray-500 leading-none  truncate">
                                    {match?.age} Yrs Cast: {match?.subCaste}
                                </p>


                            </div>
                            <h5 className="flex items-center text-sm font-medium text-gray-500  ">
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
                            <p className="text-sm text-gray-500 leading-none  truncate">
                                {match?.location}
                            </p>

                        </div>
                    </div>


                </div>
                <div className=' flex  justify-between items-center'>
                    <div className="flex justify-around items-center w-28 text-primary gap-2">
                        <Link to={'/chat'} className="w-8 h-8 flex items-center justify-center border-2 border-pink-500 rounded-full">
                            <IoChatbubbleOutline className="text-[1rem]" />
                        </Link>
                        <div className="w-8 h-8 flex items-center justify-center border-2 border-pink-500 rounded-full">
                            <AiOutlineLike className="text-[1rem]" />
                        </div>
                    </div>

                    <ConfettiButton className=' btn bg_primary text-white px-4 py-[2px] rounded-xl '><button >Send Intrest</button></ConfettiButton>
                </div>
            </div>))}
        </>
    )
}

export default Matche;
