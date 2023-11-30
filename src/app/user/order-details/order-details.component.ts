import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../model/order.model';
import {ImageProcessingService} from '../../services/image-processing.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    let orderId = this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrder(Number(orderId)).subscribe({
      next: response => {
        this.order = response.object;
        //creating images
        this.order.orderItems.forEach(orderItem => {
          orderItem.product = this.imageProcessingService.createImages(orderItem.product);
        });
      }
    });
  }

  protected readonly Order = Order;
}
