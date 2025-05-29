import React from "react";
import { useField } from "formik";

type RadioOption = { label: string; value: string };

type RadioGroupProps = {
    name: string;
    label?: string;
    options: RadioOption[];
    required?: boolean;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    label,
    options,
    required,
}) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className="w-full">
            {label && (
                <div className="mb-1 block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-600">*</span>}
                </div>
            )}
            <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            {...field}
                            value={option.value}
                            checked={field.value === option.value}
                            required={required}
                            className="text-primary focus:ring-primary"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};
