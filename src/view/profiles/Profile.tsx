import React, { useEffect, useRef, useState } from 'react'
import ProfileCard from '../../components/Profile/ProfileCard'
import Drawer from '../../components/Common/Drawer';
import Viewprofile from '../../components/Profile/Viewprofile';
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { FaFilter, } from 'react-icons/fa';
import { FlotingButton, InfiniteLoading } from '../../components';
import Modal from '../../components/Common/Modal';

import { AgeFilter, CastFilter, CityFilter, IncomeFilter, StateFilter, SubCastFilter } from '../../components/forms/ProfileFiltersForms';
import ProfileSearchHeader from './ProfileSearchHeader';
import { useParams } from 'react-router-dom';
import { useLazyFilterAllProfilesQuery } from '../../features/matrimony/matrimonyApi';
import { ProfileSkeleton } from '../../components/Common/skeletons';
import { useInfiniteScrollRtk } from '../../hooks/useInfiniteScrollRtk';
import { Input, MultiSelect } from '../../components/forms/Inputs';

import { Formik, Form, type FormikProps } from "formik";
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SiVerizon } from "react-icons/si";
import BackButtn from '../../components/Buttons/BackButtn';
import Heading from '../../components/Headings/Heading';
import ViewBio from '../viewBioData/viewBio';
import { filterValidationSchema } from '../../validations/matrimony.validations';
import { object } from 'yup';
import NoData from '../../components/Common/notFound';

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
const optionsMap = {

    "highestQualification": [
        // Academic Qualifications
        "Below 10th",
        "10th Pass",
        "12th Pass",
        "Diploma",
        "ITI",
        "Graduate",
        "B.E. / B.Tech",
        "BCA",
        "BBA",
        "Post Graduate",
        "MBA / PGDM",
        "MCA",
        "M.E. / M.Tech",
        "CA / CS / ICWA",
        "Ph.D",
        "MBBS / BDS",
        "M.D. / M.S.",
        "LLB",
        "LLM",

        // Professional Roles
        "Doctor",
        "Engineer",
        "Software Developer",
        "Chartered Accountant",
        "Professor / Lecturer",
        "Government Officer",
        "IAS / IPS / Civil Services",
        "Teacher",
        "Business Owner",
        "Advocate / Lawyer",
        "Banker",
        "Architect",
        "Pharmacist",
        "Pilot",
        "Scientist / Researcher",
        "Fashion Designer",
        "Journalist",
        "Artist / Performer",
        "Police / Defence Services",

        // Flexible
        "Other"
    ],
    "heightRange": ["Below 4ft", "4ft - 4ft 5in", "4ft 6in - 5ft", "5ft 1in - 5ft 5in", "5ft 6in - 6ft", "Above 6ft",],
    "education": [
        // Academic Qualifications
        "Below 10th",
        "10th Pass",
        "12th Pass",
        "Diploma",
        "ITI",
        "Graduate",
        "B.E. / B.Tech",
        "BCA",
        "BBA",
        "Post Graduate",
        "MBA / PGDM",
        "MCA",
        "M.E. / M.Tech",
        "CA / CS / ICWA",
        "Ph.D",
        "MBBS / BDS",
        "M.D. / M.S.",
        "LLB",
        "LLM",

        // Professional Roles
        "Doctor",
        "Engineer",
        "Software Developer",
        "Chartered Accountant",
        "Professor / Lecturer",
        "Government Officer",
        "IAS / IPS / Civil Services",
        "Teacher",
        "Business Owner",
        "Advocate / Lawyer",
        "Banker",
        "Architect",
        "Pharmacist",
        "Pilot",
        "Scientist / Researcher",
        "Fashion Designer",
        "Journalist",
        "Artist / Performer",
        "Police / Defence Services",

        // Flexible
        "Other"
    ],

    "occupation": [
        // 🎓 Elite Government & Administration
        "IAS / IPS / IFS",
        "Government - Class 1 Officer",
        "Government - Class 2 / 3 Officer",
        "Politician / MLA / MP",
        "Judicial Services (Judge / Magistrate)",

        // 🩺 Medical & Healthcare
        "Doctor",
        "Surgeon",
        "Dentist",
        "Specialist (Cardiologist / Neurologist / etc.)",
        "Veterinarian",
        "Pharmacist",
        "Physiotherapist",
        "Nurse / Medical Assistant",
        "Lab Technician",
        "Healthcare Worker",

        // 📊 Finance & Legal
        "Chartered Accountant (CA)",
        "Company Secretary (CS)",
        "Cost Accountant (ICWA)",
        "Investment Banker",
        "Finance Manager / Analyst",
        "Auditor / Tax Consultant",
        "Lawyer / Advocate",
        "Legal Advisor / Consultant",

        // 👨‍💻 IT & Technology
        "Software Engineer / Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "Data Scientist / Machine Learning Engineer",
        "AI / Robotics Specialist",
        "Cybersecurity Specialist",
        "Cloud Architect / DevOps",
        "UI/UX Designer",
        "IT Support / Network Admin",

        // 📚 Education & Research
        "Scientist / Researcher",
        "Professor / Lecturer",
        "Teacher (School)",
        "Tutor / Private Teacher",
        "Librarian",
        "Academic Counselor",

        // 🏦 Banking & Corporate
        "Bank Officer / Manager",
        "Bank Clerk / Executive",
        "HR Manager / Recruiter",
        "Business Analyst",
        "Project Manager",
        "Marketing / Sales Executive",
        "BPO / Call Center Executive",
        "Receptionist / Front Desk",

        // 🧑‍💼 Business & Entrepreneurship
        "Business Owner",
        "Startup Founder",
        "Shop Owner",
        "Wholesaler / Distributor",
        "Retailer",
        "Self-Employed",
        "Freelancer / Consultant",
        "Insurance / Real Estate Agent",

        // 🎨 Arts, Media & Creative
        "Actor / Model",
        "Artist / Illustrator",
        "Musician / Singer",
        "Photographer / Videographer",
        "Fashion Designer",
        "Interior Designer",
        "Content Creator / Influencer",
        "Journalist / Editor",

        // ✈️ Aviation, Marine & Defense
        "Pilot",
        "Cabin Crew / Air Hostess",
        "Aviation Ground Staff",
        "Merchant Navy",
        "Indian Army",
        "Indian Navy",
        "Indian Air Force",
        "Police / Paramilitary Forces",
        "Firefighter",

        // 🔧 Technical & Skilled Trades
        "Electrician",
        "Plumber",
        "Mechanic",
        "Technician",
        "Driver",
        "Tailor",
        "Welder",
        "Carpenter",
        "Machine Operator",

        // 🧱 Labor & Blue-Collar
        "Construction Worker",
        "Daily Wage Worker",
        "Delivery Person",
        "Cleaner / Housekeeping Staff",
        "Security Guard",
        "Watchman",
        "Peon / Office Boy",

        // 🌾 Agriculture & Rural
        "Farmer",
        "Agricultural Worker",
        "Dairy / Poultry Farmer",
        "Fisherman",

        // 🏠 Home & Others
        "Homemaker",
        "Student",
        "Unemployed / Job Seeking",
        "Retired"
    ],
    "jobType": ["Government", "Private", "Business", "Freelance"],

};
const Filter: React.FC<FilterProps> = ({ onSave, filterKey, setFilter, setModelKey, setShowfilter }) => {
    const formikRef = useRef<FormikProps<any>>(null);

    const fields = [
        { name: "ageRange", label: "Expected Age Range", placeholder: "24-29", type: "text", required: false },
        { name: "heightRange", label: "Expected Height Range", placeholder: "5'2\" - 5'8\"", type: "select", required: false },
        { name: "income", label: "Expected Annual Min Income", placeholder: "₹1,00,000", type: "text", required: false },
        { name: "subCaste", label: "Expected Caste", placeholder: "More", type: "text", required: false },
        { name: "education", label: "Expected Education", placeholder: "Graduate or above", type: "multiselect", required: false },
        { name: "occupation", label: "Expected Occupation", placeholder: "Working professional", type: "multiselect", required: false },
        { name: "jobType", label: "Expected Job Type", placeholder: "Private / Government", type: "multiselect", required: false },
        { name: "city", label: "Location Preference", placeholder: "Delhi NCR, Bangalore", type: "text", required: false },
    ];

    const getOptionsForField = (name: string): { label: string; value: string }[] => {
        const optionList = optionsMap[name] || [];
        return optionList.map((val: string) => ({ label: val, value: val }));
    };

    const initialValues = {
        ageRange: '',
        heightRange: '',
        income: '',
        caste: '',
        education: [],
        occupation: [],
        jobType: [],
        locationPreference: '',
    };

    return (
        <div className=' md:w-[400px] '>
            {/* Top Header */}
            <div className="px-2 sticky top-0 flex justify-between gap-2 py-4 border-b-8 border-gray-200 bg-white items-center">

                <BackButtn onClick={() => setShowfilter(false)} />
                <Heading
                    className="text-black ps-5 font-bold text-sm"
                    text={"Search matches according to your preferences"}
                />
                <div></div>
            </div>
            <div className="flex justify-between items-center px-4 my-2 w-full">
                <div className="flex items-center space-x-2">
                    <IoFilterSharp />
                    <p>Apply filter</p>
                </div>
                <p onClick={() => {
                    formikRef.current?.resetForm({
                        values: initialValues, // explicitly reset to clean values
                    });
                }} className="text-primary font-bold cursor-pointer">Remove all</p>
            </div>

            <Formik
                innerRef={formikRef}
                initialValues={filterKey || initialValues}
                validationSchema={filterValidationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    setFilter(values);
                    console.log("values", values);
                    onSave?.(); // Trigger reset + fetch
                    setShowfilter(false);
                }}
            >
                {/* {({ isSubmitting }) => ( */}
                <Form className="space-y-4 p-4 bg-white h-full w-full flex flex-col justify-between">
                    <div className="space-y-4">
                        {fields.map((field) => {
                            switch (field.type) {
                                case "multiselect":
                                    return (
                                        <MultiSelect
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            options={getOptionsForField(field.name)}
                                        />
                                    );
                                case "select":
                                    return (
                                        <Input
                                            key={field.name}
                                            type="select"
                                            name={field.name}
                                            label={field.label}
                                            // @ts-ignore
                                            options={getOptionsForField(field.name)}
                                            placeholder={field.placeholder}
                                        />
                                    );
                                default:
                                    return (
                                        <Input
                                            key={field.name}
                                            type="text"
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                        />
                                    );
                            }
                        })}
                    </div>

                    <div className="w-full flex justify-between gap-4  bg-white sticky bottom-0">
                        <button
                            onClick={() => setShowfilter(false)}
                            type="button"
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 border-black text-black font-bold rounded-lg w-full"
                        >
                            <RxCross2 />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 bg_primary text-white font-bold rounded-lg w-full"
                        >
                            <SiVerizon />
                            Save
                        </button>
                    </div>


                    {/* <button
                            type="submit"

                            className="bg_primary text-white py-2 rounded-lg mt-auto"
                        >
                            save
                        </button> */}
                </Form>
                {/* )} */}
            </Formik>
        </div >
    );
};




