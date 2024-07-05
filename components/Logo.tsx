import React from 'react'
import { Button } from './ui/button'
import { Boxes } from 'lucide-react'

interface props {
    classText : string
}

export const Logo: React.FC<props> = ({classText}) => {
    return (
        <div className=' w-full flex items-center gap-3'>
            <Button variant="mixBg" size={"icon"} >
                <Boxes className='h-6 w-6 ' strokeWidth={1.5} />
            </Button>
            <h2 className={`${classText} text-[1.3rem] font-medium text-purple-700`}>Content.AI</h2>
        </div>
    )
}
