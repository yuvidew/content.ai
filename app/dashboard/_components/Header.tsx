import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { CreateContent } from './CreateContent'
import { SideBarNev } from './SideBarNev'
import { MenuBar } from './MenuBar'
import { ToolTipProvider } from '@/components/Providers/ToolTipProvider'

export const Header: React.FC = () => {
    return (
        <header className='border-b' >
            <main className=' container h-[5rem] flex items-center justify-between '>
                <div className='lg:hidden block'>
                    <SideBarNev>
                        <MenuBar/>
                    </SideBarNev>
                </div>
                <h1 className='lg:text-[1.3rem] md:text-[1.2rem] sm:text-[1rem] text-[.9rem] font-medium text-purple-700'>
                    Welcome back!
                </h1>
                <div className=' flex items-center justify-end'>
                    <CreateContent>
                        <ToolTipProvider text='Create Content' classText='lg:hidden block' >
                            <Button className='lg:flex hidden' variant={"mixBg"} size={"sm"} >
                                <Plus className=' h-5 w-5 lg:mr-2' />
                                <span className='lg:flex hidden'>Create Content</span>
                            </Button>
                            <Button className='lg:hidden flex' variant={"mixBg"} size={"icon"} >
                                <Plus className=' h-5 w-5 lg:mr-2' />
                            </Button>
                        </ToolTipProvider>
                    </CreateContent>
                </div>
            </main>
        </header>
    )
}
