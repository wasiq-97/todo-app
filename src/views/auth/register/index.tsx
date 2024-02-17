'use client';

import React, { useState } from 'react'

//icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

//services
import { IRegister } from '@/types/auth.interface';
import { register } from '@/services/handlers/auth.handlers';

//libraries
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const registerationSchema = yup.object().shape({
    firstName: yup.string().required(" First Name is required"),
    lastName: yup.string().required(" First Name is required"),
    username: yup.string().min(5,'Username could be of min 5 letter long').required(" First Name is required"),
    password: yup.string().min(6).required(" First Name is required")
})

const Register = () => {
    //states
    const [showPassword, setShowPassword] = useState(false)
    //hooks
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            username:'',
            password: ""
        } as IRegister,
        validationSchema:registerationSchema,
        onSubmit : (values: IRegister) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: IRegister) => {
      try {
        const res:any = await register(values);
        if(res.data){
          toast.success('User has been registered successfully')
          router.push('/login')
        }
      } catch (error:any) {
        let msg = error.response?.message || "Something went wrong"
        toast.error(msg)
      }
    }

  
    return (
        <div className="h-screen flex items-center justify-center">
          <form
            className=" p-8 rounded shadow-lg shadow-blue-500 max-w-md w-full"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl font-semibold mb-6">Registration Form</h2>
    
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                ) : null}
              </div>
        
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                ) : null}
              </div>
    
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

              <a href='/login'>
                <p>Already have an account? <span className='text-blue-400'>login</span></p>
              </a>
              {/* Submit Button */}
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      );
}

export default Register