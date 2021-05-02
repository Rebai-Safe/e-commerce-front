import { Order } from "./order";
import { Product } from "./product";

export class OrderItem {
    id:number;
    unitPrice:number;
    quantity:number;
    totalPrice:number;
    product:Product[];
    order:Order;
    prodcut:Product;
    
}
