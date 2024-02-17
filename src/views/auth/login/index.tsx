'use client';

import React, { useState } from 'react'

//icons
import { FaEye, FaEyeSlash } from "react-icons/fa";


//libraries
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ILogin } from '@/types/auth.interface';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { login } from '@/services/handlers/auth.handlers';
import { login as loginSlice } from '@/slices/user';
import { useDispatch } from '@/store';
import { setCookie } from 'cookies-next';

const LoginSchema = yup.object().shape({
    username: yup.string().min(5,'Username could be of min 5 letter long').required(" First Name is required"),
    password: yup.string().min(6).required(" First Name is required")
})

const Login = () => {
    //states
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    //hooks
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username:'kminchelle', // username for auth success
            password: "0lelplR" // password for auth success
        } as ILogin,
        validationSchema:LoginSchema,
        onSubmit : (values: ILogin) => {
            handleSubmit(values)
        }
    })

    /*
    * handle submit authenticate the user
    * If success then it sets token and user info into redux
    */
    const handleSubmit = async (values: ILogin) => {
      try {
        const response:any = await login(values)
        if(response.data){
          setCookie('authToken', response.data.token)
          dispatch(loginSlice({user:response?.data}))
          toast.success('Login success')
          router.push('/')
          router.refresh()
        }
      } catch (error:any) {
        let err = error?.response?.data?.message || "Something went wrong"
        toast.error(err)
      }
    }

  
    return (
        <div className="h-screen flex items-center justify-center">
          <form
            className=" p-8 rounded shadow-lg shadow-blue-500 max-w-md w-full"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl font-semibold mb-6">Login Form</h2>
    
            <div className="flex flex-col gap-4">
    
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm">{formik.errors.username}</div>
                ) : null}
              </div>
    
              <div>
                <label
                  htmlFor="psssword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <div className='flex items-center gap-2 bg-white rounded-md pr-3'>
                    <input
                    type={showPassword ? 'text' : 'password'} //toggle the eye icon
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md text-black"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                    {showPassword ? <FaEye className='cursor-pointer' color='black' onClick={() => setShowPassword(false)}/> : <FaEyeSlash className='cursor-pointer' color='black' onClick={() => setShowPassword(true)}/>}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>
              <a href='/register'>
                <p>Or <span className='text-blue-400'>Create an account</span></p>
              </a>
              {/* Submit Button */}
              <div className='mt-4'>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      );
}

export default Login