"use client"

import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight, BookOpen, ChevronRight, MessagesSquare, MonitorSmartphone, Sparkles, Ungroup } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const cardArray = [
    {
        icon : <MonitorSmartphone className='' /> ,
        heading : "25+ templates" ,
        text : "Responsive , and mobile-first project on the web",
    },
    {
        icon : <Ungroup className='' /> ,
        heading : "Customizable" ,
        text : "Components are easily customizable and extendable",
    },
    {
        icon : <BookOpen className='' /> ,
        heading : "Free To Use" ,
        text : "Every component and plugin is well documented",
    },
    {
        icon : <MessagesSquare className='' /> ,
        heading : "24/7 Support" ,
        text : "Contact us 24 hours a day , 7 days a week",
    },
]

export const Hero:React.FC = () => {
    const {isAuthenticated , isLoading} = useConvexAuth()
    return (
        <>
            <section className=' flex items-center justify-center flex-col gap-3 py-5 h-[35rem] pt-[8rem]'>
                <h2 className=' text-[1.3rem] text-stone-800 opacity-65 '>AI Content Generator</h2>
                <h1 className=' capitalize text-stone-800 opacity-90 lg:text-[3.5rem] md:text-[2.5rem] sm:text-[1.8rem] text-[1.9rem] font-bold w-[80%] text-center'>
                    Elevate Your <span className=' text-purple-700 underline'>Content</span> dominate search engines
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
            <section className=' grid grid-cols-4 gap-4 mb-[2rem]'>
                {cardArray.map((ele , index) => (
                    <Card key={index} className=' shadow-md'>
                        <CardHeader className=' flex-col items-start gap-2'>
                            <Button variant={"mixBg"} size={"icon"} >
                                {ele.icon}
                            </Button>
                            <CardTitle className=' mt-2 text-[1.1rem] text-stone-700'>{ele.heading}</CardTitle>
                            <p className=' text-[.9rem] text-stone-500'>{ele.text}</p>
                            <Link href={'/'} className=' flex items-center gap-2 text-[.8rem] text-blue-600'>
                                Learn more <ChevronRight className='h-4 w-4' />
                            </Link>
                        </CardHeader>
                    </Card>
                ))}
            </section>
            <br />
        </>
    )
}
