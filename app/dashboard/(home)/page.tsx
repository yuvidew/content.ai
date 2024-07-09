"use client"
import { api } from "@/convex/_generated/api";
import { CardContainer } from "../_components/CardContainer";
import { Header } from "../_components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "convex/react";




export default function DashBoardHome(){
    const getAllNote = useQuery(api.documents.getNote) 
    const getSavedNote = useQuery(api.documents.getSavedNote)
    const getFavoriteNote = useQuery(api.documents.getFavoriteNote)
    return (
        <div className="w-full">
            <Header/>
            <section className=" container mt-[2rem]  ">
                <Tabs defaultValue="all" className="w-full ">
                    <TabsList className="lg:w-[33rem] sm:w-full ">
                        <TabsTrigger value="all" className=" w-full lg:text-[.9rem] md:text-[.8rem] sm:text-[.7rem] text-[.65rem]" >All Content  <span className="ml-[.9px]">({getAllNote?.length})</span></TabsTrigger>
                        <TabsTrigger value="saved" className=" w-full lg:text-[.9rem] md:text-[.8rem] sm:text-[.7rem] text-[.65rem]" >Saved Content <span className="ml-[.9px]">({getSavedNote?.length})</span></TabsTrigger>
                        <TabsTrigger value="favorite" className=" w-full lg:text-[.9rem] md:text-[.8rem] sm:text-[.7rem] text-[.65rem]" >Favorite Content  <span className="ml-[.9px]">({getFavoriteNote?.length})</span></TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className=" h-[70vh] mt-[1rem] overflow-y-auto ">
                        <CardContainer cardData={getAllNote} />
                    </TabsContent>
                    <TabsContent value="saved" className=" h-[70vh] mt-[1rem] overflow-y-auto ">
                        <CardContainer 
                            cardData={getSavedNote} 
                            text={"Empty saved note..."} 
                        />
                    </TabsContent>
                    <TabsContent value="favorite" className=" h-[70vh] mt-[1rem] overflow-y-auto ">
                        <CardContainer cardData={getFavoriteNote}  
                            text={"Empty favorite note..."} 
                        />
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    )
}