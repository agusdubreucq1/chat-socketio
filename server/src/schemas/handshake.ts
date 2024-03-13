import z from 'zod'

export const handshakeSchema = z.object({
    auth: z.object({
        token: z.string(),
        // chatId: z.string(),
    })
})