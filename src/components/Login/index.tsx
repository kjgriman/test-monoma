'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRefMounted } from '../../hooks/useRefMounted';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Login() {
    const isMountedRef = useRefMounted();
    const { login } = useAuth() as any;
    const router = useRouter();
    const query = useSearchParams();
    const pathname = usePathname()

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const formik = useFormik({
        initialValues: {
            email: 'kerbin@test.com',
            password: 'Admin123.',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('The email provided should be a valid email address')
                .max(255)
                .required('The email field is required'),
            password: Yup.string()
                .min(6)
                .max(10)
                .required('The password field is required')
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                await login(values.email, values.password);


                if (isMountedRef()) {
                    const backTo =
                       '/dashboard';
                    router.push(backTo);
                }
            } catch (err) {
                console.error(err);
                if (isMountedRef()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>

            </div>

            <div className='bg-gray-800 flex flex-col justify-center'>
                <form noValidate onSubmit={formik.handleSubmit} className='max-w-[400px] w-full mx-auto rounded-lg  p-8 px-8'>

                    <h2 className='text-4xl text-gray-300 font-bold text-center'>SIGN IN</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Username</label>
                        <input
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        />
                        {Boolean(formik.touched.email && formik.errors.email) && (

                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {formik.touched.email && formik.errors.email}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-gray-400 py-2 relative'>
                        <label>Password</label>
                        <input
                            className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}

                        />
                        {Boolean(formik.touched.password && formik.errors.password) && (
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {formik.touched.password && formik.errors.password}
                            </span>
                        )}
                        <label className="flex items-center mt-2 absolute top-1/2 left-[calc(100%_-_2rem)]">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 hidden"
                                checked={isPasswordVisible}
                                onChange={togglePasswordVisibility}
                            />
                            <span className="text-sm text-white-600">{isPasswordVisible ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}</span>
                        </label>
                    </div>
                    <button 
                    type="submit"
                    className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                    >
                        { formik.isSubmitting ? (
                            <div role="status" className='inline-flex '>
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className='pt-1'>Loading...</span>
                        </div>
                        ) : 'SIGN IN'}
                        
                        </button>

                </form>
            </div>
        </div>
    )
}