import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGetMatchQuery } from '../../features/matrimony/matrimonyApi';
import { calculateAge } from '../../util/dateFormat';
import { formatAmount } from '../../util/commans';
import Heading from '../../components/Headings/Heading';
import { useLocalization } from '../../hooks';
import { getShearedBio } from '../../features/biodata/shearedSlice';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { ConfettiButton } from '../../components';
import { useShareBioDataMutation } from '../../features/biodata/biodataApi';

interface Bio {
    [key: string]: any;
}

const Matche = () => {
    const { data,  isError } = useGetMatchQuery('');
     const [shearBioData] = useShareBioDataMutation();
    
        const [isLoading, setIsLoadoding] = useState(false);
    const likes = useSelector(getShearedBio);
    const matches = useLocalization('matches')
    const sendBio = useLocalization('sendBio')
    const options = useLocalization('options')
     const label = useLocalization('labels')

   const isLiked =  useCallback((id: string) => {
       console.log("id", id, likes)
       // @ts-ignore
       const like = likes?.map((like) => like?.toUser?._id);
       console.log("ids", like, id)
       console.log("likes", like.includes(id))
       if (!like) return false;
           return like.includes(id);
       }, [likes]);


    // if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    // if (isError) return <p className="text-center text-red-500">No Match Found!</p>;

    const handleShearClick = async (toUserId , profileId ) => {

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
        <>
        
            <div className=" flex justify-between mt-3 ">
                <Heading className="text-xl w-100  font-semibold" text={matches} />
                <div className=" text-right my-2"><Link className="text-blue-600 hover:underline cursor-pointer py-10" to='/matches'>See all match</Link></div>
            </div>
            <div className="md:flex justify-between items-center mt-3">
            {Array.isArray(data?.data) && data?.data?.map((match: Bio, index: number) => {
                const name = match?.personalDetails?.fullName || 'Unknown';
                const dob = match?.personalDetails?.dateOfBirth;
                const subCaste = match?.religiousDetails?.subCaste || 'N/A';
                const caste = options.religiousDetails.caste[match?.religiousDetails?.caste];
                const income = match?.professionalDetails?.income || 'N/A';
                const occupation = options?.professionalDetails?.occupation[match?.professionalDetails?.occupation];
                const JobType = options?.professionalDetails?.jobType[match?.professionalDetails?.jobType];
                const education = options?.educationDetails?.highestQualification[match?.educationDetails?.highestQualification || 'N/A'];

                const photo = match?.profilePhotos?.[0] || '/placeholder.jpg';
                const city = match?.contactDetails?.presentAddress?.city;
                const state = options.contactDetails?.presentAddress?.state[match?.contactDetails?.presentAddress?.state];
                const matId = match?.matId || 'NA';

                // console.log("match", match)
            
                return (
                    <>
                   

                        <div

                            id="toast-notification"
                            className="w-full md:max-w-[400px] p-4 relative text-gray-900 bg-white rounded-lg shadow my-2"
                            role="alert"
                        >
                             <Link
                        to={`/vlew-profile/${match?._id.toString()}`}
                        key={index}
                        className=' '
                    >
                            <div className="flex items-center justify-between mb-3">
                                <span className="mb-1 text-sm font-semibold text-primary dark:text-white" >
                                    {name}</span >
                               { match?.isVerified && (
                                   <div className='flex items-center gap-1 absolute top-1 right-1  px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full'>
                                       <MdVerified className='text-green-400' size={20} />
                                       <h2 className='text-white font-semibold text-[10px]'>Verified</h2>
                                   </div>
                               )}
                            </div>
                            <div className="flex items-center">
                                <div className="relative text-center inline-block shrink-0">
                                    {/* <small>ID: {matId}</small> */}
                                    <img className='w-16 h-16 rounded-md object-cover bg-green-600 flex items-center justify-center text-white font-bold text-xl ' src={photo} loading='lazy' alt={name} />
                                </div>
                                <div className="ms-3 text-sm font-normal">
                                    <div className="text-sm font-normal">{calculateAge(dob)},  {subCaste}, {caste}</div>
                                    <div className="text-sm font-semibold text-primary">
                                        {education}, {occupation} ,{JobType}, {formatAmount(income)}
                                    </div>
                                    <div className="text-sm font-semibold text-primary">

                                    </div>

                                    <span className="text-xs font-medium ">
                                        {city}, {state}
                                    </span>

                                </div>
                            </div>
                        
                            </Link>

                            <div className="flex justify-end items-center mt-2">
                             <ConfettiButton>
                            
                                            <button
                                    onClick={() => { handleShearClick(match?.userId, match?._id)}}
                                    disabled={isLoading || isLiked(match?.userId?.toString())}
                                    className={` bg_primary text-white py-1 px-3 rounded-lg transition flex items-center justify-end  ${isLoading || isLiked(match?.userId?.toString()) ? 'opacity-70 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                               
                            
                                                {isLoading  ? (
                                                    <>
                                                        {/* <svg
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
                                                        </svg> */}
                                                        <span>Shearing...</span>
                                                    </>
                                                ) : (<>
                                            {isLiked(match?.userId?.toString()) ? (
                                                            <span>{label.biosended}</span>
                                                        ) : (
                                                              <span>{isLoading ? 'Shearing' : label.sendBio}</span>
                                                        )}
                                                    </>
                                                )}
                                            </button>
                                        </ConfettiButton>
                                        </div>

                        </div>
                   
                    </>

                    // </>
                );
            })}
            </div>
        </>
    );
};

export default Matche;
