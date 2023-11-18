import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Product} from '../model/product.model';
import {ImageProcessingService} from '../services/image-processing.service';
import {ProductService} from '../services/product.service';
import {ShowProductImageDialogComponent} from '../show-product-image-dialog/show-product-image-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];
  displayedColumns = ['productName', 'productDescription',  'productActualPrice', 'productDiscountedPrice', 'Actions'];

  constructor(private imageProcessingService: ImageProcessingService,
              private productService: ProductService,
              public  dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    //images are stored in db as bytes,
    // so we have to convert them to show in the component
    this.productService.getAllProducts().pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product))))
      .subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response) => {
      this.getProductList();
    });
  }

  showImages(product) {
    this.dialog.open(ShowProductImageDialogComponent, {
        data: {
          images: product.productImages
        },
        height: '500px',
        width: '500px'
      },
    );
  }

  editProduct(productId: any) {
    this.router.navigate(['/product/add', {productId: productId}]);
  }
}


