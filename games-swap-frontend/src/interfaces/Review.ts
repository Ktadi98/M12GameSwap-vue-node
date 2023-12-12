import type { Product } from "./Product";
import type { UserClient } from "./UserClient";

export interface Review {
    review_id: number,
    user_buyer_id: number,
    post_id: number,
    review_title: string,
    review_description: string,
    review_punctuation: number,
    review_created_at: Date,
    review_status: boolean,
    user_buyer: UserClient,
    post: Product
}