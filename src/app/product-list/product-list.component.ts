import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Product} from '../model/product.model';
import {ImageProcessingService} from '../services/image-processing.service';
import {ProductService} from '../services/product.service';
import {ShowProductImagesDialogComponent} from '../show-product-images-dialog/show-product-images-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  pageNumber: number = 0;
  showBtn =false;
  showList = false;
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

  getProductList(keyword: string= "") {
    this.showList = false;
    //images are stored in db as bytes,
    // so we have to convert them to show in the component
    this.productService.getProducts(this.pageNumber, keyword).pipe(
      map((x: Product[]) => x.map((product: Product) => {
        return this.imageProcessingService.createImages(product);
       })))
      .subscribe((response: Product[]) => {
        this.showBtn = response.length == 4;
        response.forEach(p => {
          this.products.push(p);
        });
        this.showList = true;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response) => {
      this.getProductList();
    });
  }

  showImages(product) {
    this.dialog.open(ShowProductImagesDialogComponent, {
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

  getNextPage() {
    this.pageNumber++;
    this.getProductList();
  }

  searchProducts(keyword: string) {
    this.pageNumber = 0;
    this.products = [];
    this.getProductList(keyword);
  }
}


