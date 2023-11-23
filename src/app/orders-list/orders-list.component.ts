import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {OrderStatus} from '../enums/order-status';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders = [];
  orderStatus= Object.values(OrderStatus);
  displayedColumns = ['Name', 'Address',  'Amount', 'status',  'product', 'action'];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrders("all");
  }

  getAllOrders(status){
    this.productService.getAllOrders(status).subscribe(
      response => {
        this.orders = response;
        console.log("from orders list: ",response);
      }, error => {
        console.error("from orders list: ",error);
      }
    )
  }

  markDelivered(orderId: any) {
    this.productService.markAsDelivered(orderId).subscribe(
      response => {
        this.getAllOrders("all");
        console.log(response)
      }, error => {
        console.error(error);
      }
    );
  }

}
