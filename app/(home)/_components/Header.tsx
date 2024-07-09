"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { ToolTipProvider } from '@/components/Providers/ToolTipProvider'

export const Header: React.FC = () => {
    const {isAuthenticated , isLoading} = useConvexAuth()
    return (
        <header className=' flex items-center justify-center lg:h-[6rem] md:h-[6rem] h-[5rem] fixed top-0 left-1/2 transform -translate-x-1/2  w-full z-50  container m-auto'>
            <main className=' w-full flex items-center justify-between bg-stone-50 h-[70%] rounded-lg p-2 shadow-lg px-5'>
                <Logo classText='lg:block hidden' />
                <div className=' w-full flex items-center lg:justify-end justify-between gap-4'>
                    {isLoading && (
                        <div className='w-full flex items-center justify-end'>
                            <Spinner/>
                        </div>
                    )}

                    {!isAuthenticated && !isLoading && (
                        <>
                            <SignInButton 
                                mode='modal'
                            >
                                <Button size={"sm"} variant={"ghost"} >
                                    Log in
                                </Button>
                            </SignInButton>
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
                            <UserButton 
                                afterSignOutUrl='/'
                            />
                            <div className='lg:block hidden'>
                                <ToolTipProvider text='Generate Content' classText='lg:hidden block'>
                                    <Button variant={"mixBg"} size={"sm"} asChild >
                                        <Link href={"/dashboard"} >
                                            <Sparkles className=' lg:mr-2 md:mr-2 sm:mr-2 mr-0 h-5 w-5 ' />
                                            <span className='lg:block md:block sm:block hidden'>Generate Content</span>
                                        </Link>
                                    </Button>
                                </ToolTipProvider>
                            </div>
                            <div className='lg:hidden block'>
                                <ToolTipProvider text='Generate Content' classText='lg:hidden block'>
                                    <Button  variant={"mixBg"} size={'icon'}>
                                        <Link href={"/dashboard"} >
                                            <Sparkles className=' lg:mr-2 md:mr-2 sm:mr-2 mr-0 h-5 w-5 ' />
                                        </Link>
                                    </Button>
                                </ToolTipProvider>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </header>
    )
}
