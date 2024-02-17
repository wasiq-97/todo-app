import React from 'react'
import RegisterPage from '@/views/auth/register'
import { redirect } from 'next/navigation';
const page = async () => {
 
  return (
    <div>
        <RegisterPage />
    </div>
  )
}

export default page