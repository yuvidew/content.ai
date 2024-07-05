
import { Header } from "../../_components/Header";
import { Section } from "./_components/Section";


interface NoteIdProps {
    params: {
        [key: string]: any; 
    };
}

export default function NoteId({ params }: NoteIdProps) {
    return (
        <div className="w-full">
            <Header />
            <div className=" container">
                <Section id={params.noteId} />
            </div>
        </div>
    );
}
