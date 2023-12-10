import type { Product } from "./Product";

export interface Purchase {
    purchase_id: number,
    purchase_created_at: Date,
    post: Product
}