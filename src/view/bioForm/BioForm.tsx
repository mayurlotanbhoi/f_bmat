import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { DateTimeInput, FileInput, Input, MultiSelect, Select } from "../../components/forms/Inputs";
import FormProgess from "./FormProgess";
import { GoArrowLeft } from "react-icons/go";
import ConfettiFireworks from "../../components/Common/Fireworks/FullFireworks";
import Modal from "../../components/Common/Modal";
import { Link, useNavigate, } from "react-router-dom";
import { RadioGroup } from "../../components/forms/Inputs/RadioGroup";
import { Textarea } from "../../components/forms/Inputs/Textarea";
import { Checkbox } from "../../components/forms/Inputs/Checkbox";
import { useCreateMatrimonyProfileMutation, useUpdateMatrimonyProfileMutation } from "../../features/matrimony/matrimonyApi";
import { getMatrimony } from "../../features/matrimony/matrimonySlice";
import { asyncHandlerWithSwal } from "../../util/asyncHandler";
import { nameRegex, pinCodeRegex } from "../../constant/regexPatterns";

const steps = [
    {
        label: "Basic Details",
        fields: [
            { name: "personalDetails.fullName", label: "Full Name", placeholder: "Rahul Sharma", type: "text", required: true },
            { name: "personalDetails.gender", label: "Gender", placeholder: "Male", type: "select", required: true },
            { name: "personalDetails.dateOfBirth", label: "Date of Birth", placeholder: "YYYY-MM-DD", type: "date", required: true },
            { name: "personalDetails.maritalStatus", label: "Marital Status", placeholder: "Unmarried", type: "select", required: true },
            { name: "personalDetails.height", label: "Height", placeholder: "5'9\"", type: "select", required: true },
            { name: "personalDetails.disability", label: "Disability", placeholder: "None", type: "select", required: true },
            { name: "personalDetails.weight", label: "Weight", placeholder: "70 kg", type: "select", required: true },
            { name: "personalDetails.bloodGroup", label: "Blood Group", placeholder: "B+", type: "select", required: false },
            { name: "personalDetails.complexion", label: "Complexion", placeholder: "None", type: "select", required: false },
        ],
    },
    {
        label: "Religious Details",
        fields: [
            { name: "religiousDetails.caste", label: "Caste", placeholder: "Brahmin", type: "select", required: true },
            { name: "religiousDetails.subCaste", label: "Sub Caste", placeholder: "Gaur", type: "text", required: true },
            { name: "religiousDetails.gotra", label: "Gotra", placeholder: "Vashishtha", type: "text", required: false },
            { name: "religiousDetails.manglik", label: "Manglik", placeholder: "Non-Manglik", type: "select", required: true },
            { name: "religiousDetails.nakshatra", label: "Nakshatra", placeholder: "Nakshatra", type: "select", required: false },
            { name: "religiousDetails.rashi", label: "Rashi", placeholder: "Rashi", type: "select", required: false },
        ],
    },
    {
        label: "Family Details",
        fields: [
            { name: "familyDetails.fatherName", label: "Father's Name", placeholder: "Mr. Suresh Sharma", type: "text", required: true },
            { name: "familyDetails.fatherOccupation", label: "Father's Occupation", placeholder: "Retired Govt Officer", type: "text", required: false },
            { name: "familyDetails.motherName", label: "Mother's Name", placeholder: "Mrs. Sunita Sharma", type: "text", required: true },
            { name: "familyDetails.motherOccupation", label: "Mother's Occupation", placeholder: "Homemaker", type: "text", required: false },
            { name: "familyDetails.brothers", label: "Brothers", placeholder: "2", type: "number", required: false },
            { name: "familyDetails.sisters", label: "Sisters", placeholder: "1", type: "number", required: false },
            { name: "familyDetails.marriedBrothers", label: "Married Brothers", placeholder: "1", type: "number", required: false },
            { name: "familyDetails.marriedSisters", label: "Married Sisters", placeholder: "0", type: "number", required: false },
        ]
    },
    {
        label: "Education Details",
        fields: [
            { name: "educationDetails.highestQualification", label: "Highest Qualification", placeholder: "B.Tech in Computer Science", type: "select", required: true },
            { name: "educationDetails.specialization", label: "Specialization", placeholder: "B.Tech in Computer Science", type: "text", required: false },

        ],
    },
    {
        label: "Professional Details",
        fields: [
            { name: "professionalDetails.occupation", label: "Occupation", placeholder: "Software Developer", type: "select", required: true },
            { name: "professionalDetails.companyName", label: "Company Name", placeholder: "Infosys Ltd.", type: "text", required: false },
            { name: "professionalDetails.income", label: "Annual Income", placeholder: "₹15,00,000", type: "text", required: true },
            { name: "professionalDetails.workingCity", label: "Working City", placeholder: "Bangalore", type: "text", required: true },
            // { name: "professionalDetails.jobType", label: "Job Type", placeholder: "Private", type: "select", required: false },
            { name: "professionalDetails.workFromHome", label: "Work From Home", placeholder: "Yes/No", type: "select", required: false },
        ],
    },
    {
        label: "Contact Details",
        fields: [
            { name: "contactDetails.mobileNo", label: "Mobile Number", placeholder: "+91-9876543210", type: "tel", required: true },
            { name: "contactDetails.whatsappNo", label: "WhatsApp Number", placeholder: "+91-9876543210", type: "tel", required: true },
            { name: "contactDetails.email", label: "Email ID", placeholder: "rahul.sharma@example.com", type: "email", required: false },
            { name: "contactDetails.presentAddress.area", label: "Present Area", placeholder: "South Delhi", type: "text", required: true },
            { name: "contactDetails.presentAddress.city", label: "Present City", placeholder: "New Delhi", type: "text", required: true },
            { name: "contactDetails.presentAddress.state", label: "Present State", placeholder: "Delhi", type: "text", required: true },
            { name: "contactDetails.presentAddress.pinCode", label: "Present Pincode", placeholder: "110016", type: "text", required: true },
            { name: "contactDetails.permanentAddress.area", label: "Permanent Area", placeholder: "Najafgarh", type: "text", required: true },
            { name: "contactDetails.permanentAddress.city", label: "Permanent City", placeholder: "New Delhi", type: "text", required: true },
            { name: "contactDetails.permanentAddress.state", label: "Permanent State", placeholder: "Delhi", type: "text", required: true },
            { name: "contactDetails.permanentAddress.pinCode", label: "Permanent Pincode", placeholder: "110043", type: "text", required: true },
        ],
    },
    {
        label: "Lifestyle & Hobbies",
        fields: [
            { name: "lifestyleDetails.eatingHabits", label: "Diet", placeholder: "Vegetarian", type: "select", required: true },
            { name: "lifestyleDetails.smoking", label: "Smoking", placeholder: "No", type: "select", required: true },
            { name: "lifestyleDetails.drinking", label: "Drinking", placeholder: "No", type: "select", required: true },
        ],
    },
    {
        label: "Partner Expectations",
        fields: [
            { name: "expectation.ageRange", label: "Expected Age Range", placeholder: "24-29", type: "text", required: false },
            { name: "expectation.heightRange", label: "Expected Height Range", placeholder: "5'2\" - 5'8\"", type: "select", required: false },
            { name: "expectation.income", label: "Expected Annual Min Income", placeholder: "₹1,00,000", type: "select", required: false }, // Add a placeholder for the expected annual income", label: "Expected Religion", placeholder: "Hindu", type: "text", required: false },
            { name: "expectation.caste", label: "Expected Caste", placeholder: "Brahmin", type: "text", required: false },
            { name: "expectation.education", label: "Expected Education", placeholder: "Graduate or above", type: "multiselect", required: false },
            { name: "expectation.occupation", label: "Expected Occupation", placeholder: "Working professional preferred", type: "multiselect", required: false },
            { name: "expectation.locationPreference", label: "Location Preference", placeholder: "Delhi NCR, Bangalore", type: "text", required: false },
        ],
    },
    {
        label: "Documents",
        fields: [
            {
                name: "documents.verificationImage",
                label: "Document Verification ID",
                type: "file",
                required: true
            },
            {
                name: "documents.profilePhotos[0]",
                label: "Profile Photo 1 (Required)",
                type: "file",
                required: true
            },
            {
                name: "documents.profilePhotos[1]",
                label: "Profile Photo 2",
                type: "file",
                required: false
            },
            {
                name: "documents.profilePhotos[2]",
                label: "Profile Photo 3",
                type: "file",
                required: false
            }
        ]

    },
];

