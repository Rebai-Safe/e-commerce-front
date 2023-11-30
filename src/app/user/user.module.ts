import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {SharedModule} from '../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    CartComponent,
    UserOrdersComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule

  ]
})
export class UserModule { }
