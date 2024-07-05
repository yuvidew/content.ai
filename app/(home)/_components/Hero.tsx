"use client"

import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Hero:React.FC = () => {
    const {isAuthenticated , isLoading} = useConvexAuth()
    return (
        <section className=' flex items-center justify-center flex-col gap-3 py-5 h-[35rem]'>
            <h2 className=' text-[1.3rem] text-stone-800 opacity-65'>AI Content Generator</h2>
            <h1 className=' capitalize text-stone-900 opacity-90 lg:text-[4.5rem] md:text-[2.5rem] sm:text-[1.8rem] text-[1.9rem] font-bold w-[80%] text-center'>
                Elevate Your <span className=' text-purple-700'>Content</span> dominate search engines
            </h1>
            {isLoading && (
                <Button size={"icon"} variant={"secondary"}>
                    <Spinner size='lg' />
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <>
                    <SignInButton 
                        mode='modal'
                    >
                        <Button size={"sm"} variant={"mixBg"} >
                            Get Start <ArrowRight className='h-5 w-5 ml-2' />
                        </Button>
                    </SignInButton>
                </>    
            )}
            {isAuthenticated && !isLoading && (
                <>
                    <Button variant={"mixBg"}   asChild>
                        <Link href={"/dashboard"} className=' flex items-center'>
                            <Sparkles className=' mr-2 h-5 w-5' />
                            Generate Content
                        </Link>
                    </Button>
                </>
            )}
        </section>
    )
}
