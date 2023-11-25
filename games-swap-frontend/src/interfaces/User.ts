
export interface User {
    user_id: number,
    user_name: string,
    user_email: string,
    user_created_at: Date,
    user_type: "admin" | "client",
    user_active: boolean
}
