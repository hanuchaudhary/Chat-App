import z from "zod"

export const projectSchema = z.object({
    name: z.string().min(1, { message: "Project name must have atleast 1 character" }).max(20, { message: "Project name can only contain 20 characters" })
})

export const projectUpdateSchema = z.object({
    userIds: z.array(z.string().min(1, { message: "ID must have at least 1 character" }))
})