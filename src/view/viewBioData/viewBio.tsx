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
import { useLocalization } from '../../hooks';
import { formatAddress, formatAmount, formatShortAddress } from '../../util/commans';

export default function ViewBio() {
    const { id } = useParams();
    const [bio, setBio] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('Personal');
    const [mainImage, setMainImage] = useState(bio?.profilePhotos?.[0]);
    const [getBiodata] = useLazyGetBiodataQuery();
    const [vieViewLikes] = useLazyViewLikesQuery();
    const label = useLocalization('labels')
    const sectionTitles = useLocalization('sectionTitles')
    const [currectSection, setCurrectSection] = useState(sectionTitles.personalDetails);


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
        { label: label.subCaste, value: religiousDetails?.subCaste },
        { label: label.occupation, value: professionalDetails?.occupation },
        { label: label.caste, value: religiousDetails?.caste },
        { label: label.income, value: `₹${professionalDetails?.income}` },
    ];

    const tabs = {
        Personal: [
            { label: label.gender, value: personalDetails?.gender },
            { label: label.dob, value: new Date(personalDetails?.dateOfBirth).toLocaleDateString() },
            { label: label.maritalStatus, value: personalDetails?.maritalStatus },
            { label: label.height, value: personalDetails?.height },
            { label: label.weight, value: personalDetails?.weight },
            { label: label.complexion, value: personalDetails?.complexion },
            { label: label.disability, value: personalDetails?.disability },
        ],
        Education: [
            { label: label.qualification, value: educationDetails?.highestQualification },
            { label: label.specialization, value: educationDetails?.specialization },
        ],
        Profession: [
            { label: label.occupation, value: professionalDetails?.occupation },
            { label: label.income, value: `₹${professionalDetails?.income}` },
            { label: label.workingCity, value: professionalDetails?.workingCity },
            { label: label.workFromHome, value: professionalDetails?.workFromHome },
        ],
        Contact: [
            { label: label.phone, value: contactDetails?.mobileNo },
            { label: label.whatsapp, value: contactDetails?.whatsappNo },
            { label: label.email, value: contactDetails?.email },
            { label: label.city, value: contactDetails?.presentAddress?.city },
            { label: label.state, value: contactDetails?.presentAddress?.state },
        ],
        Family: [
            { label: label.father, value: familyDetails?.fatherName },
            { label: label.fatherOccupation, value: familyDetails?.fatherOccupation },
            { label: label.mother, value: familyDetails?.motherName },
            { label: label.motherOccupation, value: familyDetails?.motherOccupation },
            { label: label.brothers, value: familyDetails?.brothers },
            { label: label.marriedBrothers, value: familyDetails?.marriedBrothers },
            { label: label.sisters, value: familyDetails?.sisters },
            { label: label.marriedSisters, value: familyDetails?.marriedSisters },

        ],
        Lifestyle: [
            { label: label.smoking, value: lifestyleDetails?.smoking },
            { label: label.drinking, value: lifestyleDetails?.drinking },
            { label: label.eatingHabits, value: lifestyleDetails?.eatingHabits },
        ],
        Expectations: [
            { label: label.education, value: expectation?.education?.join(', ') },
            { label: label.occupation, value: expectation?.occupation?.join(', ') },
            { label: label.locationPreference, value: expectation?.locationPreference },
        ]
    };



    const tabConfig = [
        { key: 'Personal', icon: FaUser, text: sectionTitles.personalDetails },
        { key: 'Education', icon: FaGraduationCap, text: sectionTitles.educationAndProfession },
        { key: 'Profession', icon: FaBriefcase, text: sectionTitles.educationAndProfession },
        { key: 'Contact', icon: FaPhone, text: sectionTitles.contactDetails },
        { key: 'Family', icon: FaUsers, text: sectionTitles.familyDetails },
        { key: 'Lifestyle', icon: FaLeaf, text: sectionTitles.lifestyle },
        { key: 'Expectations', icon: FaHeart },
    ];

    const onTabClick = (key: string, section: string) => {
        setActiveTab(key);
        setCurrectSection(section);
    };

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
                    <strong className='text-xl'>{bio?.personalDetails?.fullName}</strong>
                    <div className=' flex justify-between my-4'>
                        <button className='btn   secondary-btn'> <FaLock size={15} /> <p>{label.callNow}</p> </button>
                        <button className='btn   therd-btn'> <IoLogoWhatsapp size={15} /> <p>{label.whatsappNow}</p> </button>
                    </div>
                    <div className='flex justify-start items-center gap-1 capitalize'><CiLocationOn size={20} /> <small className='text-[16px] '>{formatShortAddress(contactDetails?.presentAddress)}</small></div>
                </div>
                <hr className="w-full h-[1px] bg-[gray] border-none my-2" />
                <Heading className={'text-black text-xl font-semibold py-2'} text={sectionTitles.mainInformation} />
                <div className=' flex justify-center items-center flex-wrap gap-4'>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>{label.caste}</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.caste}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>{label.subCaste}</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.subCaste}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg   '> <small className=' text-[14px] '>{label.occupation}</small> <strong className='text-[18px] text-center  flex items-center text-primary '> {bio?.professionalDetails?.occupation}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-goldan w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>{label.income}</small> <strong className='text-[18px] text-center flex items-center'>{formatAmount(bio?.professionalDetails?.income)}</strong></p>
                </div>
            </div>

            <div className="border-b bg-white mt-10 dark:border-gray-700 flex overflow-x-auto no-scrollbar space-x-3  px-1 ">
                <ul className="flex space-x-2 px-2  w-max min-w-full ">
                    {tabConfig.map(({ key, text, icon: Icon }) => (
                        <li key={key} className="flex-shrink-0 font-bold  ">
                            <button
                                onClick={() => onTabClick(key, text)}
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
                                {text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Tabs */}
            <div className="">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-pink-600 mb-4">
                        {currectSection}
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
