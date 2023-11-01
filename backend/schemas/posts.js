import z from "zod";

const uploadedPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    platform: z.string(),
    genre: z.string(),
    price: z.number(),
    state: z.enum(["Nuevo", "Bueno", "Satisfactorio"]),
});

export function validateUploadedPost(input) {
    return uploadedPostSchema.safeParse(input);
}

