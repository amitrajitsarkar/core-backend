import {z} from "zod" ;

export const deleteUserSchema = z.object({
    username : z.string().min(2),
});

export type deleteUserSchemaType = z.infer<typeof deleteUserSchema>;