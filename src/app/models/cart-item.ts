import { Cart } from "./cart";
import { Product } from "./product";

export class CartItem {
    id:number;
    totalProducts:number;
    products:Product[];
    cart:Cart;
}
