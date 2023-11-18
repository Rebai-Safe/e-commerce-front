import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from '../model/product.model';
import {Observable, of} from 'rxjs';
import {ProductService} from './product.service';
import {ImageProcessingService} from './image-processing.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
          ): Observable<Product> {

    const productId = route.paramMap.get('productId');
    if (productId) {
      //we have to fetch details from backend
      return this.productService.getProductById(productId).pipe(
        map(p => this.imageProcessingService.createImages(p))
      )
    } else {
      //return empty product observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }
}
