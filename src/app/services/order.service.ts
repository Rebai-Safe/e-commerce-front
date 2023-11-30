import { Injectable } from '@angular/core';
import {Order} from '../model/order.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api_url = environment.api_url;
  constructor(private httpClient: HttpClient) { }

  public placeOrder(order: Order) {
    return this.httpClient.post(`${this.api_url}/placeOrder`, order);
  }

  public getOrder(orderId: number){
    return this.httpClient.get<Order>(`${this.api_url}/getOrder/${orderId}`);
  }

  public getUserOrders(){
    return this.httpClient.get<Order[]>(`${this.api_url}/getUserOrders`);
  }

  public getAllOrders(status: string= "all"){
    return this.httpClient.get<any>(`${this.api_url}/getAllOrders/${status}`);
  }

  public markAsDelivered(orderId: number){
    return this.httpClient.get<any>(`${this.api_url}/markOrderDelivered/${orderId}`);
  }
}
