import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Props {
    user: any; // replace `any` with actual type if available
}

export default function UserProfileCard({ user }: Props) {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="w-full max-w-md mx-auto py-4">
            <ProfileSection
                title="Personal Details"
                isOpen={openSection === 'personal'}
                onToggle={() => toggleSection('personal')}
                data={[
                    { label: 'Full Name', value: user.personalDetails?.fullName || '*****' },
                    { label: 'Gender', value: user.personalDetails?.gender || '*****' },
                    { label: 'DOB', value: formatDate(user.personalDetails?.dateOfBirth) },
                    { label: 'Height', value: user.personalDetails?.height || '*****' },
                    { label: 'Weight', value: user.personalDetails?.weight || '*****' },
                    { label: 'Blood Group', value: user.personalDetails?.bloodGroup || '*****' },
                    { label: 'Disability', value: user.personalDetails?.disability || '*****' },
                    { label: 'Marital Status', value: user.personalDetails?.maritalStatus || '*****' },
                ]}
            />

            <ProfileSection
                title="Religious Details"
                isOpen={openSection === 'religious'}
                onToggle={() => toggleSection('religious')}
                data={[
                    { label: 'Religion', value: user.religiousDetails?.religion || '*****' },
                    { label: 'Caste', value: user.religiousDetails?.caste || '*****' },
                    { label: 'Sub Caste', value: user.religiousDetails?.subCaste || '*****' },
                    { label: 'Gotra', value: user.religiousDetails?.gotra || '*****' },
                    { label: 'Manglik', value: user.religiousDetails?.manglik || '*****' },
                ]}
            />

            <ProfileSection
                title="Education & Profession"
                isOpen={openSection === 'education'}
                onToggle={() => toggleSection('education')}
                data={[
                    { label: 'Education', value: user.educationDetails?.highestQualification || '*****' },
                    { label: 'Occupation', value: user.professionalDetails?.occupation || '*****' },
                    { label: 'Income', value: user.professionalDetails?.income || '*****' },
                    { label: 'Company Name', value: user.professionalDetails?.companyName || '*****' },
                    { label: 'Working City', value: user.professionalDetails?.workingCity || '*****' },
                    { label: 'Work From Home', value: user.professionalDetails?.workFromHome || '*****' },
                ]}
            />

            <ProfileSection
                title="Contact Details"
                isOpen={openSection === 'contact'}
                onToggle={() => toggleSection('contact')}
                data={[
                    { label: 'Mobile No', value: user.contactDetails?.mobileNo || '*****' },
                    { label: 'WhatsApp No', value: user.contactDetails?.whatsappNo || '*****' },
                    { label: 'Email', value: user.contactDetails?.email || '*****' },
                    { label: 'Present Address', value: formatAddress(user.contactDetails?.presentAddress) },
                    { label: 'Permanent Address', value: formatAddress(user.contactDetails?.permanentAddress) },
                ]}
            />

            <ProfileSection
                title="Family Details"
                isOpen={openSection === 'family'}
                onToggle={() => toggleSection('family')}
                data={[
                    { label: 'Father Name', value: user.familyDetails?.fatherName || '*****' },
                    { label: 'Mother Name', value: user.familyDetails?.motherName || '*****' },
                    { label: 'Father Occupation', value: user.familyDetails?.fatherOccupation || '*****' },
                    { label: 'Mother Occupation', value: user.familyDetails?.motherOccupation || '*****' },
                    { label: 'Brothers', value: user.familyDetails?.brothers || '0' },
                    { label: 'Sisters', value: user.familyDetails?.sisters || '0' },
                    { label: 'Married Brothers', value: user.familyDetails?.marriedBrothers || '0' },
                    { label: 'Married Sisters', value: user.familyDetails?.marriedSisters || '0' },
                ]}
            />

            <ProfileSection
                title="Lifestyle Details"
                isOpen={openSection === 'lifestyle'}
                onToggle={() => toggleSection('lifestyle')}
                data={[
                    { label: 'Smoking', value: user.lifestyleDetails?.smoking || '*****' },
                    { label: 'Drinking', value: user.lifestyleDetails?.drinking || '*****' },
                    { label: 'Eating Habits', value: user.lifestyleDetails?.eatingHabits || '*****' },
                ]}
            />

            <ProfileSection
                title="Partner Preferences"
                isOpen={openSection === 'expectation'}
                onToggle={() => toggleSection('expectation')}
                data={[
                    { label: 'Age Range', value: user.expectation?.ageRange || '*****' },
                    { label: 'Height Range', value: user.expectation?.heightRange || '*****' },
                    { label: 'Caste', value: user.expectation?.caste || '*****' },
                    { label: 'Religion', value: user.expectation?.religion || '*****' },
                    { label: 'Sub Caste', value: user.expectation?.subCaste || '*****' },
                    { label: 'Education', value: user.expectation?.education || '*****' },
                    { label: 'Occupation', value: user.expectation?.occupation || '*****' },
                    { label: 'Location Preference', value: user.expectation?.locationPreference || '*****' },
                ]}
            />
        </div>
    );
}

interface SectionProps {
    title: string;
    data: { label: string; value: string }[];
    isOpen: boolean;
    onToggle: () => void;
}

function ProfileSection({ title, data, isOpen, onToggle }: SectionProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center px-4 py-3 text-pink-600 font-semibold text-sm"
            >
                <div className="flex items-center gap-2">
                    <FaLock className="text-pink-600" />
                    {title}
                </div>
                {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
            {isOpen && (
                <div className="border-t">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-black font-bold px-4 py-2 text-md border-b">
                            <span className="">{item.label} :</span>
                            <span className=" font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Format helpers
function formatDate(dateObj: any) {
    if (!dateObj?.$date) return '*****';
    const date = new Date(dateObj.$date);
    return date.toLocaleDateString('en-IN');
}

function formatAddress(addr: any) {
    if (!addr) return '*****';
    return `${addr.area}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.pinCode}`;
}
