import React from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'


interface props {
    id : Id<"documents">
    onContent : (newValue : string) => void;
}

export const ContentList: React.FC<props> = ({id , onContent}) => {
    const NoteById = useQuery(api.documents.getById , {
        noteId : id
    })
    return (
        <section className=' h-[30rem]   overflow-y-auto'>
            <Accordion type="single" collapsible className=" ">
                {NoteById !== undefined && NoteById.contents?.length !==0  ? (
                    NoteById.contents?.map((ele , index) => (
                        <AccordionItem key={index} value={index.toString()} className=' w-full'>
                            <AccordionTrigger className='truncate  '>
                                <p className=' truncate w-[60%]'>
                                    {ele.title}
                                </p>
                            </AccordionTrigger>
                            <AccordionContent 
                                onClick={() => onContent(ele.content)}
                                className=' cursor-pointer'
                            >
                                {ele.title}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                ) : (
                    <Skeleton className=' w-full  h-[8rem]' />
                )}
            </Accordion>
        </section>
    )
}
