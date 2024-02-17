import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import React from 'react'
import NavbarContent from './NavbarContent'

const Navbar = () => {
    const cookie = getCookie('authToken', { cookies })
    if (!cookie)
        return null

    return (
        <NavbarContent/>
    )
}

export default Navbar