import { Document } from "mongoose";

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    category: "meats" | "sides" | "desserts";
    imageUrl?: string;
    isAvailable: boolean;
    displayOrder: number;
}