"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AskQueryForm } from './AskQueryForm'
import { EditorComp } from './Editor'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Skeleton } from '@/components/ui/skeleton'
import { ContentList } from './ContentList'
import { MobileAskFromProvider } from '@/components/Providers/MobileAskFromProvider'

interface props {
    id : Id<"documents">
}

export const Section: React.FC<props> = ({id}) => {
    const NoteById = useQuery(api.documents.getById , {
        noteId : id
    })
    const [content , setContent] = useState<any>("")


    return (
        <>
        <br />
        {NoteById !== undefined ? 
            <h1 className=' font-medium text-purple-500 py-2 px-4 rounded-full capitalize bg-purple-200 bg-opacity-40 text-[.9rem] inline-block'>
                {NoteById.category}
            </h1>
            :
            <Skeleton className=' w-[30%] h-[2rem]' />
        }
        <section className=' grid lg:grid-cols-3 grid-cols-1 gap-5 mt-7 w-full '>
            <div className=' lg:order-1 order-2 lg:block hidden'>
                <Tabs defaultValue="ask query" className="w-full">
                    <TabsList>
                        <TabsTrigger value="ask query">Ask Query</TabsTrigger>
                        <TabsTrigger value="your query list">Your Query List</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ask query" className='w-full'>

                        <AskQueryForm 
                            id={id}
                            content={content}
                            onContent={setContent} 
                            aiPrompt={NoteById?.aiPrompt}
                        />
                    </TabsContent>
                    <TabsContent value="your query list" className='w-full'>
                        <ContentList onContent={setContent} id={id} />
                    </TabsContent>
                </Tabs>
            </div>
            <div className=' lg:order-2 lg:col-span-2 order-1'>
                <EditorComp 
                    content={content}
                />
                <MobileAskFromProvider classText = {"lg:hidden block"}>
                    <Tabs defaultValue="ask query" className="w-full">
                        <TabsList className=' w-full mt-2'>
                            <TabsTrigger value="ask query" className='w-full'>Ask Query</TabsTrigger>
                            <TabsTrigger value="your query list" className='w-full'>Your Query List</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ask query" className='w-full'>
                            
                            <AskQueryForm 
                                id={id}
                                content={content}
                                onContent={setContent} 
                                aiPrompt={NoteById?.aiPrompt}
                            />
                        </TabsContent>
                        <TabsContent value="your query list" className='w-full'>
                            <ContentList onContent={setContent} id={id} />
                        </TabsContent>
                    </Tabs>
                </MobileAskFromProvider>
            </div>
        </section>
        </>
    )
}
