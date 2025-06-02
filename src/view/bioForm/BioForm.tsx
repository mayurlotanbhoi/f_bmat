import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaUpload } from "react-icons/fa";
import { FileInput, Input, RangeInput, Select } from "../../components/forms/Inputs";
import FormProgess from "./FormProgess";
import { GoArrowLeft } from "react-icons/go";
import ConfettiFireworks from "../../components/Common/Fireworks/FullFireworks";
import Modal from "../../components/Common/Modal";
import { Link, useNavigate, } from "react-router-dom";
import { RadioGroup } from "../../components/forms/Inputs/RadioGroup";
import { Textarea } from "../../components/forms/Inputs/Textarea";
import { Checkbox } from "../../components/forms/Inputs/Checkbox";
import { useCreateMatrimonyProfileMutation } from "../../features/matrimony/matrimonyApi";
import { combineSlices } from "@reduxjs/toolkit";

const steps = [
    {
        label: "Basic Details",
        fields: [
            { name: "personalDetails.fullName", label: "Full Name", placeholder: "Rahul Sharma", type: "text", required: true },
            { name: "personalDetails.gender", label: "Gender", placeholder: "Male", type: "select", required: true },
            { name: "personalDetails.dateOfBirth", label: "Date of Birth", placeholder: "YYYY-MM-DD", type: "date", required: true },
            { name: "personalDetails.height", label: "Height", placeholder: "5'9\"", type: "select", required: true },
            { name: "personalDetails.weight", label: "Weight", placeholder: "70 kg", type: "select", required: true },
            { name: "personalDetails.bloodGroup", label: "Blood Group", placeholder: "B+", type: "select", required: false },
            { name: "personalDetails.disability", label: "Disability", placeholder: "None", type: "select", required: false },
            { name: "personalDetails.complexion", label: "Complexion", placeholder: "None", type: "select", required: false },
            { name: "personalDetails.maritalStatus", label: "Marital Status", placeholder: "None", type: "select", required: true },
        ],
    },
    {
        label: "Religious Details",
        fields: [
            { name: "religiousDetails.caste", label: "Caste", placeholder: "Brahmin", type: "text", required: true },
            { name: "religiousDetails.subCaste", label: "Sub Caste", placeholder: "Gaur", type: "text", required: true },
            { name: "religiousDetails.gotra", label: "Gotra", placeholder: "Vashishtha", type: "text", required: false },
            { name: "religiousDetails.manglik", label: "Manglik", placeholder: "Non-Manglik", type: "select", required: false },
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
            { name: "educationDetails.highestQualification", label: "Highest Qualification", placeholder: "B.Tech in Computer Science", type: "text", required: true },
            { name: "educationDetails.specialization", label: "Specialization", placeholder: "B.Tech in Computer Science", type: "text", required: false },

        ],
    },
    {
        label: "Professional Details",
        fields: [
            { name: "professionalDetails.occupation", label: "Occupation", placeholder: "Software Developer", type: "select", required: true },
            { name: "professionalDetails.companyName", label: "Company Name", placeholder: "Infosys Ltd.", type: "text", required: true },
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
            { name: "expectation.heightRange", label: "Expected Height Range", placeholder: "5'2\" - 5'8\"", type: "text", required: false },
            { name: "expectation.religion", label: "Expected Religion", placeholder: "Hindu", type: "text", required: false },
            { name: "expectation.caste", label: "Expected Caste", placeholder: "Brahmin", type: "text", required: false },
            { name: "expectation.education", label: "Expected Education", placeholder: "Graduate or above", type: "text", required: false },
            { name: "expectation.occupation", label: "Expected Occupation", placeholder: "Working professional preferred", type: "text", required: false },
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
                required: false
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

const validationSchemas = [

    Yup.object({
        personalDetails: Yup.object({
            fullName: Yup.string().required("Full Name is required"),
            gender: Yup.string().required("Gender is required"),
            dateOfBirth: Yup.string()
                .required("Date of Birth is required")
                .matches(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD"),

            height: Yup.string().required("Height is required"),
            weight: Yup.string().required("Weight is required"),
            bloodGroup: Yup.string().required("Blood Group is required"),
            disability: Yup.string().required("Disability info is required"),
        })
    }),

    Yup.object({
        religiousDetails: Yup.object({
            caste: Yup.string().required("Caste is required"),
            subCaste: Yup.string(),
            gotra: Yup.string(),
            manglik: Yup.string().required("Manglik field is required"),
            pujaPractices: Yup.string(),

        })
    }),

    Yup.object({
        familyDetails: Yup.object({
            fatherName: Yup.string().required("Father's Name is required"),
            fatherOccupation: Yup.string(),
            motherName: Yup.string().required("Mother's Name is required"),
            motherOccupation: Yup.string(),
            nativePlace: Yup.string(),
        })
    }),

    Yup.object({
        educationDetails: Yup.object({
            highestQualification: Yup.string().required("Highest Qualification is required"),
        })
    }),


    Yup.object({
        professionalDetails: Yup.object({
            occupation: Yup.string().required("Occupation is required"),
            companyName: Yup.string(),
            income: Yup.string().matches(
                /^₹?[\d,]+$/,
                "Enter a valid income format (e.g. ₹15,00,000)"
            ),
            workingCity: Yup.string().required("Working City is required"),
            workFromHome: Yup.string(),
        })
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
                .required("Email is required")
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
            eatingHabits: Yup.string().required("Diet is required"),
            smoking: Yup.string().required("Smoking info is required"),
            drinking: Yup.string().required("Drinking info is required"),
        })
    }),


    Yup.object({
        expectation: Yup.object({
            ageRange: Yup.string().required("Expected Age Range is required"),
            heightRange: Yup.string().required("Expected Height Range is required"),
            religion: Yup.string(),
            caste: Yup.string(),
            education: Yup.string(),
            occupation: Yup.string(),
            locationPreference: Yup.string(),
        })
    }),

    Yup.object({
        documents: Yup.object({
            aadhaarNo: Yup.string()
                .required("Aadhaar Number is required")
                .matches(/^\d{4}-\d{4}-\d{4}$/, "Aadhaar format: XXXX-XXXX-XXXX"),

            photo: Yup.string().required("Profile Photo is required"),
        })
    }),
]

const initialValues = {
    personalDetails: {
        fullName: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        height: '',
        weight: '',
        bloodGroup: '',
        complexion: '',
        bodyType: '',
        disability: '',
    },
    familyDetails: {
        fatherName: '',
        motherName: '',
        siblings: '',
    },
    educationDetails: {
        qualification: '',
        occupation: '',
        annualIncome: '',
    },
    contactDetails: {
        mobile: '',
        email: '',
        address: '',
    },
    partnerPreferences: {
        ageRange: '',
        heightRange: '',
        caste: '',
    },
    documents: {
    },
};




const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isFormComplet, seIsFormComplet] = useState(false);
    const [createProfile, { isLoading, isError, isSuccess, error }] = useCreateMatrimonyProfileMutation();

    const navigate = useNavigate();

    const isLastStep = step === steps.length - 1;
    console.log("validationSchemas", validationSchemas[step])

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
            "religiousDetails.rashi": ["Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)", "Karka (Cancer)", "Singh (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchik (Scorpio)", "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbh (Aquarius)", "Meen (Pisces)",],
            "religiousDetails.nakshatra": ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
            "professionalDetails.occupation": ["Government", "Private", "Business", "Freelance"],
            "professionalDetails.workFromHome": ["Yes", "No"],
            "lifestyleDetails.eatingHabits": ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
            "lifestyleDetails.smoking": ["Yes", "No"],
            "lifestyleDetails.drinking": ["Yes", "No"],
        };

        // @ts-ignore
        return (optionsMap[name] || []).map((opt) => ({ label: opt, value: opt }));
    };

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

        try {
            const res = await createProfile(formData).unwrap();
            console.log("✅ Success", res);
        } catch (err) {
            const message = err?.data?.message || "Something went wrong";
            console.error("❌ Error", message);
        }
    };






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
                    initialValues={initialValues}
                    // validationSchema={validationSchemas[step]}
                    onSubmit={(values, actions) => {


                        if (!isLastStep) {
                            handleNext(); // move to next step
                            actions.setTouched({});
                        } else {
                            console.log("Final submit:", values);
                            handleSubmit(values);
                            seIsFormComplet(true);
                            alert(JSON.stringify(values, null, 2));
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

                                    case "date":
                                        return (
                                            <Input
                                                key={field.name}
                                                type="date"
                                                name={field.name}
                                                label={field.label}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                            />
                                        );

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
                                <div className=" w-full flex justify-between items-center flex-wrap gap-3">

                                    {steps[step].fields.map((field) => {
                                        switch (field.type) {
                                            case "file":
                                                return (
                                                    <FileInput
                                                        key={field.name}

                                                        name={field.name}
                                                        label={field.label}
                                                        required={field.required}

                                                    />
                                                )


                                        }
                                    })}

                                    {/* <div className="text-gray-400 flex justify-center mb-2">
                                        <FaUpload size={24} />
                                    </div>
                                    <input type="file" className="hidden" id="upload" />
                                    <label
                                        htmlFor="upload"
                                        className="cursor-pointer inline-block px-4 py-2 bg-orange-500 text-white rounded"
                                    >
                                        Browse
                                    </label> */}
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
