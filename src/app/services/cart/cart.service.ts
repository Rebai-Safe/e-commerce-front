import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = environment.baseUrl+'cart/';
  private cartItemsUrl = environment.baseUrl+'cart_items';
  private errorHandler = new ErrorHandler();

  constructor(private http:HttpClient) { }

  getCart(id:number):Observable<Cart>{
    try{
      return this.http.get<Cart>(this.cartUrl+id)
    }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }


  getCartItem(id:number):Observable<Cart>{
    try{
      return this.http.get<Cart>(this.cartItemsUrl+id)
    }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }

  deleteCartProducts(cartItemId: number): Observable<CartItem>{
    let deleteUrl = `${this.cartItemsUrl}/${cartItemId}/products/delete-products`;
    try {
      return this.http.delete<CartItem>(deleteUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  placeOrder(cartItemId: number,productId: number,
    createOrderDto:any
    ):Observable<void>
   {
    let orderUrl = `${this.cartItemsUrl}/${cartItemId}/products/${productId}/placeorder`;
    try{
      return this.http.post<void>(orderUrl,createOrderDto)
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
    
   }

   checkout(cartItemId: number,createOrderDto:any):Observable<void>{
    const checkoutUrl = `${this.cartItemsUrl}/${cartItemId}/checkout`; 
    try{
       return this.http.post<void>(checkoutUrl,createOrderDto)
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
   }


   removeFromCart(cartItemId: number,productId: number):Observable<CartItem>{
    let removeUrl = `${this.cartItemsUrl}/${cartItemId}/products/${productId}/remove-from-cart`;
    try{
      return this.http.delete<CartItem>(removeUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
   }
}
