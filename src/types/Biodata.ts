// types/Biodata.ts

export interface Address {
    addressLine: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}

export interface Sibling {
    name: string;
    married: boolean;
    occupation: string;
}

export interface Education {
    degree: string;
    board?: string;
    yearOfPassing: number;
    institute?: string;
    specialization?: string;
}

export interface Biodata {
    personalDetails: {
        fullName: string;
        gender: string;
        dateOfBirth: string;
        age: number;
        height: string;
        weight: string;
        bloodGroup: string;
        complexion: string;
        bodyType: string;
        disability: string;
        maritalStatus: string;
    };
    religiousDetails: {
        religion: string;
        caste: string;
        subCaste: string;
        gotra: string;
        manglik: string;
        pujaPractices: string;
        horoscopeRequired: boolean;
        nakshatra: string;
        rashi: string;
    };
    contactDetails: {
        mobileNo: string;
        whatsappNo: string;
        email: string;
        presentAddress: Address;
        permanentAddress: Address;
    };
    familyDetails: {
        fatherName: string;
        fatherOccupation: string;
        motherName: string;
        motherOccupation: string;
        siblings: {
            brothers: Sibling[];
            sisters: Sibling[];
        };
        familyType: string;
        familyStatus: string;
        nativePlace: string;
    };
    educationDetails: {
        highestQualification: string;
        education: Education[];
    };
    professionalDetails: {
        occupation: string;
        companyName: string;
        income: string;
        workingCity: string;
        jobType: string;
        workFromHome: boolean;
    };
    lifestyleDetails: {
        diet: string;
        smoking: string;
        drinking: string;
        hobbies: string[];
        sports: string[];
    };
    expectation: {
        ageRange: string;
        heightRange: string;
        religion: string;
        caste: string;
        education: string;
        occupation: string;
        locationPreference: string;
    };
}
