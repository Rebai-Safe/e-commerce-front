import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl=environment.baseUrl+'orders/user-orders';
  private errorHandler = new ErrorHandler();
  
  constructor(private http:HttpClient) { }

  getOrderds():Observable<Order[]>{
    try{
      return this.http.get<Order[]>(this.orderUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  getOrder(id: number):Observable<Order>{
    try{
      return this.http.get<Order>(this.orderUrl+'/'+id);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }
}
