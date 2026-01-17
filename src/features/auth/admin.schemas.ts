import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().trim().min(1, "Invalid username or password."),
    password: z.string().min(8, "Invalid username or password.")
});

export type AdminLoginState = {
    error?: string;
};