import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {AuthGuard} from '../auth/auth.guard';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {OrderDetailsComponent} from './order-details/order-details.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'orderDetails', component: OrderDetailsComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'orderConfirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