type FilterType = {
    age?: string;
    income?: string;
    state?: string;
    city?: string;
    caste?: string;
    subCaste?: string;
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
                updated.caste = Array.isArray(cast) ? cast.join(",") : "";
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

            case "subCaste":
                updated.subCaste = values?.subCast;
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
        case "caste":
            return <CastFilter onSubmit={submitWrapper} />;
        case "subCaste":
            return <SubCastFilter onSubmit={submitWrapper} />;
        default:
            return null;
    }
};




export default function Profile() {
    const [viewBio, setViewBio] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [drawerHeight, setDrawerHeight] = useState("h-80");
    const [modelKey, setModelKey] = useState("");
    const { filter: filterKey } = useParams();
    const [onSave, setOnSave] = useState(1);

    const [filter, setFilter] = useState({
        ageRange: "",
        cast: "",
        subCast: "",
        income: "",
        state: "",
        city: "",
    });

    const [trigger, { isLoading }] = useLazyFilterAllProfilesQuery();

    const sanitizeFilter = () => {
        const keysToRemove = {
            age: "age",
            caste: "caste",
            subCast: "subCaste",
            income: "income",
            state: "state",
            city: "city",
        };
        const clone = { ...filter };

        Object.entries(keysToRemove).forEach(([key, val]) => {
            if (clone[key] === val) delete clone[key];
        });
        return {
            ...clone,
            candidateTypes: filterKey,
        };
    };

    const {
        data: profileData,
        loading,
        error,
        bottomRef,
        reset,
        fetchMore,
        hasMore,
    } = useInfiniteScrollRtk(
        async ({ page, limit }) => {
            const payload = {
                filterValue: sanitizeFilter(),
                page,
                limit,
            };
            const res = await trigger(payload).unwrap();
            return {
                data: res?.data?.data || [],
                hasNextPage: res?.data?.hasNextPage,
                nextPage: res?.data?.nextPage,
                totalPages: res?.data?.totalPages,
                totalResults: res?.data?.totalResults,
                currentPage: res?.data?.currentPage,
            };
        },
        [onSave],
        1
    );

    const toggleDrawerHeight = () => {
        setDrawerHeight((prev) =>
            prev === "h-80" ? "h-[100vh]" : "h-80"
        );
    };

    return (
        <>
            <ProfileSearchHeader />
            {loading && profileData.length === 0 && Object.values(filter).every(
                v => v === null || v === undefined || v === '' ||
                    (Array.isArray(v) && v.length === 0) ||
                    (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)
            ) && <ProfileSkeleton />}
            {!loading && profileData.length === 0 && (
                <><NoData /></>
            )}

            <FlotingButton
                icon={<FaFilter size={18} />}
                onClick={() => setShowFilter(true)}
                text="FILTER"
            />
            <div className="w-full h-full flex flex-wrap py-10 pb-14 mt-8">
                {profileData.map((bio, index, arr) => (
                    <><div ref={arr.length - 1 === index ? bottomRef : null} key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
                        <ProfileCard bio={bio} setViewBio={setViewBio} />
                    </div>
                    </>
                ))}
                {loading && <InfiniteLoading />}
            </div>

            <div ref={bottomRef} className="h-10" />

            {/* View Profile Drawer */}
            <Drawer
                isOpen={!!viewBio}
                position="bottom"
                padding="p-0"
                widthClass="w-100"
                className="rounded-t-lg bg-gray-300"
                heightClass={drawerHeight}
                showCloseBtn={false}
                onClose={() => setViewBio(false)}
            >
                <div className="flex justify-center">
                    <button
                        onClick={toggleDrawerHeight}
                        className="text-center bg-slate-100 p-2 rounded-md"
                    >
                        {drawerHeight === "h-80" ? (
                            <IoIosArrowUp size={35} />
                        ) : (
                            <IoIosArrowDown size={35} />
                        )}
                    </button>
                </div>
                {/* @ts-ignore */}
                {/* <Viewprofile bio={viewBio} /> */}
                <ViewBio biodata={viewBio} />
            </Drawer>

            {/* Filter Side Drawer */}
            <Drawer
                isOpen={showFilter}
                position="left"
                padding="p-0"
                widthClass="w-100"
                className="rounded-t-lg"
                showCloseBtn={false}
                onClose={() => setShowFilter(false)}
            >
                <Filter
                    onSave={() => setOnSave((prev) => prev + 1)}
                    filterKey={filter}
                    setModelKey={setModelKey}
                    setFilter={setFilter}
                    setShowfilter={setShowFilter}
                />
            </Drawer>

            {/* Model Filter Modal */}
            <Modal
                isOpen={!!modelKey}
                onClose={() => setModelKey("")}
                title={modelKey}
                size="lg"
            >
                {renderModelFilter(
                    modelKey,
                    setModelKey,
                    setFilter,
                    filter
                )}
            </Modal>
        </>
    );
}


