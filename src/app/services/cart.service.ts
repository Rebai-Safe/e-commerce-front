import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api_url = environment.api_url;
  constructor(private httpClient: HttpClient) { }

  public addToCart(productId: number, quantity: number) {
    return this.httpClient.get<ApiResponse>(`${this.api_url}/addToCart/${productId}/${quantity}`);
  }

  public getCart(){
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getCart`);
  }

  public deleteItem(cartId: number, productId: number){
    return this.httpClient.delete<any>(`${this.api_url}/deleteItem/${cartId}/${productId}`);
  }
}
