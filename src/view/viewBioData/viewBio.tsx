import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetBiodataQuery, useLazyViewLikesQuery } from '../../features/biodata/biodataApi';
import { MdVerified } from 'react-icons/md';
import { calculateAge } from '../../util/dateFormat';
import { CiLocationOn } from 'react-icons/ci';
import Heading from '../../components/Headings/Heading';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaLock, FaRupeeSign } from 'react-icons/fa';
import {
    FaUser, FaGraduationCap, FaBriefcase, FaPhone, FaUsers, FaHeart, FaLeaf
} from "react-icons/fa";

export default function ViewBio() {
    const { id } = useParams();
    const [bio, setBio] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('Personal');
    const [mainImage, setMainImage] = useState(bio?.profilePhotos?.[0]);
    const [getBiodata] = useLazyGetBiodataQuery();
    const [vieViewLikes] = useLazyViewLikesQuery()

    const getBiodatacall = async (id: any) => {
        try {
            const response = await getBiodata(id);
            setBio(response?.data?.data);
            setMainImage(response?.data?.data?.profilePhotos?.[0])
        } catch (error) {
            console.error('Error fetching biodata:', error);
        }
    };

    useEffect(() => {
        getBiodatacall(id);
        vieViewLikes(id)
    }, [id]);

    if (!bio) return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;

    const { personalDetails, contactDetails, religiousDetails, familyDetails, educationDetails, professionalDetails, lifestyleDetails, expectation, profilePhotos } = bio;

    const statBox = [
        { label: 'Sub Caste', value: religiousDetails?.subCaste },
        { label: 'Occupation', value: professionalDetails?.occupation },
        { label: 'Caste', value: religiousDetails?.caste },
        { label: 'Income', value: `₹${professionalDetails?.income}` },
    ];

    const tabs = {
        Personal: [
            { label: 'Gender', value: personalDetails?.gender },
            { label: 'DOB', value: new Date(personalDetails?.dateOfBirth).toLocaleDateString() },
            { label: 'Marital Status', value: personalDetails?.maritalStatus },
            { label: 'Height', value: personalDetails?.height },
            { label: 'Weight', value: personalDetails?.weight },
            { label: 'Complexion', value: personalDetails?.complexion },
            { label: 'Disability', value: personalDetails?.disability },
        ],
        Education: [
            { label: 'Qualification', value: educationDetails?.highestQualification },
            { label: 'Specialization', value: educationDetails?.specialization },
        ],
        Profession: [
            { label: 'Occupation', value: professionalDetails?.occupation },
            { label: 'Income', value: `₹${professionalDetails?.income}` },
            { label: 'Working City', value: professionalDetails?.workingCity },
            { label: 'WFH', value: professionalDetails?.workFromHome },
        ],
        Contact: [
            { label: 'Mobile', value: contactDetails?.mobileNo },
            { label: 'WhatsApp', value: contactDetails?.whatsappNo },
            { label: 'Email', value: contactDetails?.email },
            { label: 'City', value: contactDetails?.presentAddress?.city },
            { label: 'State', value: contactDetails?.presentAddress?.state },
        ],
        Family: [
            { label: 'Father', value: familyDetails?.fatherName },
            { label: 'Mother', value: familyDetails?.motherName },
            { label: 'Brothers', value: familyDetails?.brothers },
            { label: 'Sisters', value: familyDetails?.sisters },
        ],
        Lifestyle: [
            { label: 'Smoking', value: lifestyleDetails?.smoking },
            { label: 'Drinking', value: lifestyleDetails?.drinking },
            { label: 'Food Habits', value: lifestyleDetails?.eatingHabits },
        ],
        Expectations: [
            { label: 'Education', value: expectation?.education?.join(', ') },
            { label: 'Occupation', value: expectation?.occupation?.join(', ') },
            { label: 'Location Preference', value: expectation?.locationPreference },
        ]
    };



    const tabConfig = [
        { key: 'Personal', icon: FaUser },
        { key: 'Education', icon: FaGraduationCap },
        { key: 'Profession', icon: FaBriefcase },
        { key: 'Contact', icon: FaPhone },
        { key: 'Family', icon: FaUsers },
        { key: 'Lifestyle', icon: FaLeaf },
        { key: 'Expectations', icon: FaHeart },
    ];

    return (
        <div className=" mx-auto  space-y-6 bg-white pb-10">

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
                {/* <div className=' w-full absolute bottom-0 px-4  pb-2 text-white '>
                    <div className="text-lg font-semibold mb-1">{bio?.personalDetails?.fullName}</div>
                    <div className="text-sm  ">Cast: {bio?.religiousDetails?.subCaste},{bio?.religiousDetails?.caste}, </div>
                    <div className="text-sm  mb-1">Age: {calculateAge(bio?.personalDetails?.dateOfBirth)}</div>
                    <div className="text-sm  mb-3">Income: {bio?.professionalDetails?.income}, </div>


                </div> */}
            </div>


            {/* Stat Pills */}
            {/* <div className="grid grid-cols-2 p-6 sm:grid-cols-4 gap-3">
                {statBox.map((item, index) => (
                    <div
                        key={index}
                        className={`rounded-xl shadow text-center p-3 text-sm font-semibold text-white ${index === 0 ? 'bg-pink-600' : 'bg-gray-600'
                            }`}
                    >
                        <div>{item.label}</div>
                        <div className="text-xs font-normal mt-1">{item.value || 'N/A'}</div>
                    </div>
                ))}
            </div> */}

            <div className=' my-5 px-2 '>
                <div className=' my-5 px-2 '>
                    <strong className='text-xl'>{bio?.personalDetails?.name}</strong>
                    <div className=' flex justify-between my-4'>
                        <button className='btn   secondary-btn'> <FaLock size={15} /> <p>Call Now</p> </button>
                        <button className='btn   therd-btn'> <IoLogoWhatsapp size={15} /> <p>Call Now</p> </button>
                    </div>
                    <div className='flex justify-start items-center gap-1 capitalize'><CiLocationOn size={20} /> <small className='text-[16px] '>pune, maharashtra</small></div>
                </div>
                <hr className="w-full h-[1px] bg-[gray] border-none my-2" />
                <Heading className={'text-black text-xl font-semibold py-2'} text={'Other Information'} />
                <div className=' flex justify-center items-center flex-wrap gap-4'>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Caste</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.caste}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Sub Caste</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.subCaste}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg   '> <small className=' text-[14px] '>Profession</small> <strong className='text-[18px] text-center  flex items-center text-primary '> {bio?.professionalDetails?.occupation}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-goldan w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>Monthly Salary</small> <strong className='text-[18px] text-center flex items-center'> <FaRupeeSign />{bio?.professionalDetails?.income}</strong></p>
                </div>
            </div>

            <div className="border-b bg-white mt-10 dark:border-gray-700 flex overflow-x-auto no-scrollbar space-x-3  px-1 ">
                <ul className="flex space-x-2 px-2  w-max min-w-full ">
                    {tabConfig.map(({ key, icon: Icon }) => (
                        <li key={key} className="flex-shrink-0 font-bold  ">
                            <button
                                onClick={() => setActiveTab(key)}
                                className={`inline-flex items-center px-4 py-4 text-sm  transition-all border-b-2 rounded-t-lg group
            ${activeTab === key
                                        ? 'text-pink-600 border-pink-600 bg-white shadow-sm'
                                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon
                                    className={`mr-2 text-base transition-colors duration-200 ${activeTab === key
                                        ? 'text-pink-600'
                                        : 'text-gray-800 group-hover:text-gray-500'
                                        }`}
                                />
                                {key}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Tabs */}
            <div className="">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-pink-600 mb-4">
                        {activeTab} Details
                    </h2>

                    <div className="divide-y divide-gray-100">
                        {tabs[activeTab].map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between py-3 px-2 sm:px-3 text-sm ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } rounded-lg`}
                            >
                                <span className="text-black font-medium">{item.label}</span>
                                <span className="text-gray-800 text-right">{item.value || 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="text-center text-xs text-gray-400">
                Last Updated: {new Date(bio?.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
}
