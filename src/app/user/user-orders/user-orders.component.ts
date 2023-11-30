import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {OrderService} from '../../services/order.service';
import {Order} from '../../model/order.model';
import {ImageProcessingService} from '../../services/image-processing.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private router: Router,
              private orderService: OrderService,
              private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.orderService.getUserOrders().subscribe(
      response => {
        this.orders = response.object;
        //creating images
        this.orders.forEach(order => {
          order.orderItems.forEach(orderItem => {
            orderItem.product = this.imageProcessingService.createImages(orderItem.product);
          })
        })
        console.log("from user orders: ",response);
      }, error => {
        console.error("from user orders: ",error);
      }
    )
  }

  goToOrderDetails(orderId: number){
    this.router.navigate(['/orderDetails', {
      orderId: orderId
    }])
  }
}
