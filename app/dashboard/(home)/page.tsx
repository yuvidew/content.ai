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
            <section className=" container mt-[2rem]">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList>
                        <TabsTrigger value="all">All Content  <span className=" ml-2">({getAllNote?.length})</span></TabsTrigger>
                        <TabsTrigger value="saved">Saved Content <span className=" ml-2">({getSavedNote?.length})</span></TabsTrigger>
                        <TabsTrigger value="favorite">Favorite Content  <span className=" ml-2">({getFavoriteNote?.length})</span></TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <CardContainer  cardData={getAllNote} />
                    </TabsContent>
                    <TabsContent value="saved">
                        <CardContainer 
                            cardData={getSavedNote} 
                            text={"Empty saved note..."} 
                        />
                    </TabsContent>
                    <TabsContent value="favorite">
                        <CardContainer cardData={getFavoriteNote}  
                            text={"Empty favorite note..."} 
                        />
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    )
}