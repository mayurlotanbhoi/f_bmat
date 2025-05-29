import React from 'react';
import SearchableSelect from '../forms/SearchableSelect';

interface CasteProps {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}


const mockApiSearch = async (query: string): Promise<{ value: string; label: string }[]> => {
    const data = ["Bhoi", "Raj Bhoi", "Jhinga Bhoi", "Pardeshi Bhoi", "Kahar Bhoi", "Godiya Kahar Bhoi", "Dhuriya Kahar Bhoi", "Maji Kahar Bhoi", "Kirat Bhoi", "Machhua Bhoi", "Maji Bhoi", "Jaliya Bhoi", "Kevat Bhoi", "Dhivar Bhoi", "Dhivar Bhoi", "Dhimar Bhoi", "Palewar Bhoi",
        "Navadi Bhoi", "Machhedra Bhoi", "Malhar Bhoi", "Malhava Bhoi", "Boi (Bhujari)", "Gadhav Bhoi", "Khadi Bhoi", "Khare Bhoi", "Dhevra Bhoi"];

    // Simulate API filter and delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                data
                    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                    .map((item) => ({ value: item, label: item }))
            );
        }, 500);
    });
};

export default function CasteSelect({ value, setValue }: CasteProps) {
    return (
        <div className="max-w-md mx-auto mt-10">
            {/* <label className="block mb-2 font-semibold">Search Cast</label> */}
            <SearchableSelect
                fetchOptions={mockApiSearch}
                value={value}
                onChange={(val) => setValue(val)}
                placeholder="Search Caste"
            />
            <p className="my-4">Selected Cast: <strong>{value}</strong></p>
        </div>
    );
}
