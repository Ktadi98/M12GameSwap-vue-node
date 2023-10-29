import z from "zod";

const uploadedPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    genre: z.string(),
    price: z.number(),
    state: z.enum("new", "good", "satisfactory"),
    //images: 

});

export function validateUploadedPost(input) {
    return uploadedPostSchema.safeParse(input);
}

