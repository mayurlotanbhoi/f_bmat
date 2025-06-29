import React, { useRef } from 'react';
import { Formik, Form, type FormikProps } from 'formik';
import { RxCross2 } from 'react-icons/rx';
import { SiVerizon } from 'react-icons/si';
import { IoPersonCircleSharp } from 'react-icons/io5';
import BackButtn from '../../components/Buttons/BackButtn';
import Heading from '../../components/Headings/Heading';
import { Input } from '../../components/forms/Inputs';


type Props = {
    user: any;
    onSave?: () => void;
    onCancel?: () => void;
    onSubmit?: (values: any) => void;
};

const UpdateUserForm: React.FC<Props> = ({ user, onCancel, }) => {
    const formikRef = useRef<FormikProps<any>>(null);

    console.log("user", user?.address?.city, user?.address?.state, user?.address?.country, user?.address?.postcode);

    const initialValues = {
        location: user.location || '',
        language: user.language || '',
        mobile: user.mobile || '',
        profilePicture: user.profilePicture || '',
        address: {
            city: user.address?.city || '',
            state: user.address?.state || '',
            country: user.address?.country || '',
            postcode: user.address?.postcode || '',
        },
    };

    const fields = [
        { name: 'location', label: 'Location', placeholder: 'Indore, MP', type: 'text' },
        { name: 'language', label: 'Language Code', placeholder: 'en / hi', type: 'text' },
        { name: 'mobile', label: 'Mobile Number', placeholder: '7709433561', type: 'text' },
        { name: 'profilePicture', label: 'Profile Picture URL', placeholder: 'choose file', type: 'text' },
        { name: 'address.city', label: 'City', placeholder: 'Indore', type: 'text' },
        { name: 'address.state', label: 'State', placeholder: 'Madhya Pradesh', type: 'text' },
        { name: 'address.country', label: 'Country', placeholder: 'India', type: 'text' },
        { name: 'address.postcode', label: 'Postal Code', placeholder: '452001', type: 'text' },
    ];

    return (
        <div className=" w-screen ">
            {/* Top Header */}
            <div className="px-2 sticky top-0 flex justify-between gap-2 py-4 border-b-8 border-gray-200 bg-white items-center">
                <BackButtn onClick={onCancel} />
                <Heading
                    className="text-black ps-5 font-bold text-sm"
                    text="Update your profile details"
                />
                <div></div>
            </div>

            <div className="flex justify-between items-center px-4 my-2 w-full">
                <div className="flex items-center space-x-2">
                    <IoPersonCircleSharp />
                    <p>Edit Profile</p>
                </div>
                <p
                    onClick={() => {
                        formikRef.current?.resetForm({ values: initialValues });
                    }}
                    className="text-primary font-bold cursor-pointer"
                >
                    Reset
                </p>
            </div>

            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => {
                    // onSubmit(values);
                    // onSave?.();
                }}
            >
                <Form className="space-y-4 p-4 bg-white h-full w-full flex flex-col justify-between">
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <Input
                                key={field.name}
                                name={field.name}
                                type={field.type}
                                label={field.label}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div>

                    <div className="w-full flex justify-between gap-4 bg-white sticky bottom-0 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 border-black text-black font-bold rounded-lg w-full"
                        >
                            <RxCross2 />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-7 py-2 border-2 bg_primary text-white font-bold rounded-lg w-full"
                        >
                            <SiVerizon />
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UpdateUserForm;
