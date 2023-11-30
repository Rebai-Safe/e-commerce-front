import {OrderItem} from './order-item.model';
import {OrderStatus} from '../enums/order-status';

export class Order{
  orderId: number;
  orderStatus: OrderStatus;
  orderAmount: number;
  orderItems: OrderItem[];


  constructor() {

  }
}
