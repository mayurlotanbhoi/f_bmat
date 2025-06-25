import React, { useState } from 'react';
import { FaRightLong } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';
import { calculateAge } from '../../util/dateFormat';
interface TypeOfBio {
    [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
}
interface ProfileCardProps {
    bio: {
        [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
    };
    setViewBio: React.Dispatch<React.SetStateAction<TypeOfBio | boolean>>;
}



const ProfileCard: React.FC<ProfileCardProps> = ({ bio, setViewBio }) => {
    const [mainImage, setMainImage] = useState(bio?.profilePhotos?.[0]);


    return (
        <div className="max-w-md min-h-[80vh]   relative  rounded-xl shadow-lg bg-white">
            <div className='flex items-center gap-2 absolute top-3 left-3 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full'>
                <MdVerified className='text-green-400' size={24} />
                <h2 className='text-white font-semibold text-sm'>Verified</h2>
            </div>

            {/* Main Image */}
            <div
                className=" min-h-[80vh] w-full bg-cover bg-center rounded-lg border mb-4"
                style={{ backgroundImage: `url(${mainImage})` }}
            ></div>

            {/* Thumbnails */}
            <div className=" flex flex-col justify-between right-2 absolute top-4 gap-2 overflow-x-auto mb-4">
                {bio?.profilePhotos?.map((img: string, index: number) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setMainImage(img)}
                        className={` w-14 h-14 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-gray-300'
                            }`}
                    />
                ))}
            </div>

            {/* Candidate Info */}
            <div className=' w-full absolute bottom-0 px-4  pb-2 text-white '>
                <div className="text-lg font-semibold mb-1">{bio?.personalDetails?.fullName}</div>
                <div className="text-sm  ">Cast: {bio?.religiousDetails?.subCaste},{bio?.religiousDetails?.caste}, </div>
                <div className="text-sm  mb-1">Age: {calculateAge(bio?.personalDetails?.dateOfBirth)}</div>
                <div className="text-sm  mb-3">Income: {bio?.professionalDetails?.income}, </div>

                {/* Action Buttons */}
                <div className=" w-full flex justify-center">
                    <button onClick={() => setViewBio(prev => bio)} className=" bg_primary w-full flex justify-center items-center gap-3 text-md rounded-3xl font-bold   text-white px-4 py-2 ">
                        <p>View</p><FaRightLong />
                    </button>
                    {/* <button className="bg-green-500 text-sm text-white px-4 py-2 rounded hover:bg-green-600">
                        Connect
                    </button>
                    <button className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600">
                        Show Interest
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default ProfileCard
