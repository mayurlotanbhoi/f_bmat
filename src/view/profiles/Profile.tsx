import React, { useState } from 'react'
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
interface TypeOfBio {
    [key: string]: any; // or use a specific structure like: name: string, age: number, etc.
}

interface FilterProps {
    filterKey: { [key: string]: any }; // adjust type if you know the exact structure
    setFilter: React.Dispatch<React.SetStateAction<any>>; // update `any` to the actual state type
    setModelKey: React.Dispatch<React.SetStateAction<any>>;
    setShowfilter: React.Dispatch<React.SetStateAction<any>>; // update `any` to the actual state type
}
const Filter: React.FC<FilterProps> = ({ filterKey, setFilter, setModelKey, setShowfilter }) => {

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
                        {Object.keys(filterKey).map((key, index) => <p onClick={() => setModelKey(key)} key={index} className=' cursor-pointer w-full flex justify-between mt-2 bg-g items-center text-gray-500 border-2 border-gray-200 h-12 rounded-xl px-4 font-bold text-[1rem]'> <span><span className=' capitalize'>{key}</span>: All {filterKey[key]}</span> <IoIosArrowForward /></p>
                        )}
                    </div>
                </div>

                <div className=' flex justify-between gap-2 mx-4 my-2'>
                    <button onClick={() => { reset(), setShowfilter(false) }} className='clasic-btn w-30'>  <RxCross2 size={20} /> <span>CANCEL </span></button>
                    <button className='primary-button w-30'> <SiVerizon /> <span>SAVE THIS</span></button>
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
    const [viewBio, setViewBio] = useState<TypeOfBio | boolean>(false)
    const [showFilter, setShowfilter] = useState(false)
    const [h, setH] = useState("h-80")
    const [modelkey, setModelKey] = useState<string>("")

    const [filter, setFilter] = useState({
        age: "age",
        cast: "cast",
        subCast: "sub-cast",
        income: "income",
        state: 'state',
        city: "city",
    })

    const onDown = () => { setViewBio(false); setH("h-80") };

    return (
        <>
            <ProfileSearchHeader />
            <FlotingButton icon={<FaFilter size={18} />} onClick={() => setShowfilter(true)} text={'FILTER'} />
            <div className="w-full  flex justify-between items-center px-4 my-4">
                <Heading className='text-xl font-semibold' text={'1000 profile Fouond'} />
                <div className="">
                    {/* <FaFilter className="text-gray-700 cursor-pointer" onClick={() => setShowfilter(true)} size={24} /> */}
                </div>
            </div>
            <div className="w-full h-full flex flex-wrap">
                {bios?.map((bio, index) => (
                    <div key={index} className="w-full p-0  md:w-1/3 lg:w-1/2 ">
                        <ProfileCard bio={bio} setViewBio={setViewBio} />
                    </div>
                ))}
            </div>


            <Drawer isOpen={!!viewBio} position="bottom" padding={"p-0"}
                widthClass="w-100"
                className={'rounded-t-lg bg-gray-300'}
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
                <Filter filterKey={filter} setModelKey={setModelKey} setFilter={setFilter} setShowfilter={setShowfilter} />
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


