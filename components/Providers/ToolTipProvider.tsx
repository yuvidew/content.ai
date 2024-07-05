import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface props{
    children : React.ReactNode,
    text : string,
    classText? : string
}

export const ToolTipProvider : React.FC<props> = ({children , text , classText}) => {
    return (
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={classText}>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
