"use client"

import { useQuery } from "convex/react";
import { Header } from "../_components/Header";
import { api } from "@/convex/_generated/api";
import { CardContainer } from "../_components/CardContainer";

export default function SavedHome(){
    const getSavedNote = useQuery(api.documents.getSavedNote)
    return (
        <div className="w-full">
            <Header/>
            <div className=" container mt-[2rem]">
                <CardContainer
                    cardData={getSavedNote}
                    text={"Empty saved note..."} 
                />
            </div>
        </div>
    )
}