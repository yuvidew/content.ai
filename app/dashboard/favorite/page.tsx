"use client"

import { useQuery } from "convex/react";
import { Header } from "../_components/Header";
import { api } from "@/convex/_generated/api";
import { CardContainer } from "../_components/CardContainer";

export default function FavoriteHome(){
    const getFavoriteNote = useQuery(api.documents.getFavoriteNote)
    return (
        <div className="w-full">
            <Header/>
            <div className=" container mt-[2rem]">
                <CardContainer
                    cardData={getFavoriteNote}
                    text={"Empty favorite note..."}
                />
            </div>
        </div>
    )
}