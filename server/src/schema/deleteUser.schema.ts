import {z} from "zod" ;

export const updateUserSchema = z.object({
    username: z.string().min(2),
    
});

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;