import React from "react";
import { useField } from "formik";
import { cn } from "./Input";


type TextareaProps = {
    label?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    className?: string;
};

export const Textarea: React.FC<TextareaProps> = ({
    label,
    name,
    placeholder,
    required,
    disabled,
    rows = 4,
    className,
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
            <textarea
                {...field}
                id={name}
                rows={rows}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={cn(
                    "input-parent w-full rounded-xl border px-3 py-2 text-sm shadow-sm resize-none",
                    hasError ? "border-red-500" : "border-gray-300",
                    disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "",
                    className
                )}
            />
            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};
