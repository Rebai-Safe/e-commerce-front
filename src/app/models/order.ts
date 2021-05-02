import { OrderStatus } from "../enums/order-status.enum";
import { Invoice } from "./invoice";
import { OrderItem } from "./order-item";
import { User } from "./user";

export class Order {
    id:number;
    orderDate:Date;
    status:OrderStatus;
    shipmenDate:Date;
    comments:string;
    shippedTo:string;
    user:User;
    orderItems:OrderItem[];
    invoice:Invoice;
}
