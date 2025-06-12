
import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaUser } from 'react-icons/fa';
// import welcome from '../../assets/welcome.png'; // your actual image path
import GoogleLogin from './GoogleLogin'; // assumed component
import { setUser } from '../../features/user/userSlice';
import { welcome } from '../../util/images.util';
import { asyncHandlerWithSwal } from '../../util/asyncHandler';
import { useAuth } from '../../hooks/useAuth';

type FormValues = {
    mobile: string;
    password: string;
};

export const LoginForm = ({
    onSubmit,
    isSingUp,
    isLoading
}: {
    onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void;
    isSingUp: boolean,
    isLoading:boolean
}) => {
    const initialValues: FormValues = {
        mobile: '',
        password: '',
    };

    const validationSchema = Yup.object({
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ submitForm }) => (
                <>
                    <Form className="space-y-5" id="login-form">
                        <div>
                            <Field
                                name="mobile"
                                type="text"
                                placeholder="Mobile Number"
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                            <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </Form>
                    {!isSingUp && (
                        <a className="text-indigo-700 my-2 hover:text-pink-700 text-sm float-right" href="#">
                            Forgot Password ?
                        </a>
                    )}
                    <button
    type="button"
    disabled={isLoading}
    onClick={submitForm}
    className={`mt-5 tracking-wide font-semibold primary-button text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
      isLoading ? 'opacity-70 cursor-not-allowed' : ''
    }`}
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
            <span>Processing...</span>
        </>
    ) : (
        <>
            <FaArrowRight className="mx-2" size={20} />
            <span>{isSingUp ? 'Sign Up' : 'Sign In'}</span>
        </>
    )}
</button>

                </>
            )}
        </Formik>
    );
};

export default function SinginSignUp() {
    const [singUp, setSingUp] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useAuth()
    const [registeruser, {  error, data, isSuccess }] = useRegisterMutation()

    const onSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        if (singUp) {
            try {
                setIsLoading(true)

                const res = await asyncHandlerWithSwal(() => registeruser({
                    mobile: values.mobile, // Assuming `mobile` is used as email/username
                    password: values.password,
                }).unwrap(), {
                    loadingHtml: "<b>Account Creting...</b>",
                    successHtml: "<b>Account Created! Now Login</b>",
                    errorHtml: "<b>Upload failed. Please try again.</b>",
                });

                if (res.status === 201) {
                    setSingUp(false);
                }


            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setIsLoading(false)
                setSubmitting(false);
            }
        } else {
            try {
                setIsLoading(true)

                  const res = await asyncHandlerWithSwal(() =>   login({
                    mobile: values.mobile, // Assuming `mobile` is used as email/username
                    password: values.password,
                }).unwrap(), {
                    loadingHtml: "<b>Account Creting...</b>",
                    successHtml: "<b>Account Created! Now Login</b>",
                    errorHtml: "<b>Upload failed. Please try again.</b>",
                });
              

                // dispatch(setUser(res));
                // navigate('/lang');
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setIsLoading(false)
                setSubmitting(false);
            }
        }
    };

    useEffect(() => {
  if (user) {
    navigate('/lang');
  }
}, [user, navigate]);

    return (
        <div className="h-[100vh] bg_primary text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col-reverse sm:flex-row justify-center flex-1">
                <div className="lg:w-1/2 rounded-t-2xl xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img
                            src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                            className="w-mx-auto"
                            alt="logo"
                        />
                    </div>
                    <div className="md:mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <GoogleLogin />
                            </div>

                            <div className="my-5 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign In with Cartesian Phone
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">

                                <LoginForm onSubmit={onSubmit} isSingUp={singUp} isLoading={isLoading} />



                                {!singUp ? (
                                    <p
                                        onClick={() => setSingUp(true)}
                                        className="text-center mt-3 text-sm text-gray-500 cursor-pointer"
                                    >
                                        Don&#x27;t have an account yet?
                                        <span className="font-semibold text-gray-600 hover:underline hover:text-pink-700">
                                            {' '}
                                            Sign up
                                        </span>
                                        .
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => setSingUp(false)}
                                        className="text-center mt-3 text-sm text-gray-500 cursor-pointer"
                                    >
                                        Have an account?
                                        <span className="font-semibold text-gray-600 hover:underline hover:text-pink-700">
                                            {' '}
                                            Sign in
                                        </span>
                                        .
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg_primary md:bg-green-100 text-center content-end lg:flex">
                    <div
                        className="md:m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat min-h-[260px] md:min-h-[300px]"
                        style={{ backgroundImage: `url(${welcome})` }}
                    />
                </div>
            </div>
        </div>
    );
}


