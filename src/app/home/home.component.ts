import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {map} from 'rxjs/operators';
import {Product} from '../model/product.model';
import {ImageProcessingService} from '../services/image-processing.service';
import {Router} from '@angular/router';
import {ApiResponse} from '../model/api-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  pageNumber: number = 0;
  showButton = false;

  constructor(private router: Router,
              private productService: ProductService,
              private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(keyword: string = "") {
    this.productService.getProducts(this.pageNumber, keyword).pipe(
      map((response: ApiResponse) => response.object.map((product: Product) => this.imageProcessingService.createImages(product))))
      .subscribe((response: Product[]) => {
        // 4 is the size of the page in the backend
        this.showButton = response.length == 4;
        response.forEach(p => {
          this.products.push(p);
        })
      });
  }

  gotToProductDetails(productId: number) {
    this.router.navigate(['/productDetails', {productId: productId}])
  }

  loadMoreProducts() {
    this.pageNumber++;
    this.getProducts();
  }

  searchProducts(keyword: string) {
    this.pageNumber = 0;
    this.products = [];
    this.getProducts(keyword);
  }
}
