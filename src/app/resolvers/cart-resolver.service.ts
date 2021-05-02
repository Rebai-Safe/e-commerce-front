import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService  implements Resolve<Cart>{

  constructor(private cartService: CartService,private userService: UserService) { }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Cart>  {
     return this.cartService.getCart(this.userService.profile.cart.id);
  }
}
