import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(2),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Must have an uppercase")
    .regex(/[a-z]/, "Must have a lowercase")
    .regex(/[!@#$%&]/, "Must have a special character")
    .refine((pwd) => {
      const match = (pwd.match(/[0-9]/g) || []).length;

      // if(match >=2) return true ;
      // return false ;  or simply

      return match >= 2;
    }, "Must have 2 numbers"),
});

export type CreateUserInputType = z.infer<typeof createUserSchema>;
