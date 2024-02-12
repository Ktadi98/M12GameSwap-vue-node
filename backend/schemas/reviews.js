import z from "zod";

const uploadedReviewSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(5).max(350),
    puntuaction: z.number().min(0).max(5)
});

export function validateUploadedReview(input) {
    return uploadedReviewSchema.safeParse(input);
}

