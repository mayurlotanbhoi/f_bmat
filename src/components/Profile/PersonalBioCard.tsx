import React from 'react';
import { FaUser, FaBook, FaHeart, FaMapMarkerAlt, FaLanguage, FaImage } from 'react-icons/fa';
import Heading from '../Headings/Heading';


interface Props {
    user: { [key: string]: any; }
}

export default function UserProfileCard({ user }: Props) {
    console.log("user", user)
    return (
        <div className="w-full max-w-4xl mx-auto bg-white  rounded-2xl py-4 md:p-6 flex flex-col gap-6 transition-all hover:scale-[1.01]">
            {/* Header */}
            <div className="flex items-center gap-3">
                <FaUser className="text-2xl " />
                <Heading text="Profile Summary" className="text-xl font-bold " />
            </div>

            <hr className="border-primary/40" />

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 shadow-2xl rounded-2xl">
                <InfoRow label="Name" value={user.name} />
                <InfoRow label="Gender" value={user.gender} />
                <InfoRow label="Age" value={`${user.age} yrs`} />
                <InfoRow label="Height" value={user.height} />
                <InfoRow label="Religion" value={user.religion} />
                <InfoRow label="Caste" value={`${user.caste} (${user.subCaste})`} />
                <InfoRow label="Marital Status" value={user.maritalStatus} />
                <InfoRow label="Manglik" value={user.manglik} badge badgeColor={user.manglik === 'No' ? 'red' : 'green'} />
                <InfoRow label="Location" value={user.location} icon={<FaMapMarkerAlt className="text-primary" />} />
            </div>

            {/* Education & Profession */}
            <div className="flex flex-col gap-2 mt-4 shadow-2xl rounded-2xl p-6">
                <SectionTitle icon={<FaBook className="text-primary" />} title="Education & Profession" />
                <InfoRow label="Education" value={user.education} />
                <InfoRow label="Profession" value={user.profession} />
                <InfoRow label="Income" value={user.income} />
            </div>

            {/* Family Info */}
            <div className="flex flex-col gap-2 mt-4 shadow-2xl rounded-2xl p-6">
                <SectionTitle icon={<FaHeart className="text-primary" />} title="Family Details" />
                <InfoRow label="Father" value={user.family?.father} />
                <InfoRow label="Mother" value={user.family?.mother} />
                <InfoRow label="Siblings" value={user.family?.siblings} />
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-2 mt-4 shadow-2xl rounded-2xl p-6">
                <SectionTitle icon={<FaLanguage className="text-primary" />} title="Languages Known" />
                <div className="flex flex-wrap gap-2">
                    {user?.languages?.map((lang: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {lang}
                        </span>
                    ))}
                </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-2 mt-4 shadow-2xl rounded-2xl p-6">
                <SectionTitle icon={<FaImage className="text-primary" />} title="Profile Images" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user?.imges?.map((img: string, idx: number) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Profile ${idx + 1}`}
                            className="rounded-xl object-cover w-full h-40 border border-gray-200 shadow"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface InfoRowProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    badge?: boolean;
    badgeColor?: 'green' | 'red';
}

function InfoRow({ label, value, icon, badge, badgeColor = 'green' }: InfoRowProps) {
    return (
        <div className="flex justify-between items-center border-b pb-2">
            <span className="text-primary font-medium flex items-center gap-2">
                {icon}
                {label}:
            </span>
            {badge ? (
                <span
                    className={`px-2 py-1 rounded-md text-sm font-semibold ${badgeColor === 'green'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                >
                    {value}
                </span>
            ) : (
                <span className="text-gray-700">{value}</span>
            )}
        </div>
    );
}

function SectionTitle({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 text-lg font-semibold text-primary border-b pb-1">
            {icon}
            {title}
        </div>
    );
}
