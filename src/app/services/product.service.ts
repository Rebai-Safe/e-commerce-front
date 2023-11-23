import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {Order} from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api_url = environment.api_url;

  constructor(private httpClient: HttpClient) {
  }

  public getProducts(pageNumber: number, keyword: string = '') {
    return this.httpClient.get<Product[]>(`${this.api_url}/get-products?pageNumber=${pageNumber}&searchKeyword=${keyword}`);
  }

  public getProductById(productId) {
    return this.httpClient.get<Product>(`${this.api_url}/get-product-byId/${productId}`);
  }

  public getProductForCheckout(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>(`${this.api_url}/get-product-details/${productId}/${isSingleProductCheckout}`);
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(`${this.api_url}/add-product`, product);
  }

  public placeOrder(order: Order, isCartCheckout) {
    return this.httpClient.post(`${this.api_url}/place-order/${isCartCheckout}`, order);
  }

  public getUserOrders(){
    return this.httpClient.get<any>(`${this.api_url}/getOrders`);
  }

  public getAllOrders(status: string= "all"){
    return this.httpClient.get<any>(`${this.api_url}/getAllOrders/${status}`);
  }

  public markAsDelivered(orderId: number){
    return this.httpClient.get<any>(`${this.api_url}/markOrderDelivered/${orderId}`);
  }
  public deleteProduct(id) {
    return this.httpClient.delete(`${this.api_url}/delete-product/${id}`);
  }


}
