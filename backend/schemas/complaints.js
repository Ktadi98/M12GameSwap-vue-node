import z from "zod";

const uploadedComplaintSchema = z.object({
    motive: z.enum(["Uso inadecuado", "Contenido fraudulento", "Spam", "Otros"]),
    text: z.string().max(255),
});

export function validateUploadedComplaint(input) {
    return uploadedComplaintSchema.safeParse(input);
}

