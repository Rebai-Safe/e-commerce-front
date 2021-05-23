import { Cart } from "./cart";
import { User } from "./user";

export class Profile {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    country:string;
    user:User;
    cart:Cart;
}
