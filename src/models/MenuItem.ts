import mongoose from "mongoose";
import { IMenuItem } from "@/types/menu";

const MenuItemSchema = new mongoose.Schema<IMenuItem>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number, 
            required: true,
        },
        category: {
            type: String,
            enum: ['meats', 'sides', 'desserts'],
            required: true,
            lowercase: true,
        },
        imageUrl: {
            type: String,
            trim: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
export default MenuItem;