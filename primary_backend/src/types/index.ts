//defigning all the zod typres
// inputs 
/*
user-->
signup-->
username, password
signin-->

username , possword


*/

import {z} from 'zod'

export const SignupSchema  = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    name: z.string()
})

export const SigninSchema = z.object({
    username:z.string(),
    password: z.string()
})


export const ZapCreateSchema  = z.object({
    availabletriggerId:z.string(),
    triggerMetadata:z.any().optional(),
    actions:z.array(z.object({
        availableactionId:z.string(),
        actionMetadata:z.any().optional()
    }))
}) 