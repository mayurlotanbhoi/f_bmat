import { useEffect, useState } from "react";

export default function AgeRangeSlider({
    value = { min: 18, max: 60 },
    onChange,
}: {
    value?: { min: number; max: number };
    onChange: (range: { min: number; max: number }) => void;
}) {
    const MIN = 18;
    const MAX = 100;
    const [age, setAge] = useState(value);

    useEffect(() => {
        setAge(value); // sync if formik changes externally
    }, [value]);

    const getPercent = (val: number) => ((val - MIN) / (MAX - MIN)) * 100;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const min = Math.min(Number(e.target.value), age.max - 1);
        const updated = { ...age, min };
        setAge(updated);
        onChange(updated);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = Math.max(Number(e.target.value), age.min + 1);
        const updated = { ...age, max };
        setAge(updated);
        onChange(updated);
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-6">
            <h2 className="text-md font-bold text-gray-700 mb-4">Select Age Range</h2>
            <div className="relative h-10">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded -translate-y-1/2" />
                <div
                    className="absolute top-1/2 h-2 bg_primary rounded -translate-y-1/2"
                    style={{
                        left: `${getPercent(age.min)}%`,
                        width: `${getPercent(age.max) - getPercent(age.min)}%`,
                    }}
                />
                <div className="relative z-10">
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={age.min}
                        onChange={handleMinChange}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto"
                        style={{ zIndex: age.min >= age.max - 1 ? 5 : 10 }}
                    />
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={age.max}
                        onChange={handleMaxChange}
                        className="absolute w-full h-2 appearance-none bottom-[-40px] bg-transparent pointer-events-auto"
                        style={{ zIndex: age.max <= age.min + 1 ? 5 : 10 }}
                    />
                </div>
            </div>
            <div className="flex justify-between mt-4 text-gray-700 font-semibold">
                <span>Min: {age.min}</span>
                <span>Max: {age.max}</span>
            </div>
        </div>
    );
}
