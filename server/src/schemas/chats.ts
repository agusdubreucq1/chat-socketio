import z from 'zod'

export const chatCreatedSchema = z.object({
    members: z.string({invalid_type_error: 'id must be a string'}).array().max(1),
})

export const groupCreatedSchema = z.object({
    name: z.string({invalid_type_error: 'name must be a string'}),
    members: z.string({invalid_type_error: 'members must be a string'}).array().min(1),
})