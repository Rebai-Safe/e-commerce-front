import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  carts = [];
  displayedColumns = ['productName', 'productDescription',  'productActualPrice', 'productDiscountedPrice', 'Action']
  constructor(private router: Router,
              private cartService:  CartService) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(){

    this.cartService.getCarts().subscribe({
      next: (response) =>{
        console.log("from cart component: ",response);
        this.carts =response;

      }, error: (error) => {
        console.log("from cart component: ",error)
     }
    })
  }



  goToBuy() {
    this.router.navigate(['/buy-product', {
        productId: 0,
        isSingleProductCheckout: false
      }]
    );
    // this.productService.getProductDetails(false, 0).subscribe(
    //   response => {
    //
    //   }, error => {
    //     console.log("from cart component: ", error)
    //   }
    // )
  }

  deleteItem(cartId: number) {
    this.cartService.deleteItem(cartId).subscribe(
      response => {
        this.getCarts();
        console.log("from cart component delete item: ",response);
      }, error => {
        console.log("error from cart component delete item: ",error)
      }
    )
  }
}
