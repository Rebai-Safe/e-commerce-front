import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  orders = [];
  displayedColumns = ['Name', 'Address',  'Amount',  'product'];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.productService.getUserOrders().subscribe(
      response => {
        this.orders = response;
        console.log("from user orders: ",response);
      }, error => {
        console.error("from user orders: ",error);
      }
    )
  }
}
