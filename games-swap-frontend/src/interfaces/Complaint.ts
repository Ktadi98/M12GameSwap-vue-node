import type { Product } from "./Product";
import type { UserClient } from "./UserClient";

export interface Complaint {
    complaint_id: number,
    complaint_motive: string,
    complaint_text: string,
    complaint_created_at: Date,
    complaint_status: boolean,
    user: UserClient,
    post: Product
}