import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDUSapOAwSAGlObffxbKKWDjfZVbRY2S5c');

const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    topP : 0.95 ,
    topK:64 ,
    maxOutputTokens : 8192,
    responseMimeType:"text/plain"
}

export const chatSession = model.startChat({
    generationConfig , 
    history : []
})