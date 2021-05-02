import { Order } from "./order";
import { Payment } from "./payment";
import { User } from "./user";

export class Invoice {
    id:number;
    number:string;
    invoiceTotal:number;
    invoiceDate:Date;
    dueDate:Date;
    client:User;
    payment:Payment;
    order:Order;


}
