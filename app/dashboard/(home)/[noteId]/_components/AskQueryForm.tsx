
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, SubmitHandler } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/app/hook/UseAI';
import Spinner from '@/components/Spinner';
import { Check, Copy, Save } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { ToolTipProvider } from '@/components/Providers/ToolTipProvider';

interface IFormInput {
    title: string;
    aboutTitle: string;
}

interface props {
    onContent : (newValue : string) => void;
    content : string;
    aiPrompt? : string;
    id : Id<"documents">
}

export const AskQueryForm: React.FC<props> = ({onContent , aiPrompt , id , content}) => {
    const searchParams = useSearchParams();
    const { register, handleSubmit, formState: { errors }  , setValue} = useForm<IFormInput>();
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [isCopy , setIsCopy] = useState<boolean>(false)
    const addContent = useMutation(api.documents.addContents);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    let intervalId:any = null;

    useEffect(() => {
        setValue('title', searchParams.get('title') || '');
        setValue('aboutTitle', searchParams.get('aboutTitle') || '');
    }, [searchParams, setValue]);
    

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        setIsLoading(true)
                
        newSearchParams.set('title', data.title);
        newSearchParams.set('aboutTitle', data.aboutTitle);

        const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
        window.history.pushState(null, '', newUrl);

        const result = await chatSession.sendMessage(`${data.title} , ${data.aboutTitle} , ${aiPrompt}`)

        setIsLoading(false)
        onContent(result?.response.text())
        
    };
    
    
    const onSave = async () =>{

        const promise = addContent({
            noteId : id ,
            contents : {
                title : `${newSearchParams.get('title')} , ${newSearchParams.get('aboutTitle')} , ${aiPrompt}`,
                content : content
            }
        })

        toast.promise(promise , {
            loading : 'Save a new content..',
            success : "New content saved!",
            error : 'Failed to save a new content.'
        })

    }

    const onCopy = async () => {
        setIsCopy(true);
    
        intervalId = setInterval(() => {
            navigator.clipboard.writeText(content);
        }, 2000);
    
        setTimeout(() => {
            clearInterval(intervalId);
            setIsCopy(false);
        }, 10000);
    };
    
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return (
        <div  className=' mt-5 w-full'>
            <div className=' mb-1'>
                <Label 
                    htmlFor='query'
                    className=' text-[1rem] block mb-4 font-light opacity-75'
                >
                    What is your query title?
                </Label>
                <Input 
                    id='query'
                    {...register("title", { required: "Query title is required !" })} 
                    placeholder='Enter here..'
                />
                {errors.title && <p className=' mt-2 text-red-500'>{errors.title.message}</p>}
            </div>
            <br />
            <div>
                <Label 
                    htmlFor='query-about'
                    className=' text-[1rem] block mb-4 font-light opacity-75'
                >
                    What is about your query ?
                </Label>
                <Textarea 
                    id='query-about'
                    {...register("aboutTitle", { required: "Query about is required !" })} 
                    placeholder='Enter here..'
                    className=' h-[14rem] resize-none'
                />
                {errors.aboutTitle && <p className=' mt-2 text-red-500'>{errors.aboutTitle.message}</p>}
            </div>
            <br />
            <div className=' flex items-center gap-3'>
                <Button 
                    type='submit' 
                    variant={"mixBg"} size={"sm"} 
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <Spinner color={"transparent"} /> : "Submit"}
                </Button>
                <Button 
                    type='button' 
                    variant={"green"}  
                    size={"sm"} 
                    onClick={onSave}
                    disabled = {content.length == 0 ? true : false}
                >
                    <Save className=' h-4 w-4 mr-1' />
                    Save
                </Button>
                <Button 
                    typeof={'button'}
                    variant={"destructive"} 
                    size={"sm"} 
                    onClick={onCopy}
                    disabled = {content.length == 0 ? true : false}
                >
                    <ToolTipProvider text='Copy'>
                        {isCopy ? <Check className=' h-4 w-4' /> :<Copy className=' h-4 w-4' />}
                    </ToolTipProvider>
                </Button>
            </div>
        </div>
    )
}
