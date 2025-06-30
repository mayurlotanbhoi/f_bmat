import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
    location: Yup.string()
        .required('Location is required'),

    profilePicture: Yup.mixed()
        .nullable()
        .optional()
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;

            // Allow string URL (old image already uploaded)
            if (typeof value === 'string') return true;

            // Allow File only if it's an image
            return value instanceof File && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
        }),


    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),

    address: Yup.object().shape({
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        country: Yup.string()
            .required('Country is required'),
        postcode: Yup.string()
            .required('Postal code is required')
            .matches(/^\d{6}$/, 'Postal code must be 6 digits'),
    }),
});
