import React, { useState, useRef } from "react";
import { useField, useFormikContext } from "formik";
import { FaTimes } from "react-icons/fa";

type Option = { label: string; value: string };

type Props = {
    name: string;
    label?: string;
    required?: boolean;
    options: Option[];
};

const FormikMultiSelect: React.FC<Props> = ({ name, label, required, options }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedValues: string[] = field.value || [];

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (value: string) => {
        if (!selectedValues.includes(value)) {
            setFieldValue(name, [...selectedValues, value]);
        }
    };

    const handleRemove = (value: string) => {
        setFieldValue(name, selectedValues.filter((v) => v !== value));
    };

    const error = meta.touched && meta.error;

    return (
        <div className="relative w-full">
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                onClick={toggleDropdown}
                className={`min-h-[42px] w-full flex flex-wrap gap-1 items-center border rounded-lg px-3 py-2 text-sm bg-white cursor-pointer ${error ? "border-red-500" : "border-gray-300"
                    }`}
                ref={dropdownRef}
            >
                {selectedValues?.length === 0 && (
                    <span className="text-gray-400">Select one or more...</span>
                )}

                {Array.isArray(selectedValues) && selectedValues?.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return (
                        <span
                            key={val}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                            {opt?.label}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(val);
                                }}
                            >
                                <FaTimes size={10} />
                            </button>
                        </span>
                    );
                })}
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className={`px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm ${selectedValues.includes(opt.value) ? "text-gray-400 line-through" : ""
                                }`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-xs text-red-500 mt-1">{meta.error}</p>}
        </div>
    );
};

export default FormikMultiSelect;
