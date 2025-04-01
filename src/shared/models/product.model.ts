import { User } from "./user.model";

export interface Product {
    id: string;
    name: string;
    imagePath: string;
    price: number;
    user?: User;
}