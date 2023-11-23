import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from '../model/product.model';
import {ProductService} from './product.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ImageProcessingService} from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {


    const productId = route.paramMap.get("productId");
    const singleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductForCheckout(singleProductCheckout, productId)
                .pipe(
                  map((products: Product[]) => products.map(
                    product => this.imageProcessingService.createImages(product)
                  ))
                )
  }
}
