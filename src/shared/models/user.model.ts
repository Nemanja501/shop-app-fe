import { Product } from "./product.model";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    products: Array<Product>
}