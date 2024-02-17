'use client';
import { paths } from '@/app/paths/paths';
import { Logout } from '@/slices/user';
import { useDispatch } from '@/store';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react'



const NavbarContent = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(Logout())
        deleteCookie('authToken');
        router.push(paths.auth.login)
        router.refresh()

    }

  return (
    <div className='w-full h-[10vh] shadow-sm shadow-blue-500 px-7 flex justify-between items-center'>
        <h1 className='font-bold text-xl'>Todo<span className='text-blue-500'>app</span></h1>
        <button className='btn-effect' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavbarContent