import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/Profile/ProfileCard'
import { profilesData } from '../../data/profiles'
import Drawer from '../../components/Common/Drawer';
import Viewprofile from '../../components/Profile/Viewprofile';
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { FaFilter, } from 'react-icons/fa';
import Heading from '../../components/Headings/Heading';
import { FlotingButton } from '../../components';
import Modal from '../../components/Common/Modal';
import { IoFilterSharp } from 'react-icons/io5';
import { SiVerizon } from 'react-icons/si';
import { RxCross2 } from 'react-icons/rx';
import { AgeFilter, CastFilter, CityFilter, IncomeFilter, StateFilter, SubCastFilter } from '../../components/forms/ProfileFiltersForms';
import ProfileSearchHeader from './ProfileSearchHeader';
import BackButtn from '../../components/Buttons/BackButtn';
import { getMatrimony } from '../../features/matrimony/matrimonySlice';
import { useParams } from 'react-router-dom';
import { useFilterAllProfilesMutation } from '../../features/matrimony/matrimonyApi';
import { ProfileSkeleton } from '../../components/Common/skeletons';
import { m } from 'framer-motion';
interface TypeOfBio {
    [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
}

interface FilterProps {
    filterKey: { [key: string]: any }; // adjust type if you know the exact structure
    setFilter: React.Dispatch<React.SetStateAction<any>>; // update `any` to the actual state type
    setModelKey: React.Dispatch<React.SetStateAction<any>>;
    setShowfilter: React.Dispatch<React.SetStateAction<any>>;
    onSave: () => void // update `any` to the actual state type
}
const Filter: React.FC<FilterProps> = ({ onSave, filterKey, setFilter, setModelKey, setShowfilter }) => {

    const reset = () => {
        setFilter(
            {
                age: "age",
                cast: "cast",
                subCast: "sub-cast",
                income: "income",
                state: 'state',
                city: "city",
            }
        )
    }

    const handleOnSave = () => {
        onSave()
        setShowfilter(false)
    }

    return <>
        <div className="w-screen h-screen md:w-96 bg-slate-100 flex flex-col">
            {/* Top Header */}
            <div className="px-2 flex justify-between gap-2 py-4 bg-white items-center">

                <BackButtn onClick={() => setShowfilter(false)} />
                <Heading
                    className="text-black ps-5 font-bold text-sm"
                    text={"Search matches according to your preferences"}
                />
                <div></div>
            </div>

            {/* Bottom Scrollable Section */}
            <div className="bg-white flex-1 flex flex-col justify-between overflow-y-auto mt-2">
                <div>
                    <div className="flex justify-between items-center px-4 my-2 w-full">
                        <div className="flex items-center space-x-2">
                            <IoFilterSharp />
                            <p>Apply filter</p>
                        </div>
                        <p onClick={reset} className="text-primary font-bold cursor-pointer">Remove all</p>
                    </div>

                    {/* Content area */}
                    <div className="px-4 mt-4">
                        {Object.keys(filterKey).map((key, index) => (
                            <div
                                onClick={() => setModelKey(key)}
                                key={index}
                                className="cursor-pointer w-full flex justify-between items-center mt-2 bg-g text-gray-500 border-2 border-gray-200 min-h-12 rounded-xl px-4 py-2 font-bold text-base"
                            >
                                <span className="capitalize">
                                    {key}: <span className="font-normal">All {filterKey[key]}</span>
                                </span>

                                {/* Fixed size and alignment for icon */}
                                <IoIosArrowForward className="text-gray-500 min-w-[20px] min-h-[20px]" size={20} />
                            </div>
                        ))}
                    </div>

                </div>

                <div className=' flex justify-between gap-2 mx-4 my-2'>
                    <button onClick={() => { reset(), setShowfilter(false) }} className='clasic-btn w-30'>  <RxCross2 size={20} /> <span>CANCEL </span></button>
                    <button onClick={handleOnSave} className='primary-button w-30'> <SiVerizon /> <span>SAVE THIS</span></button>
                </div>
            </div>

        </div>

    </>
}



type FilterType = {
    age?: string;
    income?: string;
    state?: string;
    city?: string;
    cast?: string;
    subCast?: string;
    [key: string]: any;
};



export const renderModelFilter = (
    key: string,
    setModelKey: React.Dispatch<React.SetStateAction<any>>,
    setFilter: React.Dispatch<React.SetStateAction<any>>,
    filter: FilterType
): React.ReactNode => {
    const handleSubmit = (key: string, values: any) => {
        let updated: Partial<FilterType> = {};

        switch (key) {
            case "age": {
                const { min, max } = values?.ageRange || {};
                updated.age = `${min}-${max}`;
                break;
            }
            case "cast": {
                const cast = values?.cast || [];
                updated.cast = Array.isArray(cast) ? cast.join(",") : "";
                break;
            }
            case "state": {
                const state = values?.state || [];
                updated.state = Array.isArray(state) ? state.join(",") : "";
                break;
            }
            case "income":
                updated.income = values?.income;
                break;

            case "city":
                updated.city = values?.city;
                break;

            case "subCast":
                updated.subCast = values?.subCast;
                break;

            default:
                return;
        }

        setFilter({ ...filter, ...updated });
        setModelKey("");
    };

    const submitWrapper = (values: any) => handleSubmit(key, values);

    switch (key) {
        case "age":
            return <AgeFilter onSubmit={submitWrapper} />;
        case "income":
            return <IncomeFilter onSubmit={submitWrapper} />;
        case "state":
            return <StateFilter onSubmit={submitWrapper} />;
        case "city":
            return <CityFilter onSubmit={submitWrapper} />;
        case "cast":
            return <CastFilter onSubmit={submitWrapper} />;
        case "subCast":
            return <SubCastFilter onSubmit={submitWrapper} />;
        default:
            return null;
    }
};


export default function Profile() {
    const bios = profilesData;
    const profile = getMatrimony();
    const [viewBio, setViewBio] = useState<TypeOfBio | boolean>(false)
    // const [viewProfile, setViewProfile] = useState(false)
    const [showFilter, setShowfilter] = useState(false)
    const [h, setH] = useState("h-80")
    const [modelkey, setModelKey] = useState<string>("")
    const [profileData, setProfileData] = useState([])
    const { filter: filterKey } = useParams();
    const [filterAllProfiles, { data, isLoading, isError, error }] = useFilterAllProfilesMutation();
    console.log(filterKey, 'filterKey');

    const [filter, setFilter] = useState({
        age: "age",
        cast: "cast",
        subCast: "sub-cast",
        income: "income",
        state: 'state',
        city: "city",
    })

    const filterData = {
        caste: '',
        city: '',
        candidateTypes: filterKey,
        page: 1,
        limit: 10
    };

    const filterApi = async () => {
        // Clone the filter to avoid mutating original state
        const filtered = { ...filter };

        // Remove default keys if they are equal to their default string
        const keysToRemove = {
            age: "age",
            cast: "cast",
            subCast: "sub-cast",
            income: "income",
            state: "state",
            city: "city",
        };

        Object.entries(keysToRemove).forEach(([key, defaultValue]) => {
            if (filtered[key] === defaultValue) {
                delete filtered[key];
            }
        });


        try {
            const profiltes = await filterAllProfiles({ ...filtered, candidateTypes: filterKey }).unwrap();
            console.log(profiltes?.data?.data, 'profiltes');
            setProfileData(prev => [...prev, ...profiltes?.data?.data])
        } catch (err) {
            console.error('Filter API error:', err);
        }
    };

    useEffect(() => {
        setProfileData([])
        setFilter({
            age: "age",
            cast: "cast",
            subCast: "sub-cast",
            income: "income",
            state: 'state',
            city: "city",
        })
    }, [filterKey])



    useEffect(() => {
        filterApi()
    }, [filterAllProfiles]);




    const onDown = () => { setViewBio(false); setH("h-80") };


    return (
        <>
            <ProfileSearchHeader />
            {isLoading && <ProfileSkeleton />}
            {Array.isArray(data?.data?.data) && data.data.data.length === 0 && (
                <h1 className=" w-screen h-screen flex justify-center items-center font-extrabold text-xl text-gray-400 ">
                    No BioData found
                </h1>
            )}
            <FlotingButton icon={<FaFilter size={18} />} onClick={() => setShowfilter(true)} text={'FILTER'} />
            <div className="w-full  flex justify-between items-center px-4 my-4">
                {/* <Heading className='text-xl font-semibold' text={'1000 profile Fouond'} /> */}
                <div className="">
                    {/* <FaFilter className="text-gray-700 cursor-pointer" onClick={() => setShowfilter(true)} size={24} /> */}
                </div>
            </div>
            <div className="w-full h-full flex flex-wrap py-10 pb-14">
                {Array.isArray(profileData) && profileData?.map((bio, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 ">
                        <ProfileCard bio={bio} setViewBio={setViewBio} />
                    </div>
                ))}
            </div>

            {/* view profile animation */}
            <Drawer isOpen={!!viewBio} position="bottom" padding={"p-0"}
                widthClass="w-100"
                className={'rounded-t-lg bg-gray-300 '}
                heightClass={h} showCloseBtn={false} onClose={() => setViewBio(false)}>
                <div className=' w-100 flex justify-center   '>
                    {h !== "h-80" ? (
                        <button onClick={() => onDown()} className="text-center bg-slate-100 p-2 rounded-md">
                            <IoIosArrowDown size={35} />
                        </button>
                    ) : (
                        <button onClick={() => setH("h-[100vh]")} className="text-center bg-slate-100 p-2 rounded-md">
                            <IoIosArrowUp size={35} />
                        </button>
                    )}

                </div>
                {/* @ts-ignore */}
                <Viewprofile bio={viewBio} />
            </Drawer >

            <Drawer isOpen={showFilter} position="left" padding={"p-0"}
                widthClass="w-100"
                className={'rounded-t-lg'}
                showCloseBtn={false} onClose={() => setShowfilter(false)}>
                <Filter onSave={filterApi} filterKey={filter} setModelKey={setModelKey} setFilter={setFilter} setShowfilter={setShowfilter} />
            </Drawer>

            <Modal
                isOpen={!!modelkey}
                onClose={() => setModelKey("")}
                title={modelkey}
                size="lg"
            > <>{renderModelFilter(modelkey, setModelKey, setFilter, filter)}</></Modal>

        </>
    )
}


