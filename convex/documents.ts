import { v } from "convex/values";
import {mutation , query} from "./_generated/server";
import {Doc , Id} from "./_generated/dataModel";
import { category } from "./Category";


export const create = mutation({
    args : {
        category : v.string(),
        aiPrompt : v.string(),
    } ,
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db.insert("documents" , {
            category : args.category,
            aiPrompt : args.aiPrompt,
            contents : [],
            userId,
            isSaved : false,
            isFavorite : false,
        })

        return document

    },
})



export const addContents = mutation({
    args : {
        noteId : v.id('documents'),
        contents : v.object({
            title : v.string(),
            content : v.string(),
        })
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.noteId) ;

        if(!existingNote){
            throw new Error("Not found")
        }
        
        if(existingNote.userId !== userId){
            throw new Error('Unauthorized');
        }

        
        existingNote.contents?.push(args.contents)
        

        const result = await ctx.db.patch(args.noteId , existingNote)

        return result
    },
}) 

export const addInSaved = mutation({
    args : {
        noteId : v.id('documents'),
        isSaved : v.boolean(),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.noteId) ;

        if(!existingNote){
            throw new Error("Not found")
        }
        
        if(existingNote.userId !== userId){
            throw new Error('Unauthorized');
        }

        existingNote.isSaved = args.isSaved

        console.log("object" , existingNote);

        const result = await ctx.db.patch(args.noteId , existingNote)

        return result
    },
})

export const addInFavorite = mutation({
    args : {
        noteId : v.id('documents'),
        isFavorite : v.boolean(),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.noteId) ;

        if(!existingNote){
            throw new Error("Not found")
        }
        
        if(existingNote.userId !== userId){
            throw new Error('Unauthorized');
        }

        existingNote.isFavorite = args.isFavorite

        const result = await ctx.db.patch(args.noteId , existingNote)

        return result
    },
})

export const deleteNoteById = mutation({
    args : {
        noteId : v.id('documents')
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.noteId);

        if(!document) {
            throw new Error('Not Authenticated');
        }

        if(!identity) {
            throw new Error('Not Authenticated');
        }

        const userId = identity.subject

        if(document.userId !== userId){
            throw new Error('Unauthorized');
        }

        const result = await ctx.db.delete(args.noteId)

        return result
    },
})

export const getNote = query({

    handler : async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db
        .query("documents")
        .withIndex("by_user" , q => q.eq("userId" , userId))
        .order("desc")
        .collect()

        return document
    },
})

export const getSavedNote = query({
    handler : async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db
        .query("documents")
        .withIndex("by_user" , q => q.eq("userId" , userId))
        .filter(q => q.eq(q.field("isSaved") , true))
        .order("desc")
        .collect()

        return document
    },
})

export const getFavoriteNote = query({
    handler : async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db
        .query("documents")
        .withIndex("by_user" , q => q.eq("userId" , userId))
        .filter(q => q.eq(q.field("isFavorite") , true))
        .order("desc")
        .collect()

        return document
    },
})

export const getById = query({
    args : {
        noteId : v.id('documents')
    },
    handler : async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.noteId);

        if(!document) {
            throw new Error('Not Authenticated');
        }

        if(!identity) {
            throw new Error('Not Authenticated');
        }
        const userId = identity.subject

        if(document.userId !== userId){
            throw new Error('Unauthorized');
        }

        return document
    },
})

export const getQueryById = query({
    args : {
        noteId : v.id('documents')
    },
    handler : async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.noteId);

        if(!document) {
            throw new Error('Not Authenticated');
        }

        if(!identity) {
            throw new Error('Not Authenticated');
        }
        const userId = identity.subject

        if(document.userId !== userId){
            throw new Error('Unauthorized');
        }

        return document.contents
    },
})

