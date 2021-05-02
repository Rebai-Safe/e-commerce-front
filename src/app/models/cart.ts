import { identifierModuleUrl } from "@angular/compiler"
import { CartItem } from "./cart-item";
import { Profile } from "./profile";

export class Cart {
    id:number;
    profile:Profile;
    cartItem:CartItem;
}
