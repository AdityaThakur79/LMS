import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const mainLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default mainLayout
