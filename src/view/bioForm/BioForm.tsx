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
import { useSelector } from "react-redux";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import { t } from "i18next";
import { useLocalization } from "../../hooks";
import { useTranslation } from "react-i18next";

const steps = [
    {
        label: t("steps.basicDetails"),
        fields: [
            { name: "personalDetails.fullName", label: t("fields.fullName"), placeholder: "Rahul Sharma", type: "text", required: true },
            { name: "personalDetails.gender", label: t("fields.gender"), placeholder: "Male", type: "select", required: true },
            { name: "personalDetails.dateOfBirth", label: t("fields.dateOfBirth"), placeholder: "YYYY-MM-DD", type: "date", required: true },
            { name: "personalDetails.maritalStatus", label: t("fields.maritalStatus"), placeholder: "Unmarried", type: "select", required: true },
            { name: "personalDetails.height", label: t("fields.height"), placeholder: "5'9\"", type: "select", required: true },
            { name: "personalDetails.disability", label: t("fields.disability"), placeholder: "None", type: "select", required: true },
            { name: "personalDetails.weight", label: t("fields.weight"), placeholder: "70 kg", type: "select", required: true },
            { name: "personalDetails.bloodGroup", label: t("fields.bloodGroup"), placeholder: "B+", type: "select", required: false },
            { name: "personalDetails.complexion", label: t("fields.complexion"), placeholder: "None", type: "select", required: false },
        ],
    },
    {
        label: t("steps.religiousDetails"),
        fields: [
            { name: "religiousDetails.caste", label: t("fields.caste"), placeholder: "Brahmin", type: "select", required: true },
            { name: "religiousDetails.subCaste", label: t("fields.subCaste"), placeholder: "Gaur", type: "text", required: true },
            { name: "religiousDetails.gotra", label: t("fields.gotra"), placeholder: "Vashishtha", type: "text", required: false },
            { name: "religiousDetails.manglik", label: t("fields.manglik"), placeholder: "Non-Manglik", type: "select", required: true },
            { name: "religiousDetails.nakshatra", label: t("fields.nakshatra"), placeholder: "Nakshatra", type: "select", required: false },
            { name: "religiousDetails.rashi", label: t("fields.rashi"), placeholder: "Rashi", type: "select", required: false },
        ],
    },
    {
        label: t("steps.familyDetails"),
        fields: [
            { name: "familyDetails.fatherName", label: t("fields.fatherName"), placeholder: "Mr. Suresh Sharma", type: "text", required: true },
            { name: "familyDetails.fatherOccupation", label: t("fields.fatherOccupation"), placeholder: "Retired Govt Officer", type: "text", required: false },
            { name: "familyDetails.motherName", label: t("fields.motherName"), placeholder: "Mrs. Sunita Sharma", type: "text", required: true },
            { name: "familyDetails.motherOccupation", label: t("fields.motherOccupation"), placeholder: "Homemaker", type: "text", required: false },
            { name: "familyDetails.brothers", label: t("fields.brothers"), placeholder: "2", type: "number", required: false },
            { name: "familyDetails.sisters", label: t("fields.sisters"), placeholder: "1", type: "number", required: false },
            { name: "familyDetails.marriedBrothers", label: t("fields.marriedBrothers"), placeholder: "1", type: "number", required: false },
            { name: "familyDetails.marriedSisters", label: t("fields.marriedSisters"), placeholder: "0", type: "number", required: false },
        ]
    },
    {
        label: t("steps.educationDetails"),
        fields: [
            { name: "educationDetails.highestQualification", label: t("fields.highestQualification"), placeholder: "B.Tech in Computer Science", type: "select", required: true },
            { name: "educationDetails.specialization", label: t("fields.specialization"), placeholder: "B.Tech in Computer Science", type: "text", required: false },
        ],
    },
    {
        label: t("steps.professionalDetails"),
        fields: [
            { name: "professionalDetails.jobType", label: t("fields.jobType"), placeholder: "Private", type: "select", required: true },
            { name: "professionalDetails.occupation", label: t("fields.occupation"), placeholder: "Software Developer", type: "select", required: true },
            { name: "professionalDetails.companyName", label: t("fields.companyName"), placeholder: "Infosys Ltd.", type: "text", required: false },
            { name: "professionalDetails.income", label: t("fields.income"), placeholder: "₹15,00,000", type: "select", required: true },
            { name: "professionalDetails.workingCity", label: t("fields.workingCity"), placeholder: "Bangalore", type: "text", required: true },
            { name: "professionalDetails.workFromHome", label: t("fields.workFromHome"), placeholder: "Yes/No", type: "select", required: false },
        ],
    },
    {
        label: t("steps.contactDetails"),
        fields: [
            { name: "contactDetails.mobileNo", label: t("fields.mobileNo"), placeholder: "+91-9876543210", type: "tel", required: true },
            { name: "contactDetails.whatsappNo", label: t("fields.whatsappNo"), placeholder: "+91-9876543210", type: "tel", required: true },
            { name: "contactDetails.email", label: t("fields.email"), placeholder: "rahul.sharma@example.com", type: "email", required: false },
            { name: "contactDetails.presentAddress.area", label: t("fields.presentAddress.area"), placeholder: "South Delhi", type: "text", required: true },
            { name: "contactDetails.presentAddress.city", label: t("fields.presentAddress.city"), placeholder: "New Delhi", type: "text", required: true },
            { name: "contactDetails.presentAddress.state", label: t("fields.presentAddress.state"), placeholder: "Delhi", type: "select", required: true },
            { name: "contactDetails.presentAddress.pinCode", label: t("fields.presentAddress.pinCode"), placeholder: "110016", type: "text", required: true },
            { name: "contactDetails.permanentAddress.area", label: t("fields.permanentAddress.area"), placeholder: "Najafgarh", type: "text", required: true },
            { name: "contactDetails.permanentAddress.city", label: t("fields.permanentAddress.city"), placeholder: "New Delhi", type: "text", required: true },
            { name: "contactDetails.permanentAddress.state", label: t("fields.permanentAddress.state"), placeholder: "Delhi", type: "select", required: true },
            { name: "contactDetails.permanentAddress.pinCode", label: t("fields.permanentAddress.pinCode"), placeholder: "110043", type: "text", required: true },
        ],
    },
    {
        label: t("steps.lifestyleHobbies"),
        fields: [
            { name: "lifestyleDetails.eatingHabits", label: t("fields.eatingHabits"), placeholder: "Vegetarian", type: "select", required: true },
            { name: "lifestyleDetails.smoking", label: t("fields.smoking"), placeholder: "No", type: "select", required: true },
            { name: "lifestyleDetails.drinking", label: t("fields.drinking"), placeholder: "No", type: "select", required: true },
        ],
    },
    {
        label: t("steps.partnerExpectations"),
        fields: [
            { name: "expectation.ageRange", label: t("fields.ageRange"), placeholder: "24-29", type: "text", required: false },
            { name: "expectation.heightRange", label: t("fields.heightRange"), placeholder: "5'2\" - 5'8\"", type: "select", required: false },
            { name: "expectation.income", label: t("fields.income"), placeholder: "₹1,00,000", type: "select", required: false },
            { name: "expectation.education", label: t("fields.education"), placeholder: "Graduate or above", type: "multiselect", required: false },
            { name: "expectation.occupation", label: t("fields.occupation"), placeholder: "Working professional preferred", type: "multiselect", required: false },
            { name: "expectation.jobType", label: t("fields.jobType"), placeholder: "Privet Goverment", type: "multiselect", required: false },
            { name: "expectation.locationPreference", label: t("fields.locationPreference"), placeholder: "Delhi NCR, Bangalore", type: "text", required: false },
            { name: "expectation.caste", label: t("fields.otherExpect"), placeholder: t("fields.locationPreference") + ", " + t("fields.income") + ", " + t("fields.smoking") + ", " + t("fields.drinking"), type: "textarea", required: false },
        ],
    },
    {
        label: t("steps.documents"),
        fields: [
            {
                name: "documents.verificationImage",
                label: t("fields.verificationImage"),
                type: "file",
                required: true
            },
            {
                name: "documents.profilePhotos[0]",
                label: t("fields.profilePhotos") + " 1 (Required)",
                type: "file",
                required: true
            },
            {
                name: "documents.profilePhotos[1]",
                label: t("fields.profilePhotos") + " 2",
                type: "file",
                required: false
            },
            {
                name: "documents.profilePhotos[2]",
                label: t("fields.profilePhotos") + " 3",
                type: "file",
                required: false
            }
        ]
    }
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

// const nameRegex = /^[\p{Devanagari}A-Za-z\s]+$/u;

const validationSchemas = [

    Yup.object({
        personalDetails: Yup.object({
            fullName: Yup
                .string()
                .required(t("validation.fullNameRequired"))
                .matches(nameRegex, t("validation.onlyLetters")),
            gender: Yup
                .string()
                // .oneOf(["Male", "Female", "Other"], t("validation.invalidGender"))
                .required(t("validation.genderRequired")),
            dateOfBirth: Yup.date().required(t("validation.dobRequired")),
            height: Yup.string().nullable(),
            weight: Yup.string().nullable(),
            bloodGroup: Yup.string().nullable(),
            complexion: Yup.string().nullable(),
            disability: Yup.string().nullable(),
            maritalStatus: Yup
                .string()
                .oneOf(["unmarried", "divorced", "widow", "widower", "separated", "remarriage"], t("validation.invalidMaritalStatus"))
                .required(t("validation.maritalStatusRequired")),
            children: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        religiousDetails: Yup.object({
            religion: Yup.string().nullable(),
            caste: Yup.string().required(t("validation.casteRequired")),
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
                .required(t("validation.fatherNameRequired"))
                .matches(nameRegex, t("validation.onlyLetters")),
            fatherOccupation: Yup.string().nullable(),
            motherName: Yup
                .string()
                .required(t("validation.motherNameRequired"))
                .matches(nameRegex, t("validation.onlyLetters")),
            motherOccupation: Yup.string().nullable(),
            sister: Yup.string().nullable(),
            brother: Yup.string().nullable(),
            marriedBrother: Yup.string().nullable(),
            marriedSister: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        educationDetails: Yup.object({
            highestQualification: Yup.string().required(t("validation.qualificationRequired")),
            specialization: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        professionalDetails: Yup.object({
            occupation: Yup.string().required(t("validation.occupationRequired")),
            companyName: Yup.string().nullable(),
            income: Yup.string().nullable(),
            workingCity: Yup.string().nullable(),
            jobType: Yup.string().required(t("validation.jobTypeRequired")),
            workFromHome: Yup.string().nullable().default("No"),
        }),
    }),

    Yup.object({
        contactDetails: Yup.object({
            mobileNo: Yup.string()
                .required(t("validation.mobileRequired"))
                .matches(/^[6-9]\d{9}$/, t("validation.mobileInvalid")),
            whatsappNo: Yup.string()
                .required(t("validation.whatsappRequired"))
                .matches(/^[6-9]\d{9}$/, t("validation.whatsappInvalid")),
            email: Yup.string().email(t("validation.emailInvalid")),
            presentAddress: Yup.object({
                area: Yup.string().required(t("validation.presentAreaRequired")),
                city: Yup.string().required(t("validation.presentCityRequired")),
                state: Yup.string().required(t("validation.presentStateRequired")),
                pinCode: Yup.string()
                    .required(t("validation.presentPinRequired"))
                    .matches(/^\d{6}$/, t("validation.pinInvalid")),
            }),
            permanentAddress: Yup.object({
                area: Yup.string().required(t("validation.permanentAreaRequired")),
                city: Yup.string().required(t("validation.permanentCityRequired")),
                state: Yup.string().required(t("validation.permanentStateRequired")),
                pinCode: Yup.string()
                    .required(t("validation.permanentPinRequired"))
                    .matches(/^\d{6}$/, t("validation.pinInvalid")),
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
            ageRange: Yup.string()
                    .matches(/^(\d{1,2})-(\d{1,2})$/, "Format should be like 24-29")
                    .test("min-max", "Min age must be less than max age", value => {
                        if (!value) return true;
                        const [min, max] = value.split("-").map(Number);
                        return min < max;
                    })
                    .notRequired(),
            heightRange: Yup.string().nullable(),
            income: Yup.string().nullable(),
            religion: Yup.string().nullable(),
            caste: Yup.string().nullable(),
            subCaste: Yup.string().nullable(),
            education: Yup.array().nullable(),
            occupation: Yup.array().nullable(),
            jobType: Yup.array().nullable(),
            locationPreference: Yup.string().nullable(),
        }),
    }),

    Yup.object({
        verificationImage: Yup.mixed().nullable(),
        profilePhotos: Yup.array()
            .of(Yup.mixed())
            .min(1, t("validation.photoRequired")),
    }),
];


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
        jobType: '',
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
        jobType: [],
        locationPreference: '',
    },
    documents: {
        verificationImage: '',
        profilePhotos: [],
    },
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

        "expectation.occupation": [
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
        "expectation.jobType": ["Government", "Private", "Business", "Freelance"],

        "professionalDetails.occupation": [
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
        "professionalDetails.jobType": ["Government", "Private", "Business", "Freelance"],
        "professionalDetails.workFromHome": ["Yes", "No"],
        "lifestyleDetails.eatingHabits": ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
        "lifestyleDetails.smoking": ["Yes", "No"],
        "lifestyleDetails.drinking": ["Yes", "No"],
    };

    // @ts-ignore
    return (optionsMap[name] || []).map((opt) => ({ label: opt, value: opt }));
};

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isFormComplet, seIsFormComplet] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const profile = useSelector((state: any) => state.matrimony?.profile?.data || {});
    const navigate = useNavigate();
    const [createProfile, { isLoading, isError, isSuccess, error }] = useCreateMatrimonyProfileMutation();
    const [updateMatrimonyProfile,
        {
            isLoading: updateLoading,
            isError: updateError,
            isSuccess: updateSuccess,
            error: updateErrorData,
        },
    ] = useUpdateMatrimonyProfileMutation();
    const { t } = useTranslation();


    // const profile = getMatrimony();
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const isProfilePresent = Object.entries(profile).length !== 0
    const isLastStep = step === steps.length - 1;
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
    // const optionsMap = useLocalization("options");

    const getOptionsForField = (name: string): { label: string; value: string }[] => {


        const keys = name.split(".");
        let current: any = t("options", { returnObjects: true }); // get full options tree
        for (const key of keys) {
            if (current && typeof current === "object" && key in current) {
                current = current[key];
            } else {
                return [];
            }
        }
        if (!current || typeof current !== "object") return [];

        return Object.entries(current).map(([value, label]) => ({
            value,
            label: String(label),
        }));
    }



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
        // for (const [key, val] of formData.entries()) {
        //     console.log("FormData >>", key, val);
        // }
        if (values?.personalDetails?.dateOfBirth) {
            formData.append('personalDetails.dateOfBirth', values?.personalDetails?.dateOfBirth);
        }

     
           
            let res;
            if (isProfilePresent) {
                res = await updateMatrimonyProfile({ id: profile._id, formData }).unwrap();
            } else {
                res = await createProfile(formData).unwrap();
            }
            if(res?.success){
                seIsFormComplet(true);
                ConfettiFireworks();
            }
            console.log("✅ Success", res);
       
            
        return res;
        
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
            <div className=" min-h-screen   grid grid-rows-[auto_1fr]  mx-auto   rounded-xl shadow-md">
                {/* <div className="fixed top-0  left-0"> */}
                <div className="flex flex-col   grid-cols-2 justify-between mb-2   px-4 bg-white">
                    <button onClick={handleBack} className="  mt-2 mb-[-0.8rem] " >
                        <GoArrowLeft  className="cursor-pointer" size={30} />
                    </button>
                    <FormProgess current={step + 1} total={steps.length} live={steps[step]?.label || ""} prev={steps[step - 1]?.label || ""} next={isLastStep ? 'Last ' : steps[step + 1]?.label} />
                    {/* <div className="text-sm text-gray-500">
                    Step {step + 1} of {steps.length}
                </div>
                <div className="w-8 h-8 rounded-full border-4  border-green-500 flex items-center justify-center">
                    {step + 1}
                </div> */}
                </div>
                {/* </div> */}



                <Formik
                    initialValues={!isProfilePresent ? initialValues : oldInitialValues}
                    validationSchema={validationSchemas[step]}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={async (values, actions) => {

                        const errors = await actions.validateForm();
                        console.log("Validation Errors:", errors); // 🛑 log this

                        if (Object.keys(errors).length > 0) {
                            //@ts-ignore
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
                            setIsSubmitting(true)
                            try {
                                await asyncHandlerWithSwal(() => handleSubmit(changes), {
                                    loadingHtml: "<b>Uploading your file...</b>",
                                    successHtml: "<b>successful!</b>",
                                errorHtml: "<b>Upload failed. Please try again.</b>",
                            });

                            } catch (error) {
                                console.error("Error uploading file:", error);
                            }finally {
                                setIsSubmitting(false)
                            }

                        }

                    }}
                >
                    <Form className="space-y-4  grid-cols-12 bg-white relative flex flex-col justify-between">
                        <div className="space-y-4  px-4 py-2  mb-16 md:grid md:grid-cols-2 gap-2">
                            <h2 className="text-lg font-semibold  col-span-full ">{steps[step].label}</h2>

                            {steps[step]?.fields?.map((field) => {
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

                            <div className={` ${isLastStep ? "" : "hidden"} w-full flex justify-between items-center flex-wrap gap-3`}>
                                {steps[step]?.fields.map((field, index) => {
                                    if (!field) return <></>;
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
                                            return <></>;
                                    }
                                })}
                            </div>


                        </div>

                        <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-2 shadow-[0_-8px_15px_-4px_rgba(0,0,0,0.1)]">
                            <button
                                type="submit"
                                disabled={isLastStep && isSubmitting}
                                className={`w-full bg_primary text-white py-2 rounded-lg transition flex items-center justify-center ${isLastStep && isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLastStep && isSubmitting ? (
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
                                        <span>Completing...</span>
                                    </>
                                ) : (
                                    <span>{isLastStep ? 'Complete Registration' : 'Continue'}</span>
                                )}
                            </button>
                        </div>


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
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 bg-white rounded-2xl  max-w-md w-full mx-auto text-center"
        >
            <div className="text-green-600 text-4xl mb-3">🎉</div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Congratulations!
            </h1>

            <p className="text-gray-600 text-sm sm:text-base">
                You’ve successfully completed your biodata setup.
            </p>

            <Link
                to="/bio-download"
                className="inline-block mt-6 px-6 py-2 bg_primary hover:bg-primary/90 text-white text-sm sm:text-base font-semibold rounded-lg transition"
            >
                Download Your Biodata
            </Link>
        </motion.div>
    );
};



export default MultiStepForm;
