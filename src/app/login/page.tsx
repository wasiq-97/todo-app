import React from 'react'
import LoginPage from '@/views/auth/login'
import { redirect } from 'next/navigation';

const page = async () => {
    
    return (
        <div>
            <LoginPage />
        </div>
    )
}

export default page