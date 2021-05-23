import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl=environment.baseUrl+'prodcuts'
  private errorHandler = new ErrorHandler();
  
  constructor(private http:HttpClient) { }


  getProducts():Observable<Product[]>{
    try{
      return this.http.get<Product[]>(this.productUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

   getProduct(id: number):Observable<Product>{
    try{
      return this.http.get<Product>(this.productUrl+'/'+id);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

   addTocart(productId: number , cartItemId: number , quantity: number):Observable<Product>{
     const params = new HttpParams().set('quantity',quantity.toString())
     const addToCartUrl = `${this.productUrl}/${productId}/addtocart/${cartItemId}`
     try{
      return this.http.post<Product>(addToCartUrl, null, {
        params
      });
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
   }


   updateCartQuantity(productId: number ,cartQuantity: number):Observable<void>{
    const params = new HttpParams().set('CartQuantity',cartQuantity.toString())
    const updateCartQteUrl = `${this.productUrl}/${productId}/addtocart/${cartQuantity}`
    try{
     return this.http.post<void>(updateCartQteUrl, null, {
       params
     });
   }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }


}