const addressSchema = Yup.object({
    // addressLine: Yup.string().required("Address Line is required"),
    area: Yup.string().required("Area is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().nullable(),
    pinCode: Yup
        .string()
        .required("Pin Code is required")
        .matches(pinCodeRegex, "Invalid Pin Code format"),
});

const validationSchemas = [

    Yup.object({
        personalDetails: Yup.object({
            fullName: Yup
                .string()
                .required("Full name is required")
                .matches(nameRegex, "Only letters and spaces allowed"),
            gender: Yup
                .string()
                .oneOf(["Male", "Female", "Other"], "Invalid gender")
                .required("Gender is required"),
            dateOfBirth: Yup.date().required("Date of birth is required"),
            height: Yup.string().nullable(),
            weight: Yup.string().nullable(),
            bloodGroup: Yup.string().nullable(),
            complexion: Yup.string().nullable(),
            disability: Yup.string().nullable(),
            maritalStatus: Yup
                .string()
                .oneOf(["Unmarried", "Married", "Divorced", "Widowed"], "Invalid marital status")
                .required("Marital status is required"),
            children: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        religiousDetails: Yup.object({
            religion: Yup.string().nullable(),
            caste: Yup.string().required("Caste is required"),
            subCaste: Yup.string().nullable(),
            gotra: Yup.string().nullable(),
            manglik: Yup.string().nullable(),
            nakshatra: Yup.string().nullable(),
            rashi: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        familyDetails: Yup.object({
            fatherName: Yup
                .string()
                .required("Father's name is required")
                .matches(nameRegex, "Only letters and spaces allowed"),
            fatherOccupation: Yup.string().nullable(),
            motherName: Yup
                .string()
                .required("Mother's name is required")
                .matches(nameRegex, "Only letters and spaces allowed"),
            motherOccupation: Yup.string().nullable(),
            sister: Yup.string().nullable(),
            brother: Yup.string().nullable(),
            marriedBrother: Yup.string().nullable(),
            marriedSister: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        educationDetails: Yup.object({
            highestQualification: Yup.string().required("Qualification is required"),
            specialization: Yup.string().nullable(),
        }),
    }),


    Yup.object({
        professionalDetails: Yup.object({
            occupation: Yup.string().required("Occupation is required"),
            companyName: Yup.string().nullable(),
            income: Yup.string().nullable(),
            workingCity: Yup.string().nullable(),
            jobType: Yup.string().nullable(),
            workFromHome: Yup.string().nullable().default('No'),
        }),
    }),

    Yup.object({
        contactDetails: Yup.object({
            mobileNo: Yup.string()
                .required("Mobile Number is required")
                .matches(/^[6-9]\d{9}$/, "Enter valid Indian mobile number"),
            whatsappNo: Yup.string()
                .required("WhatsApp Number is required")
                .matches(/^[6-9]\d{9}$/, "Enter valid WhatsApp number"),
            email: Yup.string()
                .email("Invalid email format"),
            presentAddress: Yup.object({
                area: Yup.string().required("Present Area is required"),
                city: Yup.string().required("Present City is required"),
                state: Yup.string().required("Present State is required"),
                pinCode: Yup.string()
                    .required("Present Pincode is required")
                    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
            }),
            permanentAddress: Yup.object({
                area: Yup.string().required("Permanent Area is required"),
                city: Yup.string().required("Permanent City is required"),
                state: Yup.string().required("Permanent State is required"),
                pinCode: Yup.string()
                    .required("Permanent Pincode is required")
                    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
            }),
        })
    }),


    Yup.object({
        lifestyleDetails: Yup.object({
            smoking: Yup.string().nullable(),
            drinking: Yup.string().nullable(),
            eatingHabits: Yup.string().nullable(),
        }),
    }),


    Yup.object({
        expectation: Yup.object({
            ageRange: Yup.string().nullable(),
            heightRange: Yup.string().nullable(),
            income: Yup.string().nullable(),
            religion: Yup.string().nullable(),
            caste: Yup.string().nullable(),
            subCaste: Yup.string().nullable(),
            education: Yup.array().nullable(),
            occupation: Yup.array().nullable(),
            locationPreference: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        verificationImage: Yup.mixed().nullable(),
        profilePhotos: Yup.array()
            .of(Yup.mixed())
            .min(1, "At least one profile photo is required"),
    }),
]

const initialValues = {
    personalDetails: {
        fullName: '',
        gender: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        bloodGroup: '',
        complexion: '',
        disability: '',
        maritalStatus: '',
    },
    religiousDetails: {
        caste: '',
        subCaste: '',
        gotra: '',
        manglik: '',
        nakshatra: '',
        rashi: ''
    },
    familyDetails: {
        fatherName: '',
        motherName: '',
        siblings: '',
    },
    educationDetails: {
        highestQualification: '',
        specialization: '',

    },
    professionalDetails: {
        occupation: '',
        companyName: '',
        income: '',
        workingCity: '',
        workFromHome: 'No',
    },
    contactDetails: {
        mobileNo: '',
        whatsappNo: '',
        email: '',
        presentAddress: {
            area: '',
            city: '',
            state: '',
            pinCode: '',
        },
        permanentAddress: {
            area: '',
            city: '',
            state: '',
            pinCode: '',
        },
    },
    lifestyleDetails: {
        eatingHabits: '',
        smoking: '',
        drinking: '',
    },
    expectation: {
        ageRange: '',
        heightRange: '',
        subCaste: 'NA',
        religion: "NA",
        income: '',
        caste: '',
        education: [],
        occupation: [],
        locationPreference: '',
    },
    documents: {
        verificationImage: '',
        profilePhotos: [],
    },
};

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isFormComplet, seIsFormComplet] = useState(false);
    const [createProfile, { isLoading, isError, isSuccess, error }] = useCreateMatrimonyProfileMutation();
    const [updateMatrimonyProfile,
        {
            isLoading: updateLoading,
            isError: updateError,
            isSuccess: updateSuccess,
            error: updateErrorData,
        },
    ] = useUpdateMatrimonyProfileMutation();


    const navigate = useNavigate();
    const profile = getMatrimony();
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const isProfilePresent = Object.entries(profile).length !== 0
    const isLastStep = step === steps.length - 1;
    console.log("validationSchemas", validationSchemas[step])
    console.log("profile", profile)

    const { personalDetails, religiousDetails, familyDetails, educationDetails, professionalDetails, contactDetails, lifestyleDetails, expectation } = profile
    const oldInitialValues = {
        ...initialValues,
        personalDetails, religiousDetails, familyDetails, educationDetails, professionalDetails, contactDetails, lifestyleDetails, expectation
    }


    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => {
        console.log(step === 0)
        if (step === 0) {
            navigate(-1);
        } else {
            setStep((prev) => Math.max(prev - 1, 0));
        }
    };

    const getOptionsForField = (name: string): { label: string; value: string }[] => {
        const optionsMap = {
            "personalDetails.gender": ["Male", "Female", "Other"],
            "personalDetails.bloodGroup": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            "personalDetails.maritalStatus": ["Unmarried", "Divorced", "Widow", "Widower", "Separated", "Remarriage",],
            "personalDetails.complexion": ["Very Fair", "Fair", "Wheatish", "Wheatish Brown", "Dark",],
            "personalDetails.disability": ["None", "Physically Challenged", "Visually Challenged", "Hearing Impaired", "Others",],
            "personalDetails.weight": ["30-40 kg", "40-50 kg", "51-60 kg", "61-70 kg", "71-80 kg", "81-90 kg", "91+ kg",],
            "personalDetails.height": ["Below 4ft", "4ft - 4ft 5in", "4ft 6in - 5ft", "5ft 1in - 5ft 5in", "5ft 6in - 6ft", "Above 6ft",],
            "religiousDetails.manglik": ["Manglik", "Non-Manglik", "Don't Know"],
            "religiousDetails.caste": ["Bhoi", "Raj Bhoi", "Jhinga Bhoi", "Pardeshi Bhoi", "Kahar Bhoi", "Godiya Kahar Bhoi", "Dhuriya Kahar Bhoi", "Maji Kahar Bhoi", "Kirat Bhoi", "Machhua Bhoi", "Maji Bhoi", "Jaliya Bhoi", "Kevat Bhoi", "Dhivar Bhoi", "Dhivar Bhoi", "Dhimar Bhoi", "Palewar Bhoi",
                "Navadi Bhoi", "Machhedra Bhoi", "Malhar Bhoi", "Malhava Bhoi", "Boi (Bhujari)", "Gadhav Bhoi", "Khadi Bhoi", "Khare Bhoi", "Dhevra Bhoi"],
            "religiousDetails.rashi": ["Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)", "Karka (Cancer)", "Singh (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchik (Scorpio)", "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbh (Aquarius)", "Meen (Pisces)",],
            "religiousDetails.nakshatra": ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
            "educationDetails.highestQualification": [
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
            "expectation.heightRange": ["Below 4ft", "4ft - 4ft 5in", "4ft 6in - 5ft", "5ft 1in - 5ft 5in", "5ft 6in - 6ft", "Above 6ft",],

            "expectation.occupation": ["Government", "Private", "Business", "Freelance"],
            "expectation.income": [
                10000, 15000, 20000, 25000, 30000,
                35000, 40000, 45000, 50000, 60000,
                70000, 80000, 90000, 100000, 120000,
                140000, 160000, 180000, 200000, 225000,
                250000, 275000, 300000, 325000, 350000,
                375000, 400000, 425000, 450000, 475000,
                500000
            ],
            "expectation.education": [
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

            "professionalDetails.occupation": ["Government", "Private", "Business", "Freelance"],

            "professionalDetails.workFromHome": ["Yes", "No"],
            "lifestyleDetails.eatingHabits": ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
            "lifestyleDetails.smoking": ["Yes", "No"],
            "lifestyleDetails.drinking": ["Yes", "No"],
        };

        // @ts-ignore
        return (optionsMap[name] || []).map((opt) => ({ label: opt, value: opt }));
    };

    console.log('!isProfilePresent ? initialValues : oldInitialValues', !isProfilePresent ? initialValues : oldInitialValues)

    const handleSubmit = async (values) => {
        const formData = new FormData();

        // Flatten all non-file fields recursively
        const appendFormData = (data, parentKey = "") => {
            if (data && typeof data === "object" && !(data instanceof File)) {
                if (Array.isArray(data)) {
                    data.forEach((item, index) => {
                        // ✅ Use dot notation for nested arrays
                        appendFormData(item, `${parentKey}.${index}`);
                    });
                } else {
                    Object.entries(data).forEach(([key, value]) => {
                        const formKey = parentKey ? `${parentKey}.${key}` : key;
                        appendFormData(value, formKey);
                    });
                }
            } else if (data !== undefined && data !== null) {
                formData.append(parentKey, data);
            }
        };

        // Clone and remove file fields before flattening
        const dataCopy = structuredClone(values);
        delete dataCopy.documents?.profilePhotos;
        delete dataCopy.documents?.verificationImage;

        appendFormData(dataCopy);

        // const chnagedImageIndex = []
        // ✅ Add images
        if (Array.isArray(values.documents?.profilePhotos)) {
            values.documents.profilePhotos.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append("images", file);
                    formData.append(`imageIndexes`, String(index)); // Name must match multer.fields()
                }
            });
        }

        // ✅ Add verification image
        if (values.documents?.verificationImage instanceof File) {
            formData.append("verificationImage", values.documents.verificationImage); // Must match multer.fields()
        }

        // 🧪 Optional debug log
        for (const [key, val] of formData.entries()) {
            console.log("FormData >>", key, val);
        }
        if (values?.personalDetails?.dateOfBirth) {
            formData.append('personalDetails.dateOfBirth', values?.personalDetails?.dateOfBirth);
        }

        try {
            let res;
            if (isProfilePresent) {
                res = await updateMatrimonyProfile({ id: profile._id, formData }).unwrap();
            } else {
                res = await createProfile(formData).unwrap();
            }
            console.log("✅ Success", res);
        } catch (err) {
            const message = err?.data?.message || "Something went wrong";
            console.error("❌ Error", message);
        }
    };



    function getChangedFields(initial: any, current: any): any {
        const changes: any = {};

        for (const key in current) {
            const curVal = current[key];
            const initVal = initial?.[key];

            // Handle File object
            if (curVal instanceof File) {
                changes[key] = curVal;
                continue;
            }

            // Handle nested object (excluding Date, Array)
            if (
                typeof curVal === 'object' &&
                curVal !== null &&
                !Array.isArray(curVal)
            ) {
                // Handle Date objects (compare timestamps)
                if (
                    curVal instanceof Date ||
                    (typeof initVal === 'string' && !isNaN(Date.parse(initVal)))
                ) {
                    const curDate = new Date(curVal);
                    const initDate = new Date(initVal);
                    if (curDate.getTime() !== initDate.getTime()) {
                        changes[key] = curVal;
                    }
                } else {
                    const nested = getChangedFields(initVal || {}, curVal);
                    if (Object.keys(nested).length > 0) {
                        changes[key] = nested;
                    }
                }
                continue;
            }

            // Handle arrays (especially file arrays or value changed)
            if (Array.isArray(curVal)) {
                const hasFile = curVal.some((item) => item instanceof File);
                if (
                    hasFile ||
                    JSON.stringify(curVal) !== JSON.stringify(initVal)
                ) {
                    changes[key] = curVal;
                }
                continue;
            }

            // Handle date strings
            if (
                typeof curVal === 'string' &&
                typeof initVal === 'string' &&
                !isNaN(Date.parse(curVal)) &&
                !isNaN(Date.parse(initVal))
            ) {
                if (new Date(curVal).getTime() !== new Date(initVal).getTime()) {
                    changes[key] = curVal;
                }
                continue;
            }

            // Fallback: direct primitive comparison
            if (curVal !== initVal) {
                changes[key] = curVal;
            }
        }

        return changes;
    }


    return (
        <>
            <div className="max-w-md min-h-screen grid grid-rows-[auto_1fr]  mx-auto   rounded-xl shadow-md">
                <div className="flex flex-col  grid-cols-2 justify-between mb-2   px-4 bg-white">
                    <button className="  mt-2 mb-[-0.8rem] " >
                        <GoArrowLeft onClick={handleBack} className="cursor-pointer" size={30} />
                    </button>
                    <FormProgess current={step + 1} total={steps.length} live={steps[step]?.label || ""} prev={steps[step - 1]?.label || ""} next={isLastStep ? 'Last ' : steps[step + 1]?.label} />
                    {/* <div className="text-sm text-gray-500">
                    Step {step + 1} of {steps.length}
                </div>
                <div className="w-8 h-8 rounded-full border-4  border-green-500 flex items-center justify-center">
                    {step + 1}
                </div> */}
                </div>



                <Formik
                    initialValues={!isProfilePresent ? initialValues : oldInitialValues}
                    validationSchema={validationSchemas[step]}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={async (values, actions) => {

                        const errors = await actions.validateForm();
                        console.log("Validation Errors:", errors); // 🛑 log this

                        if (Object.keys(errors).length > 0) {
                            actions.setTouched(errors); // show errors on UI
                            return; // block submission
                        }
                        console.log("values", values);

                        if (!isLastStep) {
                            handleNext(); // move to next step
                            actions.setTouched({});
                        } else {
                            console.log("Final submit:", values);
                            const changes = getChangedFields(!isProfilePresent ? initialValues : oldInitialValues, values);
                            // handleSubmit(values);
                            console.log("changes", changes);
                            await asyncHandlerWithSwal(() => handleSubmit(changes), {
                                loadingHtml: "<b>Uploading your file...</b>",
                                successHtml: "<b>Upload successful!</b>",
                                errorHtml: "<b>Upload failed. Please try again.</b>",
                            });
                            seIsFormComplet(true);
                            // alert(JSON.stringify(values, null, 2));
                            ConfettiFireworks();
                        }

                    }}
                >
                    <Form className="space-y-4 p-4 grid-cols-10 bg-white relative flex flex-col justify-between">
                        <div className="space-y-4 mb-10">
                            <h2 className="text-lg font-semibold p-4">{steps[step].label}</h2>

                            {steps[step].fields.map((field) => {
                                switch (field.type) {
                                    case "select":
                                        return (
                                            <Select
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                // @ts-ignore
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                options={getOptionsForField(field.name)}
                                            />
                                        );
                                    case "multiselect":
                                        return (
                                            <MultiSelect
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                options={getOptionsForField(field.name)}
                                            />
                                        );

                                    case "date":
                                        return (
                                            <DateTimeInput
                                                key={field.name}
                                                label={field.label}
                                                name={field.name}
                                                type="datetime"
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                minDate={new Date(1900, 0, 1)}
                                                maxDate={eighteenYearsAgo}
                                            />
                                        )

                                    case "file":
                                        return (

                                            <></>
                                            // <FileInput
                                            //     key={field.name}

                                            //     name={field.name}
                                            //     label={field.label}
                                            //     required={field.required}

                                            // />

                                            // <input
                                            //     key={field.name}
                                            //     type="file"
                                            //     name={field.name}
                                            //     required={field.required}
                                            //     className="w-full border p-2 rounded"
                                            // />
                                        );

                                    // case "date":
                                    //     return (
                                    //         <Input
                                    //             key={field.name}
                                    //             type="date"
                                    //             name={field.name}
                                    //             label={field.label}
                                    //             placeholder={field.placeholder}
                                    //             required={field.required}
                                    //         />
                                    //     );

                                    case "radio":
                                        return (
                                            <RadioGroup
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                // @ts-ignore
                                                options={field.options}
                                                required={field.required}
                                            />
                                        );

                                    case "textarea":
                                        return (
                                            <Textarea
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                            />
                                        );

                                    case "checkbox":
                                        return (
                                            <Checkbox
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                required={field.required}
                                            />
                                        );

                                    default:
                                        return (
                                            <Input
                                                key={field.name}
                                                type={field.type}
                                                name={field.name}
                                                label={field.label}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                            />
                                        );
                                }
                            })}


                            {isLastStep && (
                                <div className="w-full flex justify-between items-center flex-wrap gap-3">
                                    {steps[step]?.fields.map((field, index) => {
                                        if (!field) return null;
                                        console.log("field", field);

                                        switch (field.type) {
                                            case "file":
                                                if (field.name === "documents.verificationImage") {
                                                    return (
                                                        <FileInput
                                                            key={field.name}
                                                            old={isProfilePresent ? profile?.verificationImage : ""}
                                                            name={field.name}
                                                            label={field.label}
                                                            required={field.required}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <FileInput
                                                            key={field.name + index}
                                                            old={isProfilePresent ? profile?.profilePhotos?.[index - 1] : ""}
                                                            name={field.name}
                                                            label={field.label}
                                                            required={field.required}
                                                        />
                                                    );
                                                }

                                            // You can add more field types here if needed

                                            default:
                                                return null;
                                        }
                                    })}
                                </div>
                            )}

                        </div>

                        <button
                            type="submit"
                            className="fixed bottom-2 left-2 right-2 bg_primary text-white py-2 rounded-lg transition"
                        >
                            {isLastStep ? "Complete Registration" : "Continue"}
                        </button>
                    </Form>
                </Formik>


            </div>

            <Modal
                isOpen={isFormComplet}
                onClose={() => seIsFormComplet(false)}
                title={""}
                size="lg"
            > <><BioCompletModel /></></Modal>

        </>
    );
};

const BioCompletModel = () => {


    return (
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-2">🎉 Congratulations!</h1>
            <p className="text-gray-600 text-md">You’ve successfully completed your bio setup.</p>

            <Link to={"/"} className=" btn gont secondary-btn mt-4">Home</Link>
        </div>
    );
};

export default MultiStepForm;
