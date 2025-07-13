import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGetMatchQuery } from '../../features/matrimony/matrimonyApi';
import { calculateAge } from '../../util/dateFormat';
import { formatAmount } from '../../util/commans';
import Heading from '../../components/Headings/Heading';
import { useLocalization } from '../../hooks';
import { getShearedBio } from '../../features/biodata/shearedSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

interface Bio {
    [key: string]: any;
}

const Matche = () => {
    const { data, isLoading, isError } = useGetMatchQuery('');
    const likes = useSelector(getShearedBio);
    const matches = useLocalization('matches')
    const sendBio = useLocalization('sendBio')
    const options = useLocalization('options')

   const isLiked =  useCallback((id: string) => {
    const like = likes?.map((like) => like?._id);
    if (!like) return false;
        return like.includes(id);
    }, [likes]);


    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">No Match Found!</p>;


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
            
                return (
                    <Link
                        to={`/vlew-profile/${match?._id.toString()}`}
                        key={index}
                        className=' mt-2 m-5 bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg'
                    >

                        <div

                            id="toast-notification"
                            className="w-full md:max-w-[350px] p-4 relative text-gray-900 bg-white rounded-lg shadow "
                            role="alert"
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
                            <div className="flex justify-end items-center mt-2">
                                <button disabled={isLiked(match?._id.toString())} className='btn bg_primary text-sm text-white px-4 rounded-md  text-bold'>{sendBio}</button>
                            </div>
                        </div>
                    </Link>

                    // </>
                );
            })}
            </div>
        </>
    );
};

export default Matche;
