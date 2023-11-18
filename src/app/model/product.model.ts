import { FileHandler } from "./file-handler.model";

export interface Product{
    productId: number;
    productName: string;
    productDescription: string;
    productDiscountedPrice: number;
    productActualPrice: number;
    productImages: FileHandler[];
}
