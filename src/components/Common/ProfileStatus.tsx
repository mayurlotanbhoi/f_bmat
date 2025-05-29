import React from "react";

interface ProfileProgressCircleProps {
    percentage: number; // 0 to 100
    imageUrl?: string;
    size?: number; // in pixels
}

const ProfileProgressCircle: React.FC<ProfileProgressCircleProps> = ({
    percentage,
    imageUrl,
    size = 45, // default 64px
}) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2.3;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{ width: size, height: size }} className="relative">
            {/* SVG Circle Progress */}
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb" // Tailwind gray-200
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#10b981" // Tailwind green-500
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    fill="transparent"
                />
            </svg>

            {/* Profile Image or fallback */}
            <div
                className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 text-white font-semibold text-sm"
                style={{ width: size - strokeWidth * 2, height: size - strokeWidth * 2, top: strokeWidth, left: strokeWidth }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <span>{percentage}%</span>
                )}
            </div>
        </div>
    );
};

export default ProfileProgressCircle;
