import React from "react";
import { useField } from "formik";

type Props = {
    name: string;
    label?: string;
    required?: boolean;
    options: { label: string; value: string }[];
};

const FormikSelect: React.FC<Props> = ({ name, label, required, options }) => {
    const [field, meta] = useField(name);
    const error = meta.touched && meta.error;

    return (
        <div>
            {label && <label className="block text-sm mb-1">{label} {required && <span className=" text-red-600">*</span>}</label>}
            <select
                {...field}
                className={`input-parent w-full px-3 py-2 border rounded-md text-sm ${error ? "border-red-500" : "border-gray-300"}`}
            >
                <option value="">Select an option</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{meta.error}</p>}
        </div>
    );
};

export default FormikSelect;