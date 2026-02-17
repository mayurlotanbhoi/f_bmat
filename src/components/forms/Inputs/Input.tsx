import React, { useState } from "react";
import { useField } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    type = "text",
    ...props
}) => {
    const [field, meta] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    const hasError = meta.touched && meta.error;
    const isPassword = type === "password";

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={props.name}
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}

            <div
                className={cn(
                    "input-parent flex items-center rounded-md border bg-white px-3 py-2 transition-all",
                    hasError ? "border-red-500" : "border-gray-300",
                    props.disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "",
                    className
                )}
            >
                {iconLeft && <div className="mr-2 text-gray-400">{iconLeft}</div>}

                <input
                    {...field}
                    {...props}
                    type={isPassword && showPassword ? "text" : type}
                    id={props.name}
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />

                {/* Password Toggle Icon */}
                {isPassword ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                ) : (
                    iconRight && <div className="ml-2 text-gray-400">{iconRight}</div>
                )}
            </div>

            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};

export default Input;
