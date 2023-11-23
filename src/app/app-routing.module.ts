import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {ProductResolverService} from './services/product-resolver.service';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {BuyProductComponent} from './buy-product/buy-product.component';
import {BuyProductResolverService} from './services/buy-product-resolver.service';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {CartComponent} from './cart/cart.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrdersListComponent} from './orders-list/orders-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}},
  {path: 'user', component:UserComponent,canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'product/list', component: ProductListComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}},
  {path: 'product/add', component: AddProductComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']},
    resolve: {
      product: ProductResolverService
    }},
  {path: 'product-details', component: ProductDetailsComponent,
    resolve: {
      product: ProductResolverService
    }},
  {path: 'buy-product', component: BuyProductComponent, canActivate: [AuthGuard], data:{roles:['USER']},
    resolve: {
      productDetails: BuyProductResolverService
    }},
  {path: 'order-confirm', component: OrderConfirmationComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'register', component: RegisterUserComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'ordersList', component: OrdersListComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
