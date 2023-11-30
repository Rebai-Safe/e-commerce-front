import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {OrderStatus} from '../../enums/order-status';
import {OrderService} from '../../services/order.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders = [];
  orderStatus= Object.values(OrderStatus);
  displayedColumns = ['Name', 'Address',  'Amount', 'status',  'product', 'action'];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders("all");
  }

  getAllOrders(status){
    this.orderService.getAllOrders(status).subscribe(
      response => {
        this.orders = response.object;
        console.log("from orders list: ",response);
      }, error => {
        console.error("from orders list: ",error);
      }
    )
  }

  markDelivered(orderId: any) {
    this.orderService.markAsDelivered(orderId).subscribe(
      response => {
        this.getAllOrders("all");
        console.log(response)
      }, error => {
        console.error(error);
      }
    );
  }

}
