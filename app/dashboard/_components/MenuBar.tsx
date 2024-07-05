'use client'

import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'
import { Bookmark, CircleAlert, Home, Settings, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import UserItem from './UserItem'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export const MenuBar = () => {
    const route = usePathname()
    const getSavedNote = useQuery(api.documents.getSavedNote);
    const getFavoriteNote = useQuery(api.documents.getFavoriteNote);

    return (
        <header className=' h-[100vh] lg:w-[20rem] w-full bg-stone-100 border-r border-stone-300'>
            <div className=' container flex items-center justify-center w-full h-[5rem] border-b border-stone-300'>
                <Logo 
                    classText={"block"}
                />
            </div>
            <main className='py-6 w-[80%] m-auto'>
                <h3 className=' mb-[2rem] opacity-55 ' >Menu</h3>
                <ul className=''>
                    <li className=' mb-4'>
                        <Link 
                            href={'/dashboard'}  
                            className={
                                cn(' flex items-center gap-2 py-2 px-3 rounded-md border-l-8 ' , 
                                    route == "/dashboard" || route.includes("/dashboard") ? 
                                    "bg-stone-200 text-purple-700  border-l-purple-700"
                                    : " bg-white opacity-50"
                                )
                            }
                        >
                            <Home className=' h-5 w-5' />
                            <h2 className = "text-[.9rem]">Home</h2>
                        </Link>
                    </li>
                    <li className=' mb-4'>
                        <Link 
                            href={'/dashboard/saved'}  
                            className={
                                cn(' flex items-center justify-between gap-2 py-2 px-3 rounded-md border-l-8 ' , 
                                    route.includes("/saved") ? 
                                    "bg-stone-200 text-purple-700  border-l-purple-700  "
                                    : " bg-white  text-stone-500"
                                )
                            }
                        >
                            <div className=' flex items-center gap-2'>
                                <Bookmark className=' h-5 w-5' />
                                <h2 className = "text-[.9rem]">Saved Content 
                                </h2>
                            </div>
                            <span className=' ml-2'>({getSavedNote?.length})</span>
                        </Link>
                    </li>
                    <li className=' mb-4'>
                        <Link 
                            href={'/dashboard/favorite'}  
                            className={
                                cn(' flex items-center justify-between gap-2 py-2 px-3 rounded-md border-l-8 ' , 
                                    route.includes("/favorite") ? 
                                    "bg-stone-200 text-purple-700  border-l-purple-700"
                                    : " bg-white text-stone-500"
                                )
                            }
                        >
                            <div className=' flex items-center gap-2'>
                                <Star className=' h-5 w-5' />
                                <h2 className = "text-[.9rem]">My Favorite </h2>
                            </div>
                            <span className=' ml-2'>({getFavoriteNote?.length})</span>
                        </Link>
                    </li>
                </ul>
                <br />
            </main>
            <main className='py-6 w-[80%] m-auto border-t-2 border-t-stone-300'>
                <h3 className='  mb-[2rem] opacity-55 ' >Generale</h3>
                <ul>
                    <li className=' flex items-center gap-3 opacity-65 mb-4'>
                        <CircleAlert className=' h-5 w-5' />
                        <span>Support & Help</span>
                    </li>
                    <li className=' flex items-center gap-3 opacity-65 mb-4'>
                        <Settings className=' h-5 w-5' />
                        <span>Settings</span>
                    </li>
                </ul>
            </main>
            <main className='h-[30%] w-[80%] m-auto flex items-start justify-end flex-col '>
                <div className='border-t-2 border-t-stone-300 w-full py-5' >
                    <UserItem/>
                </div>
            </main>
        </header>
    )
}
