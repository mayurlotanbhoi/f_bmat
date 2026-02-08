import React from "react";
import Flatpickr from "react-flatpickr";
import { useField, useFormikContext } from "formik";
import { FaCalendar } from "react-icons/fa";
import "flatpickr/dist/flatpickr.min.css";

export function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(" ");
}

type InputProps = {
    label?: string;
    name: string;
    type?: "date" | "datetime";
    placeholder?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    minDate?: Date;
    maxDate?: Date;
};

const DateTimeInput: React.FC<InputProps> = ({
    label,
    iconLeft,
    iconRight,
    className,
    required,
    type = "date",
    minDate,
    maxDate,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    const hasError = meta.touched && meta.error;

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const resolvedMaxDate = maxDate || (type === "date" ? eighteenYearsAgo : undefined);

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.name} className="mb-1 block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}
            <div
                className={cn(
                    "flex items-center rounded-md border bg-white px-3 py-2 shadow-sm transition-all",
                    hasError ? "border-red-500" : "border-gray-300",
                    props.disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "",
                    className
                )}
            >
                {iconLeft && <div className="mr-2 text-gray-400">{iconLeft}</div>}

                <Flatpickr
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date: Date[]) => {
                        setFieldValue(props.name, date[0] || null);
                    }}
                    options={{
                        enableTime: type === "datetime",
                        disableMobile: true,
                        dateFormat: type === "datetime" ? "Y-m-d h:i K" : "Y-m-d",
                        time_24hr: false,
                        minDate: minDate,
                        maxDate: resolvedMaxDate,
                    }}
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />

                <div className="ml-2 text-gray-400">
                    {iconRight || <FaCalendar size={18} />}
                </div>
            </div>

            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};

export default DateTimeInput;
