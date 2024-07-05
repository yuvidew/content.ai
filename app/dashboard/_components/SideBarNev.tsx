import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';

interface props {
    children : React.ReactNode
}

export const SideBarNev:React.FC<props> = ({children}) => {
    return (
        <Sheet  >
            <SheetTrigger>
                <Button size={"icon"} variant={"mixBg"}>
                    <LayoutGrid />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0'>
                {children}
            </SheetContent>
        </Sheet>
    )
}
