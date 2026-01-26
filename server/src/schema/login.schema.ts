import {z} from "zod" ;

export const loginSchema = z.object({
    username:z.string(),
    password:z.string(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;