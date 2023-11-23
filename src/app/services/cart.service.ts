import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api_url = environment.api_url;
  constructor(private httpClient: HttpClient) { }

  public addToCart(productId: number) {
    return this.httpClient.get(`${this.api_url}/addToCart/${productId}`);
  }

  public getCarts(){
    return this.httpClient.get<any>(`${this.api_url}/getCarts`);
  }

  public deleteItem(cartId: number){
    return this.httpClient.delete<any>(`${this.api_url}/deleteItem/${cartId}`);
  }
}
