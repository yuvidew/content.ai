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
                <Boxes className='lg:h-5 lg:w-5 h-5 w-5' strokeWidth={1.5} />
            </Button>
            <h2 className={`${classText} text-[1.3rem] font-medium text-purple-700`}>Content.AI</h2>
        </div>
    )
}
