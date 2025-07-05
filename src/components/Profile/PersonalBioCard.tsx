import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useLocalization } from '../../hooks';
import { formatDate } from '../../util/dateFormat';

interface Props {
    user: any; // replace `any` with actual type if available
}

export default function UserProfileCard({ user }: Props) {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const labels = useLocalization('labels');
    const sectionTitles = useLocalization('sectionTitles');

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    console.log("user", user);

    return (
        <div className="w-full max-w-md mx-auto py-4">
            <ProfileSection
                title={sectionTitles.personalDetails}
                isOpen={openSection === 'personal'}
                onToggle={() => toggleSection('personal')}
                data={[
                    { label: labels.fullName, value: user.personalDetails?.fullName || '*****' },
                    { label: labels.gender, value: user.personalDetails?.gender || '*****' },
                    { label: labels.dob, value: formatDate(user.personalDetails?.dateOfBirth) },
                    { label: labels.height, value: user.personalDetails?.height || '*****' },
                    { label: labels.weight, value: user.personalDetails?.weight || '*****' },
                    { label: labels.bloodGroup, value: user.personalDetails?.bloodGroup || '*****' },
                    { label: labels.disability, value: user.personalDetails?.disability || '*****' },
                    { label: labels.maritalStatus, value: user.personalDetails?.maritalStatus || '*****' },
                ]}
            />

            <ProfileSection
                title={sectionTitles.religiousDetails}
                isOpen={openSection === 'religious'}
                onToggle={() => toggleSection('religious')}
                data={[
                    { label: labels.religion, value: user.religiousDetails?.religion || '*****' },
                    { label: labels.caste, value: user.religiousDetails?.caste || '*****' },
                    { label: labels.subCaste, value: user.religiousDetails?.subCaste || '*****' },
                    { label: labels.gotra, value: user.religiousDetails?.gotra || '*****' },
                    { label: labels.manglik, value: user.religiousDetails?.manglik || '*****' },
                ]}
            />

            <ProfileSection
                title={sectionTitles.educationAndProfession}
                isOpen={openSection === 'education'}
                onToggle={() => toggleSection('education')}
                data={[
                    { label: labels.qualification, value: user.educationDetails?.highestQualification || '*****' },
                    { label: labels.occupation, value: user.professionalDetails?.occupation || '*****' },
                    { label: labels.income, value: user.professionalDetails?.income || '*****' },
                    { label: labels.companyName, value: user.professionalDetails?.companyName || '*****' },
                    { label: labels.workingCity, value: user.professionalDetails?.workingCity || '*****' },
                    { label: labels.workFromHome, value: user.professionalDetails?.workFromHome || '*****' },
                ]}
            />

            <ProfileSection
                title={sectionTitles.contactDetails}
                isOpen={openSection === 'contact'}
                onToggle={() => toggleSection('contact')}
                data={[
                    { label: labels.phone, value: user.contactDetails?.mobileNo || '*****' },
                    { label: labels.whatsapp, value: user.contactDetails?.whatsappNo || '*****' },
                    { label: labels.email, value: user.contactDetails?.email || '*****' },
                    { label: labels.presentAddress, value: formatAddress(user.contactDetails?.presentAddress) },
                    { label: labels.permanentAddress, value: formatAddress(user.contactDetails?.permanentAddress) },
                ]}
            />

            <ProfileSection
                title={sectionTitles.familyDetails}
                isOpen={openSection === 'family'}
                onToggle={() => toggleSection('family')}
                data={[
                    { label: labels.father, value: user.familyDetails?.fatherName || '*****' },
                    { label: labels.mother, value: user.familyDetails?.motherName || '*****' },
                    { label: labels.fatherOccupation, value: user.familyDetails?.fatherOccupation || '*****' },
                    { label: labels.motherOccupation, value: user.familyDetails?.motherOccupation || '*****' },
                    { label: labels.brothers, value: user.familyDetails?.brothers || '0' },
                    { label: labels.sisters, value: user.familyDetails?.sisters || '0' },
                    { label: labels.marriedBrothers, value: user.familyDetails?.marriedBrothers || '0' },
                    { label: labels.marriedSisters, value: user.familyDetails?.marriedSisters || '0' },
                ]}
            />

            <ProfileSection
                title={sectionTitles.lifestyle}
                isOpen={openSection === 'lifestyle'}
                onToggle={() => toggleSection('lifestyle')}
                data={[
                    { label: labels.smoking, value: user.lifestyleDetails?.smoking || '*****' },
                    { label: labels.drinking, value: user.lifestyleDetails?.drinking || '*****' },
                    { label: labels.eatingHabits, value: user.lifestyleDetails?.eatingHabits || '*****' },
                ]}
            />

            <ProfileSection
                title={sectionTitles.partnerPreference}
                isOpen={openSection === 'expectation'}
                onToggle={() => toggleSection('expectation')}
                data={[
                    { label: labels.ageRange, value: user.expectation?.ageRange || '*****' },
                    { label: labels.heightRange, value: user.expectation?.heightRange || '*****' },
                    { label: labels.caste, value: user.expectation?.caste || '*****' },
                    { label: labels.religion, value: user.expectation?.religion || '*****' },
                    { label: labels.subCaste, value: user.expectation?.subCaste || '*****' },
                    { label: labels.qualification, value: user.expectation?.education || '*****' },
                    { label: labels.occupation, value: user.expectation?.occupation || '*****' },
                    { label: labels.locationPreference, value: user.expectation?.locationPreference || '*****' },
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
// function formatDate(dateInput: any): string {
//     if (!dateInput) return '*****';

//     try {
//         const date = new Date(dateInput); // Handles ISO string or timestamp
//         if (isNaN(date.getTime())) return '*****'; // Invalid date check
//         return date.toLocaleDateString('mr-IN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     } catch {
//         return '*****';
//     }
// }

function formatAddress(addr: any) {
    if (!addr) return '*****';
    return `${addr.area}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.pinCode}`;
}
