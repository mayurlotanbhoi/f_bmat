import React, { useRef } from 'react';
import { Formik, Form, type FormikProps } from 'formik';
import { RxCross2 } from 'react-icons/rx';
import { SiVerizon } from 'react-icons/si';
import { IoPersonCircleSharp } from 'react-icons/io5';
import BackButtn from '../../components/Buttons/BackButtn';
import Heading from '../../components/Headings/Heading';
import { FileInput, Input, MultiSelect, Select } from '../../components/forms/Inputs';
import { useUpdateUserMutation } from '../../features/user/userApi';
import { updateUserSchema } from '../../validations';
import { asyncHandlerWithSwal } from '../../util/asyncHandler';


type Props = {
    user: any;
    onSave?: () => void;
    onCancel?: () => void;
    onSubmit?: (values: any) => void;
};

const UpdateUserForm: React.FC<Props> = ({ user, onCancel, }) => {
    const formikRef = useRef<FormikProps<any>>(null);
    const [updateUser, { isError, isLoading, data }] = useUpdateUserMutation()

    const initialValues = {
        location: user.location || '',
        language: user.language || '',
        mobile: user.mobile || '',
        profilePicture: user.profilePicture || '',
        name: user.name || '',
        address: {
            city: user.address?.city || '',
            state: user.address?.state || '',
            country: user.address?.country || '',
            postcode: user.address?.postcode || '',
        },
    };

    const fields = [
        { name: 'profilePicture', label: 'Profile Picture ', placeholder: 'choose file', type: 'file', required: false },
        { name: 'name', label: 'name', placeholder: 'your nanme', type: 'text', required: true },
        { name: 'location', label: 'Location', placeholder: 'Indore, MP', type: 'text', required: true },
        { name: 'mobile', label: 'Mobile Number', placeholder: '7709433561', type: 'text', required: true },
        { name: 'address.city', label: 'City', placeholder: 'Indore', type: 'text', required: true },
        { name: 'address.state', label: 'State', placeholder: 'Madhya Pradesh', type: 'text', required: true },
        { name: 'address.country', label: 'Country', placeholder: 'India', type: 'text', required: true },
        { name: 'address.postcode', label: 'Postal Code', placeholder: '452001', type: 'text', required: true },
    ];

    const buildFormData = (formData: FormData, data: any, parentKey = '') => {
        Object.entries(data).forEach(([key, value]) => {
            const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(fieldKey, value);
            } else if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
                buildFormData(formData, value, fieldKey); // Recursive for nested objects
            } else if (value !== undefined && value !== null) {
                //@ts-ignore
                formData.append(fieldKey, value);
            }
        });
    };


    const onSubmit = async (values) => {
        const formData = new FormData();


        buildFormData(formData, values);
        // conso

        const result = await asyncHandlerWithSwal(
            async () => updateUser(formData).unwrap(),
            {
                loadingHtml: "<b>Updating profile...</b>",
                successHtml: "<b>Profile updated successfully</b>",
                errorHtml: "<b>Update failed. Please try again.</b>",
            }
        );

        console.log('onSubmit values', result)

    }

    return (
        <div className=" w-screen sm:w-[350px] ">
            {/* Top Header */}
            <div className=" sticky top-0 flex justify-between gap-2 py-4 border-b-8 border-gray-200 bg-white items-center">
                <BackButtn onClick={onCancel} />
                <Heading
                    className="text-black ps-5 font-bold text-sm"
                    text="Update your profile details"
                />
                <div></div>
            </div>

            <div className="flex justify-between items-center px-4 my-2 w-full">
                <div className="flex items-center space-x-2 text-primary font-bold cursor-pointer">
                    <IoPersonCircleSharp />
                    <p>Edit Profile</p>
                </div>
                {/* <p
                    onClick={() => {
                        formikRef.current?.resetForm({ values: initialValues });
                    }}
                    className="text-primary font-bold cursor-pointer"
                >
                    Reset
                </p> */}
            </div>

            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={updateUserSchema}
                validateOnBlur={true}
                validateOnChange={true}
                enableReinitialize
                onSubmit={(values) => {
                    onSubmit(values);
                    // onSave?.();
                }}
            >
                <Form className="space-y-4  bg-white h-full w-full flex flex-col justify-between">

                    <div className=' p-4 space-y-4  bg-white h-full w-full flex flex-col justify-between'>
                        {/* <div className="space-y-4">
                        {fields.map((field) => (
                            <Input
                                key={field.name}
                                name={field.name}
                                type={field.type}
                                label={field.label}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div> */}

                        {fields?.map((field) => {
                            switch (field.type) {
                                case "file":
                                    return (
                                        <FileInput
                                            key={field.name}
                                            old={user?.profilePicture ? user?.profilePicture : ""}
                                            name={field.name}
                                            label={field.label}
                                            required={field.required}
                                            className={" border-2 object-contain border-dashed w-full h-[200px]"}
                                        />
                                    );

                                default:
                                    return (
                                        <Input
                                            key={field.name}
                                            type={field.type}
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                        />
                                    );
                            }
                        })}
                    </div>

                    <div className="w-[100%] px-2 flex justify-between gap-4 bg-white sticky bottom-0 pt-4 shadow-top-2xl" style={{ boxShadow: '0 -8px 15px -4px rgba(0, 0, 0, 0.6)' }}>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 border-black text-black font-bold rounded-lg w-full"
                        >
                            <RxCross2 />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 bg_primary text-white font-bold rounded-lg w-full"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                                        />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <SiVerizon />
                                    Save
                                </>
                            )}
                        </button>
                    </div>

                </Form>
            </Formik>
        </div>
    );
};

export default UpdateUserForm;
