import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api_url = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(){
    return this.httpClient.get<Product[]>(`${this.api_url}/get-products`);
  }
  public getProductById(productId){
    return this.httpClient.get<Product> (`${this.api_url}/get-product-byId/${productId}`);
  }
  public addProduct(product: FormData){
    return this.httpClient.post<Product>(`${this.api_url}/add-product`, product);
  }

  public deleteProduct(id){
    return this.httpClient.delete(`${this.api_url}/delete-product/${id}`)  }
}
