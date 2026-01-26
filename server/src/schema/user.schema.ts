import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(4, "Password must be at least 4 characters long"),
  });

export type CreateUserInputType = z.infer<typeof createUserSchema>;
