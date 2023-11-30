import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Cart} from '../../model/cart';
import {OrderStatus} from '../../enums/order-status';
import {CartService} from '../../services/cart.service';
import {OrderItem} from '../../model/order-item.model';

@Component({
  selector: 'app-buy-product',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  cart: Cart;
  order: Order = new Order();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response;
        console.log("cart from buy product: ",response);
      }, error: err => {
        console.log("error from buy product: ",err)
      }
    })
     ;
  }


  placeOrder() {
    //prepare order
    this.order.orderAmount = this.getTotal();
    this.order.orderItems = [];
    this.cart.cartItems.forEach(cartItem => {
      let orderItem: OrderItem = new OrderItem();
      orderItem.product = cartItem.product;
      orderItem.quantity = cartItem.quantity;
      this.order.orderItems.push(orderItem);
    })
    console.log("order from checkout: ", this.order);
    //place the order
    this.orderService.placeOrder(this.order).subscribe(
      response => {
        console.log("placed order: ",response);
        this.router.navigate(['/user/orderConfirmation'])
      }, (err) =>{
        console.log("From checkout: ",err)
      }
    )
  }

  getProductTotal(quantity: number, productDiscountedPrice: number) {
    return quantity * productDiscountedPrice;
  }

  getTotal() {
    console.log("in get total");
    let total = 0;
    this.cart.cartItems.forEach(
      ci => {
        total += ci.product.productDiscountedPrice * ci.quantity
      }
    )
    return total;
  }
}
