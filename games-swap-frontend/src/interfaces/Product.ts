export interface Product {
    post_id: number;
    user_id: number;
    platform_id: number;
    genre_id: number;
    post_title: string;
    post_photos: Array<string>;
    post_keep: boolean;
    post_description: string;
    post_condition: string;
    post_created_at: string;
    post_price: number;
    post_status: string;
    platform?: {
        platform_id: number,
        platform_name: string
    }
}