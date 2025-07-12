import React from "react";
import { useField } from "formik";
export function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(" ");
}

type InputProps = {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    required?: boolean;
};

const Input: React.FC<InputProps> = ({
    label,
    iconLeft,
    iconRight,
    className,
    required,
    ...props
}) => {
    const [field, meta] = useField(props.name);
   
    const hasError = meta.touched && meta.error;

    // console.log("meta.touched", meta.touched)

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.name} className="mb-1 block text-sm font-medium text-gray-700">
                    {label} {required && <span className=" text-red-600">*</span>}
                </label>
            )}
            <div
                className={cn(
                    
                    " input-parent flex items-center rounded-xl border bg-white px-3 py-2 transition-all",
                    hasError ? "border-red-500" : "border-gray-300",
                    props.disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "",
                    className
                )}

            >
                {iconLeft && <div className="mr-2 text-gray-400">{iconLeft}</div>}
                <input
                    {...field}
                    {...props}
                    id={props.name}
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                {iconRight && <div className="ml-2 text-gray-400">{iconRight}</div>}
            </div>
            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};

export default Input;