import React, { useEffect, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    fetchOptions: (searchText: string) => Promise<Option[]>;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    fetchOptions,
    onChange,
    placeholder = 'Search...',
    className = '',
}) => {
    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchOptions(searchText).then(setOptions);
        }, 300); // debounce

        return () => clearTimeout(timeout);
    }, [searchText]);

    // const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

    return (
        <div className={`relative w-full ${className}`}>
            {/* <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="border px-4 py-2 rounded cursor-pointer bg-white shadow-sm"
            >
                {selectedLabel || 'Select...'}
            </div> */}

            {isOpen && (
                <div className=" w-full bg-white  rounded  mt-1 z-20">
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full flex justify-between mt-2 bg-g items-center text-gray-500 border-[1px] border-black h-12 rounded-xl px-4 font-bold text-[1rem]"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <ul className="max-h-60 w-full overflow-y-auto max-w-md space-y-1  list-disc list-inside ">
                        {options.length ? (
                            options.map((opt) => (
                                <li
                                    key={opt.value}
                                    className="p-2 border-b border-black hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                        setSearchText('');
                                    }}
                                >
                                    {opt.label}
                                </li>
                            ))
                        ) : (
                            <div className="p-2 text-gray-400 text-sm">No options</div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
