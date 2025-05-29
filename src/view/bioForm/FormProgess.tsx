
interface FormProgressProps {
    current: number;
    total: number;
    prev?: string;
    next?: string;
    live?: string;
}

export default function FormProgress({ current, total, prev, next, live }: FormProgressProps) {
    const radius = 46;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(current / total, 1);
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="grid grid-cols-12 py-4">
            {/* Progress Circle */}
            <div className="relative col-span-4 flex items-center justify-center">
                <svg
                    width="70"
                    height="70"
                    viewBox="0 0 100 100"
                    className="transform -rotate-90"
                >
                    {/* Background Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Foreground Circle (Progress) */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-500"
                    />
                </svg>

                {/* Step Counter */}
                <span className="absolute text-black font-bold text-sm">
                    {current} of {total}
                </span>
            </div>

            {/* Step Labels */}
            <div className="col-span-8 ms-2">
                <div className="flex flex-col justify-between h-full">
                    {prev && (
                        <p className="text-sm font-semibold text-primary">
                            Prev step: {prev}
                        </p>
                    )}
                    {live && (
                        <p className="font-bold text-lg sm:text-xl text-black">
                            {live}
                        </p>
                    )}
                    {next && (
                        <p className="text-sm font-semibold text-gray-400">
                            Next step: {next}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
