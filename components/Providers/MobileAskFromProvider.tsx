import React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { CircleX, MessageCircleQuestion } from 'lucide-react'


interface props {
  children : React.ReactNode,
  classText : string
}

export const MobileAskFromProvider: React.FC<props> = ({children , classText}) => {

  return (
    <Drawer >
      <DrawerTrigger className={`${classText} w-full mt-2`}>
        <Button className=' w-full' size={"sm"} variant={"mixBg"}>
          Ask your Query <MessageCircleQuestion className=' ml-2 h-5 w-5' />
        </Button>
        <br />
      </DrawerTrigger>
      <DrawerContent  className={`${classText} px-5 py-1 pb-4 `}>
        <div className=' flex items-center justify-end'>
          <DrawerTrigger>
            <CircleX className=' opacity-60' />
          </DrawerTrigger>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
