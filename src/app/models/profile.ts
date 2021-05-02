import { Cart } from "./cart";
import { User } from "./user";

export class Profile {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    gender:string;
    age:string;
    country:string;
    city:string;
    address:string;
    user:User;
    cart:Cart;
}
