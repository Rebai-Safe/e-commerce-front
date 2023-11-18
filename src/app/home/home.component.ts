import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {map} from 'rxjs/operators';
import {Product} from '../model/product.model';
import {ImageProcessingService} from '../services/image-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().pipe(
      map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product))))
      .subscribe((response: Product[]) => {
        this.products = response;
      });
  }
}
