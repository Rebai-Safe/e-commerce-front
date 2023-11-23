import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Order} from '../model/order.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  products: Product[] = [];

  order: Order = {
    altContactNumber: '',
    contactNumber: '',
    fullAddress: '',
    fullName: '',
    orderProductQuantityList: []
  };

  isSingleProductCheckout = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isSingleProductCheckout = this.route.snapshot.paramMap["isSingleProductCheckout"];
    this.products = this.route.snapshot.data['productDetails'];
    this.products.forEach(
      p => this.order.orderProductQuantityList.push(
        {productId: p.productId, quantity: 1}
      )
    )
  }


  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.order, !this.isSingleProductCheckout).subscribe(
      response => {
        orderForm.resetForm();
        this.router.navigate(['/order-confirm'])
      }, (err) =>{
        console.log("From buy component: ",err)
      }
    )
  }

  getQuantityForProduct(productId: number) {
    const filterProduct = this.order.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filterProduct[0].quantity;
  }

  getProductTotal(productId: number, productDiscountedPrice: number) {
    const quantity = this.getQuantityForProduct(productId);
    return quantity * productDiscountedPrice;
  }

  onQuantityChanged(quantity: string, productId: number) {
    this.order.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )[0].quantity = Number(quantity);
  }

  getTotal() {
    let total = 0;
    this.order.orderProductQuantityList.forEach(
      (product) => {
        let price = this.products.filter(p => p.productId === product.productId)[0].productDiscountedPrice
        total = total + (price * product.quantity);
      }
    )
    return total;
  }
}
