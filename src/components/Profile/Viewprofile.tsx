import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRupeeSign, } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import Heading from '../Headings/Heading';
import UserProfileCard from './PersonalBioCard';

interface ViewProfileProps {
    bio: {
        [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
    };
}

export default function Viewprofile({ bio }: ViewProfileProps) {
    const [activeTab, setActiveTab] = useState('otherInfo');
    const { personalDetails, religiousDetails, contactDetails, permanentAddress, presentAddress, professionalDetails } = bio


    const tabs = [
        { key: 'otherInfo', label: 'Other Information' },
        { key: 'profile', label: 'Profile' },
        { key: 'family', label: 'Family' },
        { key: 'education', label: 'Education & Career' },
        { key: 'contact', label: 'Contact' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {

            case 'otherInfo':
                return (
                    <>
                        <div className=' my-5 '>
                            <strong className='text-xl'>{bio?.personalDetails?.name}</strong>
                            <div className=' flex justify-between my-4'>
                                <button className='btn   secondary-btn'> <FaLock size={15} /> <p>Call Now</p> </button>
                                <button className='btn   therd-btn'> <IoLogoWhatsapp size={15} /> <p>Call Now</p> </button>
                            </div>
                            <div className='flex justify-start items-center gap-1 capitalize'><CiLocationOn size={20} /> <small className='text-[16px] '>pune, maharashtra</small></div>
                        </div>
                        <hr className="w-full h-[1px] bg-[gray] border-none my-2" />                        <Heading className={'text-black text-xl font-semibold'} text={'Other Information'} />
                        <div className=' flex justify-center items-center flex-wrap gap-4'>
                            <p className='flex flex-col justify-center items-center bg-gray w-[9rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Caste</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.caste}</strong></p>
                            <p className='flex flex-col justify-center items-center bg-gray w-[9rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Sub Caste</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.subCaste}</strong></p>
                            <p className='flex flex-col justify-center items-center bg-gray w-[9rem] h-[5rem] rounded-lg   '> <small className=' text-[14px] '>Profession</small> <strong className='text-[18px] text-center  flex items-center text-primary '> {bio?.professionalDetails?.occupation}</strong></p>
                            <p className='flex flex-col justify-center items-center bg-goldan w-[9rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Monthly Salary</small> <strong className='text-[18px] text-center flex items-center'> <FaRupeeSign />{bio?.professionalDetails?.income}</strong></p>
                        </div>
                    </>
                );
            case 'profile':
                return (
                    <>
                        <div className=' flex justify-center flex-wrap gap-4  '>

                            <UserProfileCard user={bio} />
                            {/* <EducationCard bio={bio}/> */}

                        </div>
                    </>
                );
            case 'family':
                return (
                    <div className=" shadow-md rounded-lg p-4 space-y-3">
                        <p className="text-lg text-gray-700">
                            <strong className="font-semibold text-gray-800">Father's Name:</strong> {bio?.family?.father || 'N/A'}
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong className="font-semibold text-gray-800">Mother's Name:</strong> {bio?.family?.mother || 'N/A'}
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong className="font-semibold text-gray-800">Siblings:</strong> {bio?.family?.siblings || 'N/A'}
                        </p>
                    </div>

                );
            case 'education':
                return (
                    <div>
                        <p><strong>Qualification:</strong> {bio?.education}</p>
                        <p><strong>Job:</strong> {bio?.job}</p>
                        <p><strong>Income:</strong> ₹{bio?.income} /year</p>
                    </div>
                );
            case 'contact':
                return (
                    <div>
                        <p><strong>Phone:</strong> {bio?.phone}</p>
                        <p><strong>Email:</strong> {bio?.email}</p>
                        <p><strong>Address:</strong> {bio?.address}</p>
                    </div>
                );
            default:
                return <p>No Data</p>;
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg ">
            {/* Tabs */}
            <div className="flex w-full gap-2 border-b border-gray-200 mb-4 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`whitespace-nowrap px-4 py-2 rounded-md transition-all duration-200
        ${activeTab === tab.key
                                ? 'bg_primary text-white font-semibold shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'}
      `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>


            {/* Content */}

            <div className="text-sm space-y-2 max-w-[22rem] lg:max-w-full  container ">{renderTabContent()}</div>

        </div>
    );
}
