import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6, "Password must be at least 6 characters long")
    
  });

export type CreateUserInputType = z.infer<typeof createUserSchema>;
