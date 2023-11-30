import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {Order} from '../model/order.model';
import {ApiResponse} from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api_url = environment.api_url;
  constructor(private httpClient: HttpClient) {
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<ApiResponse>(`${this.api_url}/addProduct`, product);
  }

  public getProducts(pageNumber: number, keyword: string = '') {
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getProducts?pageNumber=${pageNumber}&searchKeyword=${keyword}`);
  }

  public getProductById(productId) {
    return this.httpClient.get<ApiResponse>(`${this.api_url}/getProductById/${productId}`);
  }

  public deleteProduct(id) {
    return this.httpClient.delete(`${this.api_url}/deleteProduct/${id}`);
  }


}