// import { use, useEffect, useRef, useState } from 'react'
// import { welcome } from '../../util/images.util'
// import { FaArrowRight, FaUser } from 'react-icons/fa';
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// // import { useAuth } from '../../context/AuthContext';
// // import type { Biodata } from '../../types/Biodata';


// import './SinginSignUp.css'
// import { useNavigate } from 'react-router-dom';
// // import { useGoogleLogin } from '@react-oauth/google';
// import { useLoginMutation } from '../../features/auth/authApi';
// import { useDispatch } from 'react-redux';
// import GoogleLogin from './GoogleLogin';
// import { setUser } from '../../features/user/userSlice';
// // import { useGetProfileByUserIdMutation } from '../../features/matrimony/matrimonyApi';
// // import { useGetUserMutation } from '../../features/user/userApi';

// export default function SinginSignUp() {
//     const [singUp, setSingUp] = useState(false)
//     const formRef = useRef<HTMLFormElement>(null)
//     // const { login } = useAuth();
//     const [login,] = useLoginMutation();
//     // const [getProfileByUserId,] = useGetProfileByUserIdMutation()
//     // const [getUser, { isLoading, isSuccess, isError, }] = useGetUserMutation();

//     const dispatch = useDispatch();

//     const [___, setLoading] = useState<boolean>(true);
//     const [____r, setError] = useState<string | null>(null);

//     const navigate = useNavigate()


//     const onSubmit = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await login({ email: 'mayurbhoi200@gamil.com', password: '12345' }).unwrap();
//             console.log('res', res);
//             dispatch(setUser(res)); // Store login data in Redux
//             navigate('/lang')
//             // Navigate or do something after login success here
//         } catch (error) {
//             console.error('Login failed:', error);
//             // Handle error UI here (show message, etc.)
//         } finally {
//             // await getProfileByUserId('').unwrap();
//         }
//     };



//     // const loadApp = async () => {
//     //     await getUser('').unwrap();
//     //     await getProfileByUserId('').unwrap();
//     //     navigate('/lang')
//     // }



//     // const googleLogin = useGoogleLogin({
//     //     onSuccess: async (tokenResponse) => {
//     //         try {
//     //             console.log('tokenResponse', tokenResponse);
//     //             const { access_token } = tokenResponse;

//     //             // Call your backend to handle Google login with the token
//     //             const response = await fetch('http://localhost:5000/api/v1/auth/google-login', {
//     //                 method: 'POST',
//     //                 headers: { 'Content-Type': 'application/json' },
//     //                 body: JSON.stringify({ token: access_token }),
//     //             });

//     //             const data = await response.json();

//     //             if (!response.ok) {
//     //                 throw new Error(data?.message || 'Login failed');
//     //             }

//     //             // `data` should have your user and token info from the backend
//     //             dispatch(setCredentials(data)); // Store login data in Redux
//     //             navigate('/lang');
//     //         } catch (error) {
//     //             console.error('Google login failed:', error.message || error);
//     //         }
//     //     },
//     //     onError: () => {
//     //         console.log('Login Failed');
//     //     },
//     // });




