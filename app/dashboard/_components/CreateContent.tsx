"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import Spinner from "@/components/Spinner";
import { category } from "@/components/Category";

interface Props {
    children: ReactNode;
}



export const CreateContent: React.FC<Props> = ({children}) => {
    const router = useRouter()
    const [isLoading , setIsLoading] = useState(false)
    const [theCategory , setTheCategory] = useState<any>({
        category : "",
        aiPrompt : ""
    })

    const create = useMutation(api.documents.create)

    const onSubmit = () =>{
        const promise = create({
            category : theCategory.category,
            aiPrompt : theCategory.aiPrompt,
        }).then((id) => {
            setIsLoading(true)
            router.push(`/dashboard/${id}`)
        }).catch(e => {
            setIsLoading(true)
        }).finally(() => {
            setIsLoading(false)
        })

        toast.promise(promise , {
            loading : 'Creating a new note..',
            success : "New note Created!",
            error : 'Failed to create a new note.'
        })
    }

    return (
        <Dialog>
        <DialogTrigger>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className=" flex items-center gap-1 font-medium text-purple-800 text-[1.2rem]">
                <Plus className=" h-6 w-6 " />
                <span>Create content</span>
            </DialogTitle>
            <br />
            <DialogDescription>
                <Select 
                    onValueChange={(index:any) => setTheCategory(category[index])}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue className=" placeholder:text-purple-800"  placeholder="Content category..." />
                    </SelectTrigger>
                    <SelectContent>
                        {category.map((ele , index) => (
                            <SelectItem key={index} value={index.toString()}>{ele.category}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <br />
                <Button 
                    className="w-full"
                    variant={"mixBg"}
                    onClick={onSubmit}
                >
                    {isLoading ? <Spinner color="light" /> : "Create"}
                </Button>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
