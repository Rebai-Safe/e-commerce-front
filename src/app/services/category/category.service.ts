import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl=environment.baseUrl+'categories';
  private errorHandler = new ErrorHandler();
  constructor(private http:HttpClient) { }
  
  getCategories():Observable<Category[]>{
    try{
      return this.http.get<Category[]>(this.categoryUrl);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  getCategoryById(id:number):Observable<Category[]>{
    try{
     
      return this.http.get<Category[]>(this.categoryUrl+'/'+id);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  addCategory(createCategoryDto: any):Observable<Category>{
    try{
      return this.http.post<Category>(this.categoryUrl,createCategoryDto);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }


  updateCategory(categoryId:number,updateCategoryDto: any):Observable<void>{
     try{
      return this.http.put<void>(this.categoryUrl+'/'+categoryId,updateCategoryDto);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
   }

   updateProduct(categoryId:number,productId: number,updateProductDto: any):Observable<void>{
    const urlOfProductCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`;
    try{
     return this.http.put<void>(urlOfProductCategory,updateProductDto);
   }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }

  deleteCategory(categoryId: number): Observable<any>{
    const urlOfdeleteCategory = `${this.categoryUrl}/${categoryId}`;
    try{
     return this.http.delete<void>(urlOfdeleteCategory);
   }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }

  getProducts(categoryId:number):Observable<Product[]>{
    try{
     
      return this.http.get<Product[]>(this.categoryUrl+'/products/'+categoryId);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
  }

  deleteProduct(categoryId:number,productId: number):Observable<void>{
    const urlOfdeleteProductCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`;
    try{
     return this.http.delete<void>(urlOfdeleteProductCategory);
   }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }

  addProduct(categoryId, createProductDto:any):Observable<void>{
    const urlOfProductCategory = `${this.categoryUrl}/${categoryId}/products`;
    try{
     return this.http.put<void>(urlOfProductCategory,createProductDto);
   }
   catch(error){
     this.errorHandler.handleError(error);
   }
  }
}