//     return (
//         <div className="h-[100vh]  bg_primary  text-gray-900 flex justify-center">
//             <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow  sm:rounded-lg flex flex-col-reverse  sm:flex-row justify-center flex-1">
//                 <div className="lg:w-1/2  rounded-t-2xl xl:w-5/12 p-6 sm:p-12 ">
//                     <div>
//                         <img src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
//                             className="w-mx-auto" alt='logo' />
//                     </div>
//                     <div className=" md:mt-12 flex flex-col items-center ">
//                         <div className="w-full flex-1 mt-8">
//                             <div className="flex flex-col items-center">
//                                 {/* <GoogleLogin
//                                     onSuccess={handleLoginSuccess}
//                                     onError={handleLoginError}
//                                 /> */}
//                                 <GoogleLogin />
//                                 {/* <button
//                                     onClick={() => googleLogin()}
//                                     className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-pink-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
//                                     <div className="bg-white p-2 rounded-full">
//                                         <svg className="w-4" viewBox="0 0 533.5 544.3">
//                                             <path
//                                                 d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
//                                                 fill="#4285f4" />
//                                             <path
//                                                 d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
//                                                 fill="#34a853" />
//                                             <path
//                                                 d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
//                                                 fill="#fbbc04" />
//                                             <path
//                                                 d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
//                                                 fill="#ea4335" />
//                                         </svg>
//                                     </div>
//                                     <span className="ml-4">
//                                         Sign In with Google
//                                     </span>
//                                 </button> */}

//                             </div>

//                             <div className="my-5 border-b text-center">
//                                 <div
//                                     className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                                     Or sign In with Cartesian Phone
//                                 </div>
//                             </div>


//                             <div className="mx-auto max-w-xs">
//                                 <LoginForm onSubmit={onSubmit} />
//                                 {/* <input
//                                     className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                                     type="text" placeholder="Mobile Number" />
//                                 <input
//                                     className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                                     type="password" placeholder="Password" /> */}
//                                 {/* <p className="mt-6 text-xs text-gray-600 text-center">
//                                     I agree to abide by Cartesian Kinetics
//                                     <a href="#" className="border-b border-gray-500 border-dotted">
//                                         Terms of Service
//                                     </a>
//                                     and its
//                                     <a href="#" className="border-b border-gray-500 border-dotted">
//                                         Privacy Policy
//                                     </a>
//                                 </p> */}
//                                 {!singUp && <a className="text-indigo-700 my-2 hover:text-pink-700 text-sm  float-right" href="#">Forgot Password ?</a>
//                                 }                                <button onClick={() => formRef.current?.submit()}
//                                     className="mt-5 tracking-wide font-semibold primary-button text-white-500 w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

//                                     {singUp ? <FaUser className='mx-2' size={20} /> : <FaArrowRight className='mx-2' size={20} />}
//                                     <span className="ml-">
//                                         {singUp ? "Sign Up" : "Sign In"}
//                                     </span>
//                                 </button>

//                             </div>
//                             {!singUp ? <p onClick={() => setSingUp(true)} className="text-center mt-3 text-sm text-gray-500">Don&#x27;t have an account yet?
//                                 <a href="#!"
//                                     className="font-semibold text-gray-600 hover:underline hover:text-pink-700 focus:outline-none">Sign
//                                     up
//                                 </a>.
//                             </p> : <p onClick={() => setSingUp(false)} className="text-center mt-3 text-sm text-gray-500"> have an account
//                                 <a href="#!"
//                                     className="font-semibold text-gray-600 hover:underline hover:text-pink-700 focus:outline-none">Sign in
//                                 </a>.
//                             </p>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex-1 bg_primary md:bg-green-100 text-center content-end  lg:flex">
//                     <div className="md:m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat min-h-[260px] md:min-h-[300px]"
//                         style={{ backgroundImage: `url(${welcome})` }}
//                     >
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// interface LoginFormValues {
//     mobile: string;
//     password: string;
// }

// interface LoginFormProps {
//     onSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
//     const initialValues: LoginFormValues = {
//         mobile: '',
//         password: '',
//     };

//     const validationSchema = Yup.object().shape({
//         mobile: Yup.string()
//             .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
//             .required('Mobile number is required'),
//         password: Yup.string()
//             .min(6, 'Password must be at least 6 characters')
//             .required('Password is required'),
//     });

//     return (
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//             <Form className="space-y-5">
//                 <div>
//                     <Field
//                         name="mobile"
//                         type="text"
//                         placeholder="Mobile Number"
//                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     />
//                     <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                     <Field
//                         name="password"
//                         type="password"
//                         placeholder="Password"
//                         className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     />
//                     <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>
//             </Form>
//         </Formik>
//     );
// };






