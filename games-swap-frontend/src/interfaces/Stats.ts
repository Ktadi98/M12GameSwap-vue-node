import type { UserClient } from "./UserClient";

export interface Stats {
    user: UserClient,
    numPurchases: number,
    numSells: number,
    averageScore: number
}