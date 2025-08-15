import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetBiodataQuery, useLazyViewLikesQuery, useShareBioDataMutation } from '../../features/biodata/biodataApi';
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
import { ConfettiButton } from '../../components';
import { useSelector } from 'react-redux';
import { getShearedBio } from '../../features/biodata/shearedSlice';
import { t } from 'i18next';
import { makeCall, sendWhatsAppMessage } from '../../util';
import { qrScanLink } from '../../constant';
import { loader, verified } from '../../util/images.util';
import { Loading } from '../../components/loaders/Loading';
import { PiCampfireLight } from 'react-icons/pi';
import { formatCurrency } from '../../util/formatCurrency';
import { useAuth } from '../../hooks/useAuth';
import NoData from '../../components/Common/notFound';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
// import {  }  from "../../util/images.util";

export default function ViewBio({ biodata }: { biodata?: any }) {
    const { id } = useParams();
    const profile = getMatrimony();
    // console.log("profile", profile)
    const [bio, setBio] = useState<any>(biodata || null);
    const [activeTab, setActiveTab] = useState('Personal');
    const [mainImage, setMainImage] = useState(bio?.profilePhotos?.[0]);
    const [getBiodata] = useLazyGetBiodataQuery();
    const [isProfileFound, setProfileFound] = useState(false);
    const [vieViewLikes] = useLazyViewLikesQuery();
     const [shearBioData] = useShareBioDataMutation();

    const [isLoading, setIsLoadoding] = useState(false);
    const label = useLocalization('labels')
    const sectionTitles = useLocalization('sectionTitles')
    const opinions = useLocalization('options');
    const [currectSection, setCurrectSection] = useState(sectionTitles.personalDetails);
 const likes = useSelector(getShearedBio);
const isLiked =  useCallback((id: string) => {
    console.log("id", id, likes)
    // @ts-ignore
    const like = likes?.map((like) => like?.toUser?._id);
    console.log("ids", like, id)
    console.log("likes", like.includes(id))
    if (!like) return false;
        return like.includes(id);
    }, [likes]);
    
    const getBiodatacall = async (id: any) => {
        try {
            const response = await getBiodata(id);
            console.log("getBiodata response", response?.error);
            if (response?.error) {
                setProfileFound(true);
            } else {
                setProfileFound(false);
            }
            setBio(response?.data?.data);
            setMainImage(response?.data?.data?.profilePhotos?.[0])
            
        } catch (error) {
            console.error('Error fetching biodata:', error);
        }
    };

    useEffect(() => {
        if (!id) return;
        getBiodatacall(id);
        vieViewLikes(id)
    }, [id]);

    if (isProfileFound) return <NoData />;
    if (!bio) return <Loading text={t('loading')} />;

    const { personalDetails, contactDetails, religiousDetails, familyDetails, educationDetails, professionalDetails, lifestyleDetails, expectation, profilePhotos } = bio;

    const statBox = [
        { label: label.subCaste, value: religiousDetails?.subCaste },
        { label: label.occupation, value: professionalDetails?.occupation },
        { label: label.caste, value: religiousDetails?.caste },
        { label: label.income, value: `₹${professionalDetails?.income}` },
    ];

    // opinions?.personalDetails.gender[]

    const tabs = {
        Personal: [
            { label: label.gender, value: opinions?.personalDetails.gender[personalDetails?.gender] },
            { label: label.dob, value: new Date(personalDetails?.dateOfBirth).toLocaleDateString() },
            { label: label.age, value: calculateAge(personalDetails?.dateOfBirth) },
            { label: label.maritalStatus, value: opinions?.personalDetails.maritalStatus[personalDetails?.maritalStatus] },
            { label: label.height, value: opinions?.personalDetails.height[personalDetails?.height] },
            { label: label.weight, value: opinions?.personalDetails.weight[personalDetails?.weight] },
            { label: label.complexion, value: opinions?.personalDetails.complexion[personalDetails?.complexion] },
            { label: label.disability, value: opinions?.personalDetails.disability[personalDetails?.disability] },
        ],
        // opinions.education[]
        Education: [
            { label: label.qualification, value: opinions?.educationDetails.highestQualification[educationDetails?.highestQualification] },
            { label: label.specialization, value: educationDetails?.specialization },
            { label: label.occupation, value: opinions.professionalDetails.occupation[professionalDetails?.occupation] },
            { label: label.companyName, value: professionalDetails?.companyName },
            { label: label.jobType, value: opinions.professionalDetails.jobType[professionalDetails?.jobType] },
            { label: label.income, value: opinions.expectation.income[professionalDetails?.income] },
            { label: label.workingCity, value: professionalDetails?.workingCity },
            { label: label.workFromHome, value: opinions.professionalDetails.workFromHome[professionalDetails?.workFromHome] },
        ],
        Religious: [
            { label: label.caste, value: opinions.religiousDetails.caste[religiousDetails.caste] },
            { label: label.subCaste, value: religiousDetails?.subCaste },
            { label: label.gotra, value: religiousDetails?.gotra },
            { label: label.manglik, value: opinions.religiousDetails.manglik[religiousDetails?.manglik] },
            { label: label.nakshatra, value: opinions.religiousDetails.nakshatra[religiousDetails?.nakshatra] },
            { label: label.rashi, value: opinions.religiousDetails.rashi[religiousDetails?.rashi] },
        ],
        Contact: [
            { label: label.phone, value: contactDetails?.mobileNo },
            { label: label.whatsapp, value: contactDetails?.whatsappNo },
            { label: label.email, value: contactDetails?.email },
            { label: label.city, value: contactDetails?.presentAddress?.city },
            { label: label.state, value: opinions.contactDetails.presentAddress.state[contactDetails?.presentAddress?.state] },
        ],
        Family: [
            { label: label.father, value: familyDetails?.fatherName },
            { label: label.fatherOccupation, value: opinions.professionalDetails.occupation[familyDetails?.fatherOccupation] },
            { label: label.mother, value: familyDetails?.motherName },
            { label: label.motherOccupation, value: opinions.professionalDetails.occupation[familyDetails?.motherOccupation] },
            { label: label.brothers, value: familyDetails?.brothers },
            { label: label.marriedBrothers, value: familyDetails?.marriedBrothers },
            { label: label.sisters, value: familyDetails?.sisters },
            { label: label.marriedSisters, value: familyDetails?.marriedSisters },
        ],
        Lifestyle: [
            { label: label.smoking, value: opinions.lifestyleDetails.smoking[lifestyleDetails?.smoking] },
            { label: label.drinking, value: opinions.lifestyleDetails.drinking[lifestyleDetails?.drinking] },
            { label: label.eatingHabits, value: opinions.lifestyleDetails.eatingHabits[lifestyleDetails?.eatingHabits] },
        ],
        Expectations: [
            { label: label.qualification, value: expectation?.education?.map(item => opinions.educationDetails.highestQualification[item]).join(', ') },
            { label: label.occupation, value: expectation?.occupation?.map(item => opinions.professionalDetails.occupation[item]).join(', ') },
            { label: label.income, value: opinions.expectation.income[expectation?.income] },
            { label: label.jobType, value: expectation?.jobType?.map(item => opinions.expectation.jobType[item]).join(', ') },
            { label: label.locationPreference, value: expectation?.locationPreference },
            { label: label.ageRange, value: expectation?.ageRange },
            { label: label.heightRange, value: opinions.expectation.heightRange[expectation?.heightRange] },
            { label: label.otherExpect, value: expectation?.caste },
        ]
    };



    const tabConfig = [
        { key: 'Personal', icon: FaUser, text: sectionTitles.personalDetails },
        { key: 'Education', icon: FaGraduationCap, text: sectionTitles.educationAndProfession },
        { key: 'Religious', icon: PiCampfireLight, text: sectionTitles.religiousDetails },
        { key: 'Contact', icon: FaPhone, text: sectionTitles.contactDetails },
        { key: 'Family', icon: FaUsers, text: sectionTitles.familyDetails },
        { key: 'Lifestyle', icon: FaLeaf, text: sectionTitles.lifestyle },
        { key: 'Expectations', icon: FaHeart, text: sectionTitles.expectations },
    ];

    const onTabClick = (key: string, section: string) => {
        setActiveTab(key);
        setCurrectSection(section);
    };

    const handleShearClick = async (toUserId = bio?.userId, profileId = bio?._id) => {
        console.log(toUserId, profileId);
        try {
            setIsLoadoding(true);
            await shearBioData({ toUserId, profileId });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadoding(false);
        }
    };

    return (
        <div className=" mx-auto  space-y-6 bg-white pb-10">
            <div className="max-w-md min-h-[80vh]   relative  rounded-xl shadow-lg bg-white">
                {bio?.isVerified && (
                    <div className='flex items-center gap-2 absolute top-3 left-3 px-3 py-1  rounded-full'>
                        <img className="w-20 h-auto" src={verified} alt="Verified" />
                    </div>
                )}

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
            </div>

            <div className=' my-5 px-2 '>
                <div className=' my-5 px-2 '>
                    <strong className='text-xl capitalize'>{bio?.personalDetails?.fullName}</strong>
                    <div className=' flex justify-between my-4'>
                        <button onClick={() => makeCall(bio?.contactDetails?.mobileNo)} className='btn   secondary-btn'> <FaLock size={15} /> <p>{label.callNow}</p> </button>
                        <button onClick={() => sendWhatsAppMessage({
                            phoneNumber: bio?.contactDetails?.whatsappNo, message: 'like', biodataUrl: `${qrScanLink}/${bio?._id}`})} className='btn   therd-btn'> <IoLogoWhatsapp size={15} /> <p>{label.whatsappNow}</p> </button>
                    </div>
                    <div className='flex justify-start items-center gap-1 capitalize'><CiLocationOn size={20} /> <small className='text-[16px] '>{formatShortAddress(contactDetails?.presentAddress)}</small></div>
                </div>
                <hr className="w-full h-[1px] bg-[gray] border-none my-2" />
                <Heading className={'text-black text-xl font-semibold py-2'} text={sectionTitles.mainInformation} />
                <div className=' flex justify-center items-center flex-wrap gap-4'>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg  '> <small className=' text-[14px] '>{label.caste}</small> <strong className='text-[18px] text-center flex items-center text-primary'> {opinions?.religiousDetails?.caste[bio?.religiousDetails?.caste || '-']} </strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg'> <small className=' text-[14px] '>{label.subCaste}</small> <strong className='text-[18px] text-center flex items-center text-primary'> {bio?.religiousDetails?.subCaste}</strong></p>
                    <p className='flex flex-col justify-center items-center bg-gray w-[10rem] h-[5rem] rounded-lg   '> <small className=' text-[14px] '>{label?.occupation}</small> <strong className='text-[18px] text-center  flex items-center text-primary '> {bio?.professionalDetails?.occupation}</strong></p>
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
                    {/* <h2 className="text-lg font-semibold text-pink-600 mb-4">
                        {currectSection}
                    </h2> */}

                    <div className="divide-y divide-gray-100">
                        {tabs[activeTab].map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between py-3 px-2 sm:px-3 text-sm ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } rounded-lg`}
                            >
                                <span className="text-black font-medium me-2">{item.label}</span>
                                <span className="text-gray-800 text-right">{item.value || 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="text-center text-xs text-gray-400">
                Last Updated: {new Date(bio?.updatedAt).toLocaleDateString()}
            </div>
            {profile?._id && <ConfettiButton>

                <button
                    onClick={() => handleShearClick(bio?.userId, bio?._id)}
                    disabled={isLoading || isLiked(bio?. userId?.toString())}
                    className={`fixed bottom-2 left-2 right-2 bg_primary text-white py-2 rounded-lg transition flex items-center justify-center ${isLoading || isLiked(bio?. userId?.toString()) ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading  ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                                />
                            </svg>
                            <span>Shearing...</span>
                        </>
                    ) : (<>
                            { isLiked(bio?.userId?.toString()) ? (
                                <span>{label.biosended}</span>
                            ) : (
                                  <span>{isLoading ? 'Shearing' : label.sendBio}</span>
                            )}
                        </>
                    )}
                </button>
            </ConfettiButton>}
        </div>
    );
}
