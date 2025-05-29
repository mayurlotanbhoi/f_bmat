import React from "react";
import { useField } from "formik";
import { cn } from "./Input";

type SelectProps = {
    label?: string;
    name: string;
    options: { label: string; value: string }[];
    className?: string;
    required?: boolean;
    disabled?: boolean;
};

export const Select: React.FC<SelectProps> = ({
    label,
    name,
    options,
    className,
    required,
    disabled,
}) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <select
                {...field}
                id={name}
                disabled={disabled}
                required={required}
                className={cn(
                    "w-full rounded-xl border px-3 py-2 text-sm text-gray-700 shadow-sm",
                    hasError ? "border-red-500" : "border-gray-300",
                    disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "",
                    className
                )}
            >
                <option value="">Select</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};
