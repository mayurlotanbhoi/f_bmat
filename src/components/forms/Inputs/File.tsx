import React, { useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { cn } from "./Input"; // Reuse your `cn` function

type FileInputProps = {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    old?: string;
};

const FileInput: React.FC<FileInputProps> = ({
    name,
    label,
    required,
    className,
    old
}) => {
    const [field, meta, helpers] = useField(name);
    const { setFieldValue } = useFormikContext();
    const [preview, setPreview] = useState<string | null>(old);
    console.log("preview", old);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const hasError = meta.touched && meta.error;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        console.log("file", file);
        if (file) {
            setFieldValue(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={` ${className ? '' : 'w-[8rem]'} `}>
            {label && (
                <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}

            <div
                onClick={handleClick}
                className={cn(
                    "input-parent flex justify-center items-center aspect-square cursor-pointer border rounded-md bg-white transition hover:shadow-md overflow-hidden",
                    hasError ? "border-red-500" : "border-gray-300",
                    className
                )}
            >
                {preview ? (
                    <img src={preview || old} alt="Selected file" className="object-cover w-full h-full" />
                ) : (
                    <div className="text-4xl text-gray-400 font-bold">+</div>
                )}
            </div>

            <input
                type="file"
                accept=".jpeg, .png, .webp, .jpg"
                name={name}
                id={name}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {hasError && <p className="mt-1 text-xs text-red-500">{meta.error}</p>}
        </div>
    );
};

export default FileInput;
