import { Injectable } from '@angular/core';
import {Order} from '../model/order.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api_url = environment.api_url;
  constructor(private httpClient: HttpClient) { }

  public placeOrder(order: Order) {
    return this.httpClient.post<ApiResponse>(`${this.api_url}/placeOrder`, order);
  }

  public getOrder(orderId: number){
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getOrder/${orderId}`);
  }

  public getUserOrders(){
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getUserOrders`);
  }

  public getAllOrders(status: string= "all"){
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getAllOrders/${status}`);
  }

  public markAsDelivered(orderId: number){
    return this.httpClient.get<ApiResponse>(`${this.api_url}/markOrderDelivered/${orderId}`);
  }
}
