import z from "zod";

const registrationSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
});

export function validateUser(input) {
    return registrationSchema.safeParse(input);
}

export function validateLogin(input) {
    return loginSchema.safeParse(input);
}