import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product.model';
import {ProductService} from '../services/product.service';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  selectedProductIndex = 0;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private cartService:  CartService) {

  }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

  changeIndex(i: number) {
    this.selectedProductIndex = i;
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe(
       response => {
          console.log("from product details: ",response);
     }, err => {
        console.log("from product details: ",err);
      }
    )
  }
}
