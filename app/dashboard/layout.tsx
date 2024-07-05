'use client'

import Spinner from '@/components/Spinner'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { MenuBar } from './_components/MenuBar'

export default function layout({
    children,
}: Readonly<{
    children:React.ReactNode
}>){
    const {isAuthenticated , isLoading} = useConvexAuth()

    if(isLoading){
        return (
            <div className=' h-[100vh] w-full flex items-center justify-center'>
                <Spinner size='lg' />
            </div>
        )
    }

    if(!isAuthenticated) return redirect("/")

    return (
        <div className=' flex items-start '>
            <div className='lg:block hidden'>
                <MenuBar/>
            </div>
            {children}
        </div>
    )
}
