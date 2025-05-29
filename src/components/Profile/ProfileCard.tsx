import React, { useState } from 'react';
import { MdVerified } from 'react-icons/md';
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
    const [mainImage, setMainImage] = useState(bio?.imges?.[0]);

    return (
        <div className="max-w-md min-h-[80vh]   relative  rounded-xl shadow-lg bg-white">
            <div className=' flex items-center  gap-2 absolute top-3 left-3'>
                <MdVerified className='  text-green-500  ' size={30} />
                <h2 className=' text-white font-semibold '>Verified</h2>
            </div>
            {/* Main Image */}
            <div
                className=" min-h-[80vh] w-full bg-cover bg-center rounded-lg border mb-4"
                style={{ backgroundImage: `url(${mainImage})` }}
            ></div>

            {/* Thumbnails */}
            <div className=" flex flex-col justify-between right-2 absolute top-4 gap-2 overflow-x-auto mb-4">
                {bio?.imges?.map((img: string, index: number) => (
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
            <div className=' absolute bottom-0 px-4 text-white '>
                <div className="text-lg font-semibold mb-1">{bio?.name}</div>
                <div className="text-sm  mb-1">Age: {bio?.age}</div>
                <div className="text-sm  mb-3">Income: {bio?.income}</div>

                {/* Action Buttons */}
                <div className="gap-4 flex justify-between">
                    <button onClick={() => setViewBio(bio)} className="primary-button text-sm text-white px-4 py-2 rounded">
                        View
                    </button>
                    <button className="bg-green-500 text-sm text-white px-4 py-2 rounded hover:bg-green-600">
                        Connect
                    </button>
                    <button className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600">
                        Show Interest
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard
