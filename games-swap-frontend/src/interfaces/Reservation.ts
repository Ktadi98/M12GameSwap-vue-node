import type { Product } from "./Product";
import type { UserClient } from "./UserClient";

export interface Reservation {
    reservation_id: number,
    reservation_created_at: Date,
    post: Product,
    user?: UserClient
}