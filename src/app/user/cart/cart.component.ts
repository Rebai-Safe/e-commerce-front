import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {Cart} from '../../model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart: Cart;
  displayedColumns = ['productName', 'productDescription',  'productActualPrice', 'productDiscountedPrice', 'quantity', 'Action']
  constructor(private router: Router,
              private cartService:  CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartService.getCart().subscribe({
      next: (response) =>{
        console.log("cart from cart component: ",response);
        this.cart =response;
      }, error: (error) => {
        console.log("from cart component: ",error)
     }
    })
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  deleteItem(productId: number) {
    this.cartService.deleteItem(this.cart.cartId, productId).subscribe(
      response => {
        this.getCart();
        console.log("from cart component delete item: ",response);
      }, error => {
        console.log("error from cart component delete item: ",error)
      }
    )
  }

  onQuantityChanged(productId: number, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(
      response => {
        this.getCart();
        console.log("from cart component add item: ",response);
      }, error => {
        console.log("error from cart component add item: ",error)
      }
    )
  }
}
