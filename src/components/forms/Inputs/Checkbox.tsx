import React from "react";
import { useField } from "formik";

type CheckboxProps = {
    name: string;
    label: string;
    required?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({ name, label, required }) => {
    const [field, meta] = useField({ name, type: "checkbox" });
    const hasError = meta.touched && meta.error;

    return (
        <div className="w-full">
            <label className="inline-flex items-center text-sm gap-2">
                <input
                    type="checkbox"
                    {...field}
                    required={required}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                {label}
            </label>
            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};
