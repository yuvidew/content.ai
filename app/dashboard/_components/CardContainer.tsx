"use client"


import { Skeleton } from '@/components/ui/skeleton'
import { EllipsisVertical, PackageOpen, Trash2 } from 'lucide-react'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import saved from "@/public/star-save.png";
import unsaved from "@/public/star.png"
import fav from "@/public/fav.png";
import unFav from "@/public/unfav.png"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { ToolTipProvider } from '@/components/Providers/ToolTipProvider'

interface props{
    cardData : any,
    text? : string
}

interface parameters{
    input : boolean ,
    id : Id<'documents'>
}



export const CardContainer: React.FC<props> = ({
    cardData,
    text,
}) => {

    const addInSave = useMutation(api.documents.addInSaved)
    const addInFavorite = useMutation(api.documents.addInFavorite)
    const deleteNoteById = useMutation(api.documents.deleteNoteById)

    if(cardData == undefined){
        return (
            <div className=' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 mt-[2rem]'>
                {[1 ,2 ,3 ,4 ,5].map((ele) => (
                        <Skeleton key={ele} className=" h-[15rem] rounded-md" />
                ))}
            </div>
        )
    }
    
    if(cardData.length == 0) {
        return (
            <div className=' w-full  h-[60vh] flex items-center justify-center'>
                <div className='flex items-center justify-center flex-col gap-4'>
                    <PackageOpen className=' h-[6rem] w-[6rem] opacity-60 text-center' />
                    <h3 className=' opacity-85 text-[1.2rem]'>{text}</h3>
                </div>
            </div>
        )
    }

    const onAddInSave = ({input , id}: parameters):any => {
        const promise = addInSave({
            noteId : id , 
            isSaved : input
        })

        toast.promise(promise , {
            loading : 'Save a new note..',
            success : "New note saved!",
            error : 'Failed to save a new note.'
        })
    }

    const onAddInFavorite =  ({input , id}: parameters):any => {
        const promise = addInFavorite({
            noteId : id , 
            isFavorite : input
        })

        toast.promise(promise , {
            loading : 'New note is adding on favorite..',
            success : "New note is added in favorite!",
            error : 'Failed to add a new note in favorite.'
        })
    }

    const onDelete = (id:Id<"documents">):any => {

        const promise = deleteNoteById({
            noteId : id
        })

        toast.promise(promise , {
            loading : 'Deleting a  note..',
            success : "Note is deleted!",
            error : 'Failed to delete a note.'
        })
    }

    return (
        <div className=' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-3 gap-y-1 overflow-y-auto mt-[2rem] h-[70vh]'>
            {cardData.map((ele:any) => (
                <Card key={ele._id} className='h-[15rem] border'>
                    <Link href={`/dashboard/${ele._id}`}>
                        <CardHeader className=''>
                            <CardTitle 
                                    className=' font-medium text-purple-500 py-1.5 px-4 rounded-full capitalize bg-purple-200 bg-opacity-40 text-[.8rem]'
                                >
                                    {ele.category}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='opacity-60' >There is no better advertisement campaign that is low cost and also successful at teh same time</p>
                        </CardContent>
                    </Link>
                    <CardFooter className='pb-1.5'>
                        <div className=' flex items-center justify-between  w-full border-t border-t-stone-300 pt-2'>
                            <div className='w-full '>
                                <ToolTipProvider text='Favorite' >
                                    <Button 
                                        size={"icon"}
                                        variant={"Transparent"}
                                        >
                                        {ele.isSaved ? 
                                            <Image 
                                                src={saved} 
                                                className='h-5 w-5' 
                                                alt='saved' 
                                                onClick={() => onAddInSave({ input:false , id: ele._id})}
                                            />
                                            :
                                                <Image 
                                                src={unsaved} 
                                                className='h-5 w-5' 
                                                alt='saved' 
                                                onClick={() => onAddInSave({ input:true , id: ele._id})}
                                                />
                                            }

                                    </Button>
                                </ToolTipProvider>
                            </div>
                            <div className=' w-full flex items-center justify-end gap-2'>
                                <ToolTipProvider text='Save'>
                                    <Button 
                                        size={"icon"}
                                        variant={"Transparent"}
                                    >

                                        {ele.isFavorite ? 
                                            <Image 
                                                src={fav} 
                                                className='h-5 w-5' 
                                                alt='saved' 
                                                onClick={() => onAddInFavorite({ input:false , id: ele._id})}
                                            
                                            />
                                            :
                                            <Image 
                                                src={unFav} 
                                                className='h-5 w-5' 
                                                alt='saved' 
                                                onClick={() => onAddInFavorite({ input:true , id: ele._id})}
                                            />
                                        }
                                    </Button>
                                </ToolTipProvider>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className=' outline-none'>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel 
                                            onClick={() => onDelete(ele._id)} 
                                            className='flex items-center gap-2 justify-between text-red-600 cursor-pointer'
                                        >
                                            <span className=' text-[.9rem]'>Delete</span> <Trash2/> 
                                        </DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
