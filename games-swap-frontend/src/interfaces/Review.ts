import type { Product } from "./Product";
import type { UserClient } from "./UserClient";

export interface Review {
    review_id: number,
    user_buyer_id: UserClient,
    post_id: Product,
    review_title: string,
    review_description: string,
    review_puntuaction: number,
    review_created_at: Date,
    review_status: boolean
}