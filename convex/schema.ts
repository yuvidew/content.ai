import {defineSchema , defineTable} from "convex/server"
import {v} from "convex/values"

export default defineSchema({
    documents : defineTable({
        category : v.string(),
        aiPrompt : v.string(),
        userId : v.string(),
        isSaved : v.boolean(),
        isFavorite : v.boolean(),
        contents : v.optional(v.array(
            v.object({
                title : v.string(),
                content : v.string(),
            })
        ))
    })
    .index("by_user" , ["userId"])
})